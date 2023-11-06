import { fetchGraphQL } from "~/services/contentful.server";

type SocialMediaLink = {
  platform: string;
  url: string;
};

export async function getSocialMediaLinks(): Promise<Array<SocialMediaLink>> {
  const query = `
       query {
            socialMediaLinkCollection(limit: 6) {
                items {
                    platform
                    url
                }
            }
        } 
    `;

  const response = await fetchGraphQL(query);

  return response.data.socialMediaLinkCollection.items;
}
