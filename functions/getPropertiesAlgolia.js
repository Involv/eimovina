import { searchProperty} from "../libs/algolia-lib";
import handler from "../libs/handler-lib";

export const main = handler(async (event) => {
  console.log('searchAlgoliaIndex main was called');
  const { search }= event.arguments;
  console.log(search);

  const res = await searchProperty(search);
  console.log("Algolia search result: ", res);

  return res.hits;
});