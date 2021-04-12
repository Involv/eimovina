import DynamoDB from "aws-sdk/clients/dynamodb";
import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export const main = async (event) => {
  console.log('syncAlgoliaIndex was called');
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      const property = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      await index.saveObject(property, { autoGenerateObjectIDIfNotExist: true });
    }
  }
};