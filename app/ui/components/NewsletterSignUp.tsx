import { useFetcher } from "@remix-run/react"
import { z } from "zod"
import { useForm, getFormProps, getInputProps } from "@conform-to/react"
import { parseWithZod, getZodConstraint } from "@conform-to/zod"
import { type action } from "~/routes/action.newsletter-sign-up"
import { HoneypotInputs } from "remix-utils/honeypot/react"

export const NewsletterSignUpForm = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
})

export function NewsletterSignUp() {
  const fetcher = useFetcher<typeof action>({ key: "newsletter-sign-up" })

  const [form, fields] = useForm({
    defaultValue: { email: "" },
    lastResult: fetcher.data?.submission,
    constraint: getZodConstraint(NewsletterSignUpForm),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: NewsletterSignUpForm })
    },
    onSubmit(event, { formData }) {
      fetcher.submit(formData, {
        action: "/action/newsletter-sign-up",
        method: "post",
        navigate: false,
      })
    },
  })

  const hasFormErrors = form.errors ? form.errors.length > 0 : false
  const hasFieldErrors = fields.email.errors
    ? fields.email.errors.length > 0
    : false

  const hasErrors = hasFormErrors || hasFieldErrors

  return (
    <section className="items-center gap-0 overflow-hidden bg-lightGreen text-white md:grid md:grid-cols-2">
      <div className="w-full px-6 py-10 md:ml-auto md:max-w-screen-sm md:pl-5 md:pr-10 lg:py-20 lg:pr-20">
        <h2 className="mb-2 text-2xl font-bold md:text-3xl">
          Get Our Monthly Impact Updates
        </h2>
        <p className="pb-5">
          Subscribe to monthly impact updates and learn how investor dollars are
          making a difference. Per our privacy policy, we don't share your
          information.
        </p>
        <fetcher.Form
          method="post"
          action="/action/newsletter-sign-up"
          className="flex flex-col gap-4"
          {...getFormProps(form)}
        >
          <HoneypotInputs label="Please leave this field blank" />
          <div className="flex flex-col gap-3">
            <label
              htmlFor={fields.email.id}
              className="font-bold uppercase leading-none"
            >
              Email
            </label>
            <input
              className="border-2 border-white bg-transparent px-3 py-2 outline-none focus:border-blue md:px-4"
              {...getInputProps(fields.email, { type: "email" })}
            />
            <div
              id={fields.email.errorId}
              className={`${fields.email.errors ? "border-2 border-red-400 bg-red-50 px-2 py-1 font-medium text-red-800" : ""}`}
              aria-live="polite"
            >
              {fields.email.errors}
            </div>
            {!hasErrors &&
            fetcher.data &&
            !fetcher.data.submission.initialValue &&
            fetcher.state !== "submitting" ? (
              <p aria-live="polite" className="italic">
                You've successfully subscribed to our newsletter!
              </p>
            ) : null}
          </div>
          {hasFormErrors ? (
            <p
              className="border-2 border-red-400 bg-red-50 px-2 py-1 font-medium text-red-800"
              aria-live="polite"
            >
              {form.errors?.map((error) => (
                <span key={error} className="block">
                  {error}
                </span>
              ))}
            </p>
          ) : null}
          <div className="">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 font-bold uppercase text-green duration-300 ease-in-out hover:bg-darkBlue hover:text-white"
              type="submit"
              disabled={fetcher.state === "submitting"}
              aria-label="Sign up with your email to receive our monthly impact updates"
            >
              Sign Up{" "}
              {fetcher.state === "submitting" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
      <div className="max-w-full bg-[#82A59C] md:aspect-video md:min-h-full">
        <picture>
          <source type="image/avif" srcSet="/assets/newsletter-sign-up.avif" />
          <source type="image/webp" srcSet="/assets/newsletter-sign-up.webp" />
          <img
            height={2000}
            width={1500}
            src="/assets/newsletter-sign-up.jpg"
            alt="Newsletter Sign Up"
            className="min-h-full object-cover object-center"
          />
        </picture>
      </div>
    </section>
  )
}
