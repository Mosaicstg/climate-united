import { parseWithZod } from "@conform-to/zod"
import { SpamError } from "remix-utils/honeypot/server"
import { subscribeEmail } from "~/services/campaign-monitor.server"
import { NewsletterSignUpForm } from "~/ui/components/NewsletterSignUp"
import { honeypot } from "~/utils/honeypot.server"
import { type ActionFunctionArgs, json } from "@remix-run/node"
import { invariantResponse } from "~/utils/invariant.server"

/**
 * TODO: Send back helpful messages to the user (e.g. "You're already signed up!")
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema: NewsletterSignUpForm })

  if (submission.status !== "success") {
    return json({ submission: submission.reply() } as const)
  }

  try {
    honeypot.check(formData)
  } catch (error) {
    if (error instanceof SpamError) {
      invariantResponse(false, "Form was submitted incorrectly", {
        status: 400,
      })
    }
  }

  try {
    await subscribeEmail(submission.value.email)

    return json({
      submission: submission.reply({ resetForm: true }),
    } as const)
  } catch (e) {
    if (e instanceof Response) {
      const status = e.status

      console.error({
        message: e.statusText,
        status,
        body: await e.text(),
      })

      return json(
        {
          submission: submission.reply({
            formErrors: ["Failed to sign up for newsletter"],
            resetForm: false,
          }),
        } as const,
        {
          status,
        },
      )
    }

    if (e instanceof Error) {
      return json(
        {
          submission: submission.reply({
            formErrors: ["Something went wrong. Please try again."],
            resetForm: false,
          }),
        } as const,
        {
          status: 500,
        },
      )
    }

    return json(
      {
        submission: submission.reply({
          formErrors: ["Failed to sign up for newsletter"],
          resetForm: false,
        }),
      } as const,
      {
        status:
          typeof e === "object" &&
          e !== null &&
          "status" in e &&
          typeof e.status === "number"
            ? e.status
            : 500,
      },
    )
  }
}
