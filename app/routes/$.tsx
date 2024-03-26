// This is called a "splat route" and as it's in the root `/app/routes/`
// directory, it's a catchall. If no other routes match, this one will and we
// can know that the user is hitting a URL that doesn't exist. By throwing a
// 404 from the loader, we can force the error boundary to render which will
// ensure the user gets the right status code and we can display a nicer error
// message for them than the Remix and/or browser default.

import {
  type MetaFunction,
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react"
import { type ErrorResponse } from "@remix-run/router"
import { type RootLoader } from "~/root"
import { Show404 } from "~/ui/templates/404"
import { Show500 } from "~/ui/templates/500"

/**
 * Does its best to get a string error message from an unknown error.
 */
export function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message
  }
  console.error("Unable to get error message for error", error)
  return "Unknown Error"
}

type StatusHandler = (info: {
  error: ErrorResponse
  params: Record<string, string | undefined>
}) => JSX.Element | null

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <p>
      {error.status} {error.data}
    </p>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler
  statusHandlers?: Record<number, StatusHandler>
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null
}) {
  const error = useRouteError()
  const params = useParams()

  if (typeof document !== "undefined") {
    console.error(error)
  }

  return (
    <>
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
    </>
  )
}

export async function loader() {
  throw new Response("Not found", { status: 404 })
}

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  error,
}) => {
  let title = "An error occurred - Climate United"

  if (error && isRouteErrorResponse(error) && error.status === 404) {
    title = "Not Found - Climate United"
  }

  return [
    {
      title,
    },
  ]
}

export default function NotFound() {
  // due to the loader, this component will never be rendered, but we'll return
  // the error boundary just in case.
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <Show404 />,
        500: () => <Show500 />,
      }}
    />
  )
}
