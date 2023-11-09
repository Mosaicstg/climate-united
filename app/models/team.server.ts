/**
 * query {
 *   teamPage(id: "r4OYblQ1BKEvh8k7RHp09") {
 *     title
 *     headline
 *     sectionsCollection {
 *       items {
 *         title
 *         headline
 *         mainContent {
 *           json
 *         }
 *         teamMembersCollection(limit: 50) {
 *           items {
 *             name
 *             position
 *             department
 *             featuredImage {
 *               fileName
 *               url
 *               description
 *               width
 *               height
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
 *     "teamPage": {
 *       "title": "Our Team",
 *       "headline": "Our Team",
 *       "sectionsCollection": {
 *         "items": [
 *           {
 *             "title": "Board of Directors",
 *             "headline": "Our Board of Directors",
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
 *                         "value": "Our Inaugural Board of Directors will oversee the consortium strategy and implementation of the Environmental Protection Agency’s $14 billion National Clean Investment Fund, part of the Greenhouse Gas Reduction Fund, if its proposal to manage all or part of the fund is chosen by the EPA in its ongoing selection process. The Board is comprised of leaders in clean energy, community and economic development, sustainable finance, and movement building.",
 *                         "nodeType": "text"
 *                       }
 *                     ],
 *                     "nodeType": "paragraph"
 *                   }
 *                 ],
 *                 "nodeType": "document"
 *               }
 *             },
 *             "teamMembersCollection": {
 *               "items": [
 *                 {
 *                   "name": "Caroline Nowery",
 *                   "position": "Sr. Vice President, Chief External Affairs Officer",
 *                   "department": "Virginia Community Capital",
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