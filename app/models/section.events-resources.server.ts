/**
 * query {
 *   sectionEventsResources(id: "6Kq0GW9PHpAdSwYopevujL") {
 *     title
 *     headlineEvents
 *     eventsCollection {
 *       items {
 *         headline
 *         datetime
 *         excerpt {
 *           json
 *         }
 *       }
 *     }
 *     headlineResources
 *     resourcesCollection {
 *       items {
 *         title
 *         file {
 *           fileName
 *           url
 *         }
 *       }
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       width
 *       height
 *     }
 *   }
 * }
 */

/**
 * {
 *   "data": {
 *     "sectionEventsResources": {
 *       "title": "Events and Resources",
 *       "headlineEvents": "Event Calendar",
 *       "headlineResources": "GGRF Resources",
 *       "featuredImage": {
 *         "fileName": "Electric cooking.png",
 *         "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *         "width": 577,
 *         "height": 603
 *       },
 *       "eventsCollection": {
 *         "items": [
 *           {
 *             "headline": "Lorem ipsum dolor sit amet consectetur",
 *             "datetime": "2024-01-20T12:00:00.000-05:00",
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
 *                         "value": "Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   }
 *                 ],
 *                 "nodeType": "document"
 *               }
 *             }
 *           }
 *         ]
 *       },
 *       "resourcesCollection": {
 *         "items": [
 *           {
 *             "title": "GGRF Fact Sheet | English",
 *             "file": {
 *               "fileName": "Electric cooking.png",
 *               "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png"
 *             }
 *           }
 *         ]
 *       }
 *     }
 *   }
 * }
 */