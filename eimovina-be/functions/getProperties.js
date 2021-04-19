import Chance from 'chance';
import handler from "../libs/handler-lib";
import {initPropertyIndex} from "../libs/algolia-lib";

const chance = new Chance();

export const main = handler(async (event) => {
  const index = await initPropertyIndex(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

  const { search, limit, nextToken } = event.arguments;

  const searchParams = parseNextToken(nextToken) || {
    hitsPerPage: limit,
    page: 0
  };

  const { hits, page, nbPages } = await index.search(search, searchParams);

  let nextSearchParams;
  if (page + 1 >= nbPages) {
    nextSearchParams = null;
  } else {
    nextSearchParams = { ...searchParams, page: page + 1 };
  }

  return {
    properties: hits,
    nextToken: genNextToken(nextSearchParams)
  };
});

function parseNextToken(nextToken) {
  if (!nextToken) {
    return undefined;
  }

  const token = Buffer.from(nextToken, 'base64').toString();
  const searchParams = JSON.parse(token);
  delete searchParams.random;

  return searchParams;
}

function genNextToken(searchParams) {
  if (!searchParams) {
    return null;
  }
  const random =  chance.string({ length: 16 });
  const payload = { ...searchParams, random };
  const token = JSON.stringify(payload);
  return Buffer.from(token).toString('base64');
}