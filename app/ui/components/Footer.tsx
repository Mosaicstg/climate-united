import LogoWhite from "~/ui/components/Logo-White"
import SocialIcon from "~/ui/components/Social-Icon"
import { useLoaderData } from "@remix-run/react"
import type { loader } from "~/root"

export default function Footer() {
  const { socialMedialLinks } = useLoaderData<typeof loader>()

  return (
    <footer className="border-t-4 border-solid border-green bg-darkBlue text-white">
      <div className="mx-auto max-w-screen-xl px-5 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="font-semibold">
            <p className="mb-5">
              7550 Wisconsin Avenue 8th Floor
              <br />
              Bethesda, Maryland 20814
            </p>
            <p>
              Phone: 800.248.0337 | Fax: 301.576.8444
              <br />
              <a
                className="duration-300 ease-in-out hover:text-blue"
                href="mailto:info@calvertimpact.org"
              >
                info@calvertimpact.org
              </a>
            </p>
          </div>
          <nav className="col-span-2">
            <ul>
              <li>
                <a href="/about-climate-united">About</a>
              </li>
              <li>
                <a href="/our-people">Our People</a>
              </li>
              <li>
                <a href="/about-the-greenhouse-gas-reduction-fund">
                  About the GGRF
                </a>
              </li>
            </ul>
          </nav>
          <div className="col-span-2">
            <p className="text-sm">
              Climate United’s objectives and projections are conditioned upon a
              successful award of a grant from the National Clean Investment
              Fund competition being administered by the U.S. Environmental
              Protection Agency, and may be modified in response to the amount
              and conditions of such grant award. Descriptions of pipeline
              opportunities are subject to change, and no financing commitments
              have been made to any partners.
            </p>
          </div>
          <div className="col-span-2">
            <div className="w-[263px] max-w-full">
              <LogoWhite />
            </div>
          </div>
          <ul className="flex gap-4 self-end md:justify-end">
            {socialMedialLinks.map((link, index) => {
              return (
                <li key={index}>
                  <a
                    className="block h-[20px] w-[20px] text-white"
                    href={link.url}
                  >
                    <span className="sr-only">{link.platform}</span>
                    <SocialIcon icon={link.platform} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
