import dynamoDb from "../libs/dynamodb-lib";

export const main = async (event) => {
  console.log("EVENT: ", {event});
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: event.identity.username,
    },
    UpdateExpression: "SET lastUpdatedAt = :now",
    ExpressionAttributeValues: {
      ":now": new Date().toJSON()
    },
    ConditionExpression: 'attribute_exists(id)',
    ReturnValues: "ALL_NEW",
  };

  const updatedUser = await dynamoDb.update(params);
  return updatedUser.Attributes;
};