import handler from "../libs/handler-lib";
import {initPropertyIndex} from "../libs/algolia-lib";

export const main = handler(async (event) => {
  const index = await initPropertyIndex(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
  const { search }= event.arguments;
  console.log("SEARCH: ", search);
  const res = await index.search(search);
  console.log("Algolia search result: ", res);
  return {
    properties: res.hits,
    nextToken: null
  };
});