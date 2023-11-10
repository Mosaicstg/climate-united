import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {richTextRenderOptions} from "~/routes/news.$postSlug";
import {type Post} from "~/models/post.server";
import {transformDateTimeStringToHumanReadable} from '~/utils/datetime-to-readable';

type PostProps = Post;

export function Post({title, headline, date, mainContent}: PostProps) {
    return (
        <>
            <div className="max-w-screen-lg mx-auto py-12">
                <h1 className="mb-5 text-3xl text-green font-bold">{headline}</h1>
                <p className="mb-5 uppercase">{transformDateTimeStringToHumanReadable(date)}</p>
                {documentToReactComponents(mainContent.json, richTextRenderOptions)}
            </div>
        </>
    );
}
