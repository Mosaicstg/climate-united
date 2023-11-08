import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextRenderOptions} from "~/routes/about-the-greenhouse-gas-reduction-fund";
import {type Page} from "~/models/page.server";

type basicPageProps = Page;

export function Page({title, headline, featuredImage, mainContent}: basicPageProps) {
    const {url, description, width, height} = featuredImage;
    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <div className="mb-10 flex flex-col items-center justify-center">
                    <img src={url} alt={description} width={width} height={height}/>
                </div>
                <h1>{headline}</h1>
                <div className="">
                    {documentToReactComponents(mainContent.json, richTextRenderOptions)}
                </div>
            </div>
        </>
    );
}
