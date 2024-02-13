import { parseWithZod } from "@conform-to/zod"
import { type ActionFunctionArgs } from "@remix-run/node"
import { SpamError } from "remix-utils/honeypot/server"
import { NewsletterSignUpForm } from "~/ui/components/NewsletterSignUp"
import { honeypot } from "~/utils/honeypot.server"

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema: NewsletterSignUpForm })

  if (submission.status !== "success") {
    return submission.reply()
  }

  try {
    honeypot.check(formData)
  } catch (error) {
    if (error instanceof SpamError) {
      return new Response("Form was submitted incorrectly", { status: 400 })
    }
  }

  console.log("Newsletter sign up successful!", submission.value)

  return submission.reply({ resetForm: true })
}
