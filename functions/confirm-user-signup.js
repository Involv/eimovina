import dynamoDb from "../libs/dynamodb-lib";

export const main = async (event) => {
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const name = event.request.userAttributes['name'];
    const user = {
      id: event.userName,
      name,
      createdAt: new Date().toJSON(),
    };

    const params = {
      TableName: process.env.USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    };

    await dynamoDb.put(params);

    return event;
  } else {
    return event;
  }
};