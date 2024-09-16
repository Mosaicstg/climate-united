import Header from "~/ui/components/Header"

export function Show500() {
  return (
    <>
      <Header useGreenHeaderStyle />
      <main>
        <div className="mx-auto max-w-screen-lg py-12 text-center">
          <div className="relative mx-auto my-12 w-[340px]">
            <div className="right-3/5 absolute bottom-0 h-[156px] w-[156px] translate-x-1/2 translate-y-1/3 rounded-full bg-darkBlue"></div>
            <div className="absolute right-1/4 top-0 h-[156px] w-[156px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue"></div>
            <div className="relative flex h-[340px] w-[340px] items-center justify-center rounded-full bg-green text-white">
              <span className="text-8xl font-bold">500</span>
            </div>
          </div>
          <div className="pt-12">
            <h1 className="mb-5 text-3xl font-bold text-green">
              Oh no! Something went wrong. Try refreshing the page.
            </h1>
          </div>
        </div>
      </main>
    </>
  )
}
