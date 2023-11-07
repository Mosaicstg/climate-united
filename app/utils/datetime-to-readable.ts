import { z } from "zod";

export const DateTimeToReadable = z
  .string()
  .datetime()
  .transform((dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  );

/**
 * Tranform '2023-12-01T00:00:00.000-05:00' to 'December 1, 2023'
 *
 * @param dateString
 * @returns {string}
 * @throws
 */
export function transformDateTimeStringToHumanReadable(dateString: string) {
  return DateTimeToReadable.parse(dateString);
}
