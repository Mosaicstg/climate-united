/**
 * query {
 *   caseStudy(id: "6ueMOUJagDMrM14R1W64Nn") {
 *     title
 *     headline
 *     excerpt {
 *       json
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       description
 *       width
 *       height
 *     }
 *   }
 * }
 */

/**
 * {
 *   "data": {
 *     "caseStudy": {
 *       "title": "Sample Case Study",
 *       "headline": "Distrubted Generation: 15,000 Families in the South will Gain Access to Rooftop Solar",
 *       "excerpt": {
 *         "json": {
 *           "data": {},
 *           "content": [
 *             {
 *               "data": {},
 *               "content": [
 *                 {
 *                   "data": {},
 *                   "marks": [],
 *                   "value": "Florida-based Climate First Bancorp has a residential rooftop program that can be\nscaled to support low-income families across the South. The technology they\nutilize enables customer outreach, education, and financing via point-of-sale from\na vetted network of 200+ solar contractors, including minority-owned,\nveteran-owned, woman-owned, and Business Enterprise Certified solar installers.",
 *                   "nodeType": "text"
 *                 }
 *               ],
 *               "nodeType": "paragraph"
 *             }
 *           ],
 *           "nodeType": "document"
 *         }
 *       },
 *       "featuredImage": {
 *         "fileName": "Electric cooking.png",
 *         "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *         "description": "Stir Fry. Yum!",
 *         "width": 577,
 *         "height": 603
 *       }
 *     }
 *   }
 * }
 */

/**
 * query {
 *   caseStudyCollection {
 *     items {
 *       title
 *       headline
 *     excerpt {
 *       json
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       description
 *       width
 *       height
 *     }
 *     }
 *   }
 * }
 */

/**
 * {
 *   "data": {
 *     "caseStudyCollection": {
 *       "items": [
 *         {
 *           "title": "Sample Case Study",
 *           "headline": "Distrubted Generation: 15,000 Families in the South will Gain Access to Rooftop Solar",
 *           "excerpt": {
 *             "json": {
 *               "data": {},
 *               "content": [
 *                 {
 *                   "data": {},
 *                   "content": [
 *                     {
 *                       "data": {},
 *                       "marks": [],
 *                       "value": "Florida-based Climate First Bancorp has a residential rooftop program that can be\nscaled to support low-income families across the South. The technology they\nutilize enables customer outreach, education, and financing via point-of-sale from\na vetted network of 200+ solar contractors, including minority-owned,\nveteran-owned, woman-owned, and Business Enterprise Certified solar installers.",
 *                       "nodeType": "text"
 *                     }
 *                   ],
 *                   "nodeType": "paragraph"
 *                 }
 *               ],
 *               "nodeType": "document"
 *             }
 *           },
 *           "featuredImage": {
 *             "fileName": "Electric cooking.png",
 *             "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
 *             "description": "Stir Fry. Yum!",
 *             "width": 577,
 *             "height": 603
 *           }
 *         }
 *       ]
 *     }
 *   }
 * }
 */