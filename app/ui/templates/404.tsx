import { Link, useLocation } from "@remix-run/react"

export function Show404() {
  const location = useLocation()

  return (
    <>
      <div className="mx-auto max-w-screen-lg py-12">
        <h1 className="mb-5 text-3xl text-green font-bold">We can't find this page:</h1>
        <pre className="text-body-lg whitespace-pre-wrap break-all">
          {location.pathname}
        </pre>
        <Link to="/" className="text-body-md underline">
          Back to home
        </Link>
      </div>
    </>
  )
}
