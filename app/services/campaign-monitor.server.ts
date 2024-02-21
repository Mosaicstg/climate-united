import { z } from "zod"
import { invariantResponse } from "~/utils/invariant.server"

const API_URL = "https://api.createsend.com/api/v3.3"

const SubscriberPayload = z.object({
  EmailAddress: z.string().email(),
  Resubscribe: z.boolean(),
  RestartSubscriptionBasedAutoresponders: z.boolean(),
  ConsentToTrack: z.enum(["Yes", "No", "Unchanged"]),
  ConsentToSendSms: z.enum(["Yes", "No", "Unchanged"]),
  Name: z.string().optional(),
  MobileNumber: z.string().optional(),
  CustomFields: z
    .array(z.object({ Key: z.string(), Value: z.string() }))
    .optional(),
})

const SubscriberError = z.object({
  Code: z.number(),
  Message: z.string(),
})

type SubscriberError = z.infer<typeof SubscriberError>
type SubscriberPayload = z.infer<typeof SubscriberPayload>

const SubscriberDetailsResponseSchema = z.union([
  SubscriberError,
  SubscriberPayload,
])

export async function subscribeEmail(email: string) {
  if (!process.env.CAMPAIGN_MONITOR_API_KEY) {
    invariantResponse(false, "Invalid API key", {
      status: 500,
      statusText: "Invalid API key",
    })
  }

  if (!process.env.CAMPAIGN_MONITOR_API_SECRET) {
    invariantResponse(false, "Invalid API Secret", {
      status: 500,
      statusText: "Invalid API secret",
    })
  }

  if (!process.env.CAMPAIGN_MONITOR_SUBSCRIBER_LIST_ID) {
    invariantResponse(false, "Invalid subscriber list id.", {
      status: 500,
      statusText: "Invalid subscriber list id",
    })
  }

  const isEmailSubscribed = await checkIfAlreadySubscribed(email)

  if (isEmailSubscribed) {
    return z.string().email().parse(email)
  }

  const basicAuth = Buffer.from(
    `${process.env.CAMPAIGN_MONITOR_API_KEY}:${process.env.CAMPAIGN_MONITOR_API_SECRET}`,
  ).toString("base64")

  const response = await fetch(
    `${API_URL}/subscribers/${process.env.CAMPAIGN_MONITOR_SUBSCRIBER_LIST_ID}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        EmailAddress: email,
        Resubscribe: true,
        RestartSubscriptionBasedAutoresponders: true,
        ConsentToTrack: "Yes",
        ConsentToSendSms: "No",
      } satisfies SubscriberPayload),
    },
  )

  if (!response.ok) {
    invariantResponse(response.ok, "Failed to subscribe email", {
      status: response.status,
      statusText: response.statusText,
    })
  }

  const subscribedEmail = await response.json()

  return z.string().email().parse(subscribedEmail)
}

async function checkIfAlreadySubscribed(email: string) {
  const response = (await fetch(
    `${API_URL}/subscribers/${process.env.CAMPAIGN_MONITOR_SUBSCRIBER_LIST_ID}.json?email=${email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CAMPAIGN_MONITOR_API_KEY}:${process.env.CAMPAIGN_MONITOR_API_SECRET}`,
        ).toString("base64")}`,
      },
    },
  ).then((res) => res.json())) as unknown

  const result = SubscriberDetailsResponseSchema.safeParse(response)

  if (!result.success) {
    return false
  }

  const { data } = result

  if ("Code" in data) {
    return false
  }

  if (data.EmailAddress === email) {
    return true
  }

  return false
}
