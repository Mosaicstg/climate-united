/**
 * query {
 *   sectionNewsPressReleases(id: "48PGazH9Rdup7nqoqbGHHc") {
 *     title
 *     headline
 *     postsCollection {
 *       items {
 *         title
 *         headline
 *         excerpt {
 *           json
 *         }
 *         featuredImage {
 *           fileName
 *           url
 *           description
 *           width
 *           height
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * {
 *   "data": {
 *     "sectionNewsPressReleases": {
 *       "title": "News & Press Releases",
 *       "headline": "News & Press Releases",
 *       "postsCollection": {
 *         "items": [
 *           {
 *             "title": "Sample Post",
 *             "headline": "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
 *             "excerpt": {
 *               "json": {
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur. Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   }
 *                 ],
 *                 "nodeType": "document"
 *               }
 *             },
 *             "featuredImage": {
 *               "fileName": "Electric cooking.png",
 *               "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *               "description": "Stir Fry. Yum!",
 *               "width": 577,
 *               "height": 603
 *             }
 *           }
 *         ]
 *       }
 *     }
 *   }
 * }
 */