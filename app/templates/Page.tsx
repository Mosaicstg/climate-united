import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "~/routes/about-the-greenhouse-gas-reduction-fund";
import { Document } from "@contentful/rich-text-types";

type basicPageProps = {
  headline: string;
  image: { url: string; description: string; width: number; height: number };
  bodyText: { json: Document };
};

export function Page({ headline, image, bodyText }: basicPageProps) {
  const { url, description, width, height } = image;
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-center">
        <img src={url} alt={description} width={width} height={height} />
      </div>
      <h1>{headline}</h1>
      <div className="">
        {documentToReactComponents(bodyText.json, richTextRenderOptions)}
      </div>
    </>
  );
}
