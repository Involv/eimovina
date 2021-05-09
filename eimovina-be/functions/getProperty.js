import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.PROPERTY_TABLE,
    Key: {
      id: event.arguments.id,
   },
  };

  const result = await dynamoDb.get(params);

  return result.Item;
});