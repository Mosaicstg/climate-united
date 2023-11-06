import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Block, Inline } from "@contentful/rich-text-types";
import {
  type LinksFunction,
  type DataFunctionArgs,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ReactNode } from "react";
import { getPage } from "~/models/page.server";

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node;
      const { uri } = data;
      return (
        <a
          className="text-primary underline dark:text-gray-400"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children[0]}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mb-4 text-justify text-base leading-relaxed text-gray-700 dark:text-gray-300 md:mb-7 md:text-xl">
          {children}
        </p>
      );
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-4xl dark:text-gray-200">{children}</h2>;
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl dark:text-gray-200">{children}</h2>;
    },
  },
};

export const loader = async ({}: DataFunctionArgs) => {
  const aboutPage = await getPage("1ydvGd1x8TYHNWeNUbqFeC");

  return json({ page: aboutPage });
};

export default function About() {
  const { page } = useLoaderData<typeof loader>();

  console.log(page);

  return (
    <main className="p-6">
      <div className="mb-10 flex flex-col items-center justify-center"></div>
      <h1>{page.headline}</h1>
      <div className="">
        {documentToReactComponents(page.bodyText.json, richTextRenderOptions)}
      </div>
    </main>
  );
}
