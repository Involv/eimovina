import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event) => {
  const { search }= event.arguments;
  
  const paramsRL = {
    TableName: "eimovina-be-dev-nekretnina",
    KeyConditionExpression: "realEstateListId = :search",
    ExpressionAttributeValues: {
      ":search": search,
    },
  };

  const paramsPL = {
    TableName: "eimovina-be-dev-nekretnina",
    IndexName: "PlotNumberIndex",
    KeyConditionExpression: "plotNumber = :search",
    ExpressionAttributeValues: {
      ":search": search,
    },
  };

  const realEstateLists = await dynamoDb.query(paramsRL);
  const plots = await dynamoDb.query(paramsPL);

  const res = [...realEstateLists.Items, ...plots.Items];

  return res;
});
