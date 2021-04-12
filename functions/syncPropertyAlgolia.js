import DynamoDB from "aws-sdk/clients/dynamodb";
import {initPropertyIndex} from "../libs/algolia-lib";

export const main = async (event) => {
  const index = await initPropertyIndex(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
      const property = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      property.objectID = property.id;
      await index.saveObjects([property]);
    } else if (record.eventName === 'REMOVE') {
      const id = record.dynamodb.Keys.id.S;
      await index.deleteObjects([id]);
    }
  }
};