import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event) => {
  console.log("EVENT: ", {event});

  const propertyIds = await getUserFavoritePropertyIds(event.identity.username);
  const ids = constructIdKeys(propertyIds);
  console.log("Property IDS: ", ids);

  let params = {RequestItems: {}};
  params.RequestItems[process.env.PROPERTY_TABLE] = {
    Keys: ids,
  };

  console.log("Params: ", params);

  const result = await dynamoDb.batchGet(params);
  console.log("User Favorite Properties result: ", JSON.stringify(result, null, 4));
  return result.Responses[process.env.PROPERTY_TABLE];
});

const getUserFavoritePropertyIds = async (userId) => {
  console.log("USER ID: ", userId);
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: userId,
    },
    ProjectionExpression: 'favoritePropertyIds',
  };

  const userFavoritePropertyIds = await dynamoDb.get(params);
  console.log("User Favorite Property Ids: ", JSON.stringify(userFavoritePropertyIds, null, 4));
  return userFavoritePropertyIds.Item.favoritePropertyIds;
};

const constructIdKeys = (propertyIds = []) => {
  return propertyIds.map(propertyId => ({ 'id': propertyId }));
};