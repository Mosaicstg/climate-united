import {type LinksFunction, type MetaFunction, json} from "@remix-run/node";
import {cssBundleHref} from "@remix-run/css-bundle";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import {getSocialMediaLinks} from "~/models/social-media-links.server";

import {withDevTools} from "remix-development-tools";
import rdtStylesheet from "remix-development-tools/index.css";
import tailwindStylesheet from "~/tailwind.css";
import Logo from '~/components/logo';
import LogoWhite from '~/components/logo-white';
import SocialIcon from '~/components/social-icon';

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: tailwindStylesheet},
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@600&display=swap",
    },
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
    ...(process.env.NODE_ENV === "development"
        ? [{rel: "stylesheet", href: rdtStylesheet}]
        : []),
];

export const loader = async () => {
    const socialMedialLinks = await getSocialMediaLinks();

    return json({socialMedialLinks});
};

export const meta: MetaFunction = () => [
    {
        title: "Climate United",
    },
];

let AppExport = App;

if (process.env.NODE_ENV === "development") {
    AppExport = withDevTools(App);
}

export default AppExport;

function App() {
    const {socialMedialLinks} = useLoaderData<typeof loader>();

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="font-sans">
        <header
            className="flex gap-12 items-center justify-between max-w-screen-xl mx-auto p-5 border-b-4 border-dotted border-green">
            <div className="w-[180px]">
                <Logo/>
            </div>
            <nav>
                <ul className="flex gap-10 font-semibold">
                    <li><a href="/about-climate-united">About</a></li>
                    <li><a href="/our-team">Meet the Team</a></li>
                    <li><a href="/about-the-greenhouse-gas-reduction-fund">About the GGRF</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer className="bg-darkBlue text-white">
            <div className="max-w-screen-xl mx-auto py-12 px-5">
                <div className="grid grid-cols-3 gap-12">
                    <div className="font-semibold">
                        <p>7550 Wisconsin Avenue <br/>8th Floor, Bethesda, Maryland <br/>20814</p>
                        <p>Phone: 800.248.0337 | Fax: 301.576.8444 info@calvertimpact.org</p>
                    </div>
                    <nav className="col-span-2">
                        <ul>
                            <li><a href="/about-climate-united">About</a></li>
                            <li><a href="/our-team">Meet the Team</a></li>
                            <li><a href="/about-the-greenhouse-gas-reduction-fund">About the GGRF</a></li>
                        </ul>
                    </nav>
                    <div className="col-span-2">
                        <div className="w-[263px] max-w-full">
                            <LogoWhite/>
                        </div>
                    </div>
                    <ul className="flex gap-4 self-end justify-end">
                        {socialMedialLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    <a className="text-white block w-[20px] h-[20px]" href={link.url}>
                                        <SocialIcon icon={link.platform}/>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
