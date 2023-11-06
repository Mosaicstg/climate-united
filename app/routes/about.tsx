import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { data } = node;
      const { uri } = data;
      return (
        <a className="text-primary underline dark:text-gray-400" target="_blank" rel="noreferrer" href={uri}>
          {children[0]}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <p className="md:text-xl text-gray-700 text-base dark:text-gray-300 leading-relaxed mb-4 md:mb-7 text-justify">
          {children}
        </p>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return <h2 className="text-4xl dark:text-gray-200 mb-5">{children}</h2>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 className="text-3xl dark:text-gray-200 mb-5">{children}</h2>;
    },
  },
};

export default function About() {
  return <div>About page</div>;
}
