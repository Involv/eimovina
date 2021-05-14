import dynamoDb from "../libs/dynamodb-lib";

export const main = async (event) => {
  const { propertyId } = event.arguments;
  const { username } = event.identity;

  const user = await getItem(username, process.env.USERS_TABLE);
  const property = await getItem(propertyId, process.env.PROPERTY_TABLE);

  const newFavoritePropertyIds = addOrRemoveFromArray(propertyId, user.favoritePropertyIds);
  const newFavoriteBy = addOrRemoveFromArray(username, property.favoriteBy);

  await updateArray(propertyId, newFavoriteBy, 'favoriteBy', process.env.PROPERTY_TABLE);
  const updatedUser = await updateArray(username, newFavoritePropertyIds, 'favoritePropertyIds', process.env.USERS_TABLE);
  return updatedUser.Attributes;
};

const getItem = async (id, tableName) => {
  const params = {
    TableName: tableName,
    Key: { id }
  };
  const resp = await dynamoDb.get(params);
  return resp.Item;
};

const addOrRemoveFromArray = (el, arr = []) => {
  return arr.includes(el) ? arr.filter(arrEl => arrEl !== el) : [...arr, el];
};

const updateArray = async (id, newArr = [], arrField, tableName) => {
  const params = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: `SET ${arrField} = :newArr`,
    ExpressionAttributeValues: {
      ":newArr": newArr,
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: "ALL_NEW"
  };

  return dynamoDb.update(params);
};