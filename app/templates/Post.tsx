import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextRenderOptions} from "~/routes/sample-post";
import {type Post} from "~/models/post.server";

type postProps = Post;

export function Post({title, headline, date, excerpt, mainContent, featuredImage}: postProps) {
    return (
        <>
            <div className="max-w-screen-lg mx-auto py-12">
                <h1 className="mb-5 text-3xl text-green font-bold">{headline}</h1>
                <p className="mb-5 uppercase">{date}</p>
                {documentToReactComponents(mainContent.json, richTextRenderOptions)}
            </div>
        </>
    );
}
