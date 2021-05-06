import dynamoDb from "../libs/dynamodb-lib";

export const main = async (event) => {
  console.log("EVENT: ", {event});

  const { propertyId } = event.arguments;
  const { username } = event.identity;

  const userParams = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: username,
    }
  };
  const userResp = await dynamoDb.get(userParams);

  const newFavoritePropertyIds = configureFavoritePropertyIdsArray(
    propertyId,
    userResp.Item.favoritePropertyIds
  );

  const isPropertyFavorite = newFavoritePropertyIds.includes(propertyId);

  const propertyParams = {
    TableName: process.env.PROPERTY_TABLE,
    Key: {
      id: propertyId,
    }
  };
  const propertyResp = await dynamoDb.get(propertyParams);

  const newFavoriteBy = configureFavoriteByArray(
    username,
    propertyResp.Item.favoriteBy,
    isPropertyFavorite
  );
  await updatePropertyFavoriteBy(propertyId, newFavoriteBy);

  const updatedUser = await updateUserFavoriteProperties(username, newFavoritePropertyIds);
  return updatedUser.Attributes;
};

const updateUserFavoriteProperties = async (userId, newFavoritePropertyIds) => {
  const updateUserParams = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: userId,
    },
    UpdateExpression: "SET favoritePropertyIds = :propertyIds",
    ExpressionAttributeValues: {
      ":propertyIds": newFavoritePropertyIds
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: "ALL_NEW"
  };

  return await dynamoDb.update(updateUserParams);
};

const updatePropertyFavoriteBy = async (propertyId, newFavoriteBy) => {
  const updatePropertyParams = {
    TableName: process.env.PROPERTY_TABLE,
    Key: {
      id: propertyId,
    },
    UpdateExpression: "SET favoriteBy = :newFavoriteBy",
    ExpressionAttributeValues: {
      ":newFavoriteBy": newFavoriteBy
    },
    ConditionExpression: "attribute_exists(id)"
  };
  await dynamoDb.update(updatePropertyParams);
};

const configureFavoritePropertyIdsArray = (propertyId, favoritePropertyIds) => {
  const newFavoritePropertyIds = !favoritePropertyIds ? [] : [...favoritePropertyIds];

  console.log("passed propertyId: ", propertyId);
  console.log("BEFORE favoritePropertyIds: ", newFavoritePropertyIds);

  if (newFavoritePropertyIds.includes(propertyId)) {
    const propertyIdIndex = newFavoritePropertyIds.indexOf(propertyId);
    newFavoritePropertyIds.splice(propertyIdIndex, 1);
  } else {
    newFavoritePropertyIds.push(propertyId);
  }

  console.log("AFTER favoritePropertyIds: ", newFavoritePropertyIds);

  return newFavoritePropertyIds;
};

const configureFavoriteByArray = (userId, favoriteBy, isPropertyFavorite) => {
  const newFavoriteBy = !favoriteBy ? [] : [...favoriteBy];

  if (isPropertyFavorite) {
    newFavoriteBy.push(userId);
  } else {
    const userIdIndex = newFavoriteBy.indexOf(userId);
    newFavoriteBy.splice(userIdIndex, 1);
  }

  return newFavoriteBy;
};
