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
  if (!property.favoriteBy || !property.favoriteBy.length) return;
  property.favoriteBy.forEach((userId) => console.log(`Notify user with id: ${userId}`));
  await Promise.all(property.favoriteBy.map(async (userId) => {
    console.log(`Notify user with id: ${userId}`);
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
      userId,
      propertyId: property.id,
    });
  }));
}