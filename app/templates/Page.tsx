import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextRenderOptions} from "~/routes/about-the-greenhouse-gas-reduction-fund";
import {type Page} from "~/models/page.server";

type basicPageProps = Page;

export function Page({title, headline, featuredImage, mainContent}: basicPageProps) {
    const {url, description, width, height} = featuredImage;
    return (
        <>
            <div className="max-w-screen-xl mx-auto py-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="relative md:order-2 md:w-1/3">
                        <div className="absolute bottom-0 right-3/5 translate-x-1/2 translate-y-1/3 rounded-full bg-lightGreen w-[156px] h-[156px]"></div>
                        <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue w-[156px] h-[156px]"></div>
                        <img className="relative w-full rounded-full aspect-square object-cover" src={url} alt={description} width={width} height={height}/>
                    </div>
                    <div className="md:order-1 md:w-2/3">
                        <h1 className="mb-5 text-3xl text-green font-bold">{headline}</h1>
                        {documentToReactComponents(mainContent.json, richTextRenderOptions)}
                    </div>
                </div>
            </div>
        </>
    );
}
