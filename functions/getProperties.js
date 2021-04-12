import handler from "../libs/handler-lib";
import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
index.setSettings({
  "searchableAttributes": [
    "realEstateListNumber, plotNumber",
  ]
});

export const main = handler(async (event) => {
  console.log('searchAlgoliaIndex main was called');
  const { search }= event.arguments;
  console.log(search);

  const res = await index.search(search);
  console.log("Algolia search result: ", res);

  return res.hits;
});