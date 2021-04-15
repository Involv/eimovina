import algoliasearch from "algoliasearch";

let propertyIndex;

export const initPropertyIndex = async (appId, key) => {
  if (!propertyIndex) {
    const client = algoliasearch(appId, key);
    propertyIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
    await propertyIndex.setSettings({
      "searchableAttributes": [
        "realEstateListNumber, plotNumber",
      ],
      "typoTolerance": false
    });
  }

  return propertyIndex;
};