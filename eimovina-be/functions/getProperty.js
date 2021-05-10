import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.PROPERTY_TABLE,
    Key: {
      id: event.arguments.id,
   },
  };

  const propertyItem = await dynamoDb.get(params);
  const result = propertyItem.Item;

  const userId = event.identity ? event.identity.username : "";
  if (userId) {
    result.isFavorite = result.favoriteBy ? result.favoriteBy.includes(userId) : false;
  }

  return result;
});