import DynamoDB from "aws-sdk/clients/dynamodb";
import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export const main = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      const property = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      property.objectID = property.id;
      await index.saveObjects([property]);
    } else if (record.eventName === 'REMOVE') {
      const property = DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      await index.deleteObjects([property.id]);
    }
  }
};