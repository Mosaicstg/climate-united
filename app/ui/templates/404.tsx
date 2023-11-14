import { Link, useLocation } from "@remix-run/react"
import Header from "~/ui/components/Header"

export function Show404() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg py-12 text-center">
          <div className="relative mx-auto my-12 w-[340px]">
            <div className="right-3/5 absolute bottom-0 h-[156px] w-[156px] translate-x-1/2 translate-y-1/3 rounded-full bg-darkBlue"></div>
            <div className="absolute right-1/4 top-0 h-[156px] w-[156px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue"></div>
            <div className="relative flex h-[340px] w-[340px] items-center justify-center rounded-full bg-green text-white">
              <span className="text-8xl font-bold">404</span>
            </div>
          </div>
          <div className="pt-12">
            <h1 className="mb-5 text-3xl font-bold text-green">
              We can't find this page
            </h1>
            <pre className="text-body-lg whitespace-pre-wrap break-all">
              {location.pathname}
            </pre>
            <Link to="/" className="text-body-md underline">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
