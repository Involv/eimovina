import DynamoDB from "aws-sdk/clients/dynamodb";
import { mutate } from "../libs/client";
import { ulid } from "ulid";

export const main = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'MODIFY') {
      const property = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      await notifyPropertyUpdatedMutation(property);
    };
  };
};

async function notifyPropertyUpdatedMutation(property) {
  await mutate(`mutation notifyPropertyUpdated(
    $id: ID!
    $userId: ID!
    $propertyId: ID!
  ) {
    notifyPropertyUpdated(
      id: $id
      userId: $userId
      propertyId: $propertyId
    ) {
      id
      userId
      propertyId
      createdAt
    }
  }`,
  'notifyPropertyUpdated',
  {
    id: ulid(),
    userId: "29be4080-8ede-4b8d-8757-447cf26afc3a",
    propertyId: property.id,
  });
}