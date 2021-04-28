import handler from "../libs/handler-lib.js";
import dynamoDb from "../libs/dynamodb-lib.js";

export const main = handler(async (event) => {
  console.log("NOTIFY PROPERTY UPDATED");
  const now = new Date().toJSON();
  const { id, userId, propertyId } = event.arguments;
  const notification = {
    id,
    userId,
    propertyId,
    read: false,
    createdAt: now,
  };

  const params = {
    TableName: process.env.NOTIFICATIONS_TABLE,
    Item: notification,
  };

  await dynamoDb.put(params);
  console.log("NEW NOTIFICATION: ", notification);
  return notification;
});