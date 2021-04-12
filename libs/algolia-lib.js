import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export const searchProperty = query => {
  return index.search(query);
};
