import { z } from "zod"

export const DateTimeToReadable = z
  .string()
  .datetime({ offset: true })
  .transform((dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  )

/**
 * Tranform '2023-12-01T00:00:00.000-05:00' to 'December 1, 2023'
 *
 * @param dateString
 * @returns {string}
 * @throws
 */
export function getDate(dateString: string) {
  return DateTimeToReadable.parse(dateString)
}

export const DateTimeToReadableWithTime = z
  .string()
  .datetime({ offset: true })
  .transform((dateString) => {
    const dateObject = new Date(dateString)
    const date = dateObject.toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    const time = dateObject.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    })

    return `${date} | ${time}`
  })

/**
 * Tranform '2023-12-01T12:00:00.000-05:00' to 'December 1, 2023 at 12:00 PM EST'
 *
 * @param dateString
 * @returns {string}
 * @throws
 */
export function getDateWithTime(dateString: string) {
  return DateTimeToReadableWithTime.parse(dateString)
}
