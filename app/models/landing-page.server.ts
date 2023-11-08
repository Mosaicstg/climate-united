/**
 * query {
 *   landingPage(id: "2OVuAnTbko7I7V8nzbBR8K") {
 *     title
 *     sectionsCollection {
 *       items {
 *         __typename
 *         ... on SectionHero {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             description
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionTextMultiImageSplit {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImagesCollection {
 *             items {
 *               fileName
 *               url
 *               width
 *               height
 *             }
 *           }
 *         }
 *         ... on SectionTextImageSplit {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionBucketGrid {
 *           title
 *           headline
 *           mainContent {
 *             json
 *           }
 *           bucketsCollection {
 *             items {
 *               bucketText {
 *                 json
 *               }
 *               bucketImage {
 *                 fileName
 *                 url
 *                 width
 *                 height
 *               }
 *             }
 *           }
 *         }
 *         ... on SectionTextImage {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionEventsResources {
 *           title
 *           headlineEvents
 *           eventsCollection {
 *             items {
 *               headline
 *               datetime
 *               excerpt {
 *                 json
 *               }
 *             }
 *           }
 *           headlineResources
 *           resourcesCollection {
 *             items {
 *               title
 *               file {
 *                 fileName
 *                 url
 *               }
 *             }
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionNewsPressReleases {
 *           title
 *           headline
 *           postsCollection {
 *             items {
 *               title
 *               headline
 *               excerpt {
 *                 json
 *               }
 *               featuredImage {
 *                 fileName
 *                 url
 *                 description
 *                 width
 *                 height
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * {
 *   "data": {
 *     "landingPage": {
 *       "title": "Homepage",
 *       "sectionsCollection": {
 *         "items": [
 *           {
 *             "__typename": "SectionHero",
 *             "title": "Homepage Hero",
 *             "mainContent": {
 *               "json": {
 *                 "nodeType": "document",
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "nodeType": "heading-1",
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "nodeType": "text",
 *                         "value": "We understand the urgency of the climate crisis, we have one shot to get this right, and are ready to meet the moment.",
 *                         "marks": [],
 *                         "data": {}
 *                       }
 *                     ]
 *                   },
 *                   {
 *                     "nodeType": "paragraph",
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "nodeType": "text",
 *                         "value": "",
 *                         "marks": [],
 *                         "data": {}
 *                       },
 *                       {
 *                         "nodeType": "hyperlink",
 *                         "data": {
 *                           "uri": "#"
 *                         },
 *                         "content": [
 *                           {
 *                             "nodeType": "text",
 *                             "value": "Meet our advisors",
 *                             "marks": [],
 *                             "data": {}
 *                           }
 *                         ]
 *                       },
 *                       {
 *                         "nodeType": "text",
 *                         "value": "",
 *                         "marks": [],
 *                         "data": {}
 *                       }
 *                     ]
 *                   }
 *                 ]
 *               }
 *             },
 *             "featuredImage": {
 *               "fileName": "Electric cooking.png",
 *               "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *               "description": "Stir Fry. Yum!",
 *               "width": 577,
 *               "height": 603
 *             }
 *           },
 *           {
 *             "__typename": "SectionTextMultiImageSplit",
 *             "title": "Mission Statement",
 *             "mainContent": {
 *               "json": {
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "Calvert Impact, Community Preservation Corporation, and Self-Help have joined forces to form Climate United",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "heading-2"
 *                   },
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [
 *                           {
 *                             "type": "bold"
 *                           }
 *                         ],
 *                         "value": "A coalition competing to manage an award from the $14 billion National Clean Investment Fund",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": ", a component of the Greenhouse Gas Reduction Fund (GGRF) established under the Inflation Reduction Act. Awards are expected to be announced in March.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   }
 *                 ],
 *                 "nodeType": "document"
 *               }
 *             },
 *             "featuredImagesCollection": {
 *               "items": [
 *                 {
 *                   "fileName": "Electric cooking.png",
 *                   "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                   "width": 577,
 *                   "height": 603
 *                 },
 *                 {
 *                   "fileName": "Electric cooking.png",
 *                   "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                   "width": 577,
 *                   "height": 603
 *                 },
 *                 {
 *                   "fileName": "Electric cooking.png",
 *                   "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                   "width": 577,
 *                   "height": 603
 *                 }
 *               ]
 *             }
 *           },
 *           {
 *             "__typename": "SectionTextImageSplit",
 *             "title": "Our Work",
 *             "mainContent": {
 *               "json": {
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "Our work together - alongside hundreds of our community-based partners nationwide - will leverage public funds to transform markets in pursuit of a more inclusive net-zero transition.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "heading-2"
 *                   },
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {
 *                           "uri": "#"
 *                         },
 *                         "content": [
 *                           {
 *                             "data": {},
 *                             "marks": [],
 *                             "value": "Lorem Ipsum",
 *                             "nodeType": "text"
 *                           }
 *                         ],
 *                         "nodeType": "hyperlink"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "",
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
 *               "width": 577,
 *               "height": 603
 *             }
 *           },
 *           {
 *             "__typename": "SectionBucketGrid",
 *             "title": "Impact Buckets",
 *             "headline": "Together We'll Deliver",
 *             "mainContent": {
 *               "json": {
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "We have a strong track record creating economic opportunity, sustainable development, and climate solutions in Justice40 communities.\n",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [
 *                           {
 *                             "type": "bold"
 *                           }
 *                         ],
 *                         "value": "A combined 110 years of experience  investing and managing more than $30 billion in capital  across 50 states.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   }
 *                 ],
 *                 "nodeType": "document"
 *               }
 *             },
 *             "bucketsCollection": {
 *               "items": [
 *                 {
 *                   "bucketText": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Better Health",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "heading-3"
 *                         },
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   },
 *                   "bucketImage": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                     "width": 577,
 *                     "height": 603
 *                   }
 *                 },
 *                 {
 *                   "bucketText": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Lower Energy Costs",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "heading-3"
 *                         },
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   },
 *                   "bucketImage": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                     "width": 577,
 *                     "height": 603
 *                   }
 *                 },
 *                 {
 *                   "bucketText": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Quality Jobs",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "heading-3"
 *                         },
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   },
 *                   "bucketImage": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                     "width": 577,
 *                     "height": 603
 *                   }
 *                 },
 *                 {
 *                   "bucketText": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Equitable Economic Opportunity for All",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "heading-3"
 *                         },
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   },
 *                   "bucketImage": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                     "width": 577,
 *                     "height": 603
 *                   }
 *                 }
 *               ]
 *             }
 *           },
 *           {
 *             "__typename": "SectionTextImage",
 *             "title": "CTA",
 *             "mainContent": {
 *               "json": {
 *                 "data": {},
 *                 "content": [
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "Our work together - alongside hundreds of our community-based partners nationwide - that delivers ",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [
 *                           {
 *                             "type": "bold"
 *                           }
 *                         ],
 *                         "value": "better health, lower energy costs, quality jobs, and equitable economic opportunity for all",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": ".",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   },
 *                   {
 *                     "data": {},
 *                     "content": [
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "",
 *                         "nodeType": "text"
 *                       },
 *                       {
 *                         "data": {
 *                           "uri": "#"
 *                         },
 *                         "content": [
 *                           {
 *                             "data": {},
 *                             "marks": [],
 *                             "value": "Lorem Ipsum",
 *                             "nodeType": "text"
 *                           }
 *                         ],
 *                         "nodeType": "hyperlink"
 *                       },
 *                       {
 *                         "data": {},
 *                         "marks": [],
 *                         "value": "",
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
 *               "width": 577,
 *               "height": 603
 *             }
 *           },
 *           {
 *             "__typename": "SectionEventsResources",
 *             "title": "Events and Resources",
 *             "headlineEvents": "Event Calendar",
 *             "headlineResources": "GGRF Resources",
 *             "featuredImage": {
 *               "fileName": "Electric cooking.png",
 *               "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *               "width": 577,
 *               "height": 603
 *             },
 *             "eventsCollection": {
 *               "items": [
 *                 {
 *                   "headline": "Lorem ipsum dolor sit amet consectetur",
 *                   "datetime": "2024-01-20T12:00:00.000-05:00",
 *                   "excerpt": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur.",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   }
 *                 }
 *               ]
 *             },
 *             "resourcesCollection": {
 *               "items": [
 *                 {
 *                   "title": "GGRF Fact Sheet | English",
 *                   "file": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png"
 *                   }
 *                 }
 *               ]
 *             }
 *           },
 *           {
 *             "__typename": "SectionNewsPressReleases",
 *             "title": "News & Press Releases",
 *             "headline": "News & Press Releases",
 *             "postsCollection": {
 *               "items": [
 *                 {
 *                   "title": "Sample Post",
 *                   "headline": "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
 *                   "excerpt": {
 *                     "json": {
 *                       "data": {},
 *                       "content": [
 *                         {
 *                           "data": {},
 *                           "content": [
 *                             {
 *                               "data": {},
 *                               "marks": [],
 *                               "value": "Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur. Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur.",
 *                               "nodeType": "text"
 *                             }
 *                           ],
 *                           "nodeType": "paragraph"
 *                         }
 *                       ],
 *                       "nodeType": "document"
 *                     }
 *                   },
 *                   "featuredImage": {
 *                     "fileName": "Electric cooking.png",
 *                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *                     "description": "Stir Fry. Yum!",
 *                     "width": 577,
 *                     "height": 603
 *                   }
 *                 }
 *               ]
 *             }
 *           }
 *         ]
 *       }
 *     }
 *   }
 * }
 */