import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

const { PROPERTIES_TABLE } = process.env;

export const main = handler(async (event) => {
  const { search }= event.arguments;
  const realEstateListParams = {
    TableName: PROPERTIES_TABLE,
    KeyConditionExpression: "realEstateListNumber = :search",
    ExpressionAttributeValues: {
      ":search": search,
    },
  };

  const plotNumberParams = {
    TableName: PROPERTIES_TABLE,
    IndexName: 'byPlotNumber',
    KeyConditionExpression: "plotNumber = :search",
    ExpressionAttributeValues: {
      ":search": search,
    },
  };

  const realEstateLists = await dynamoDb.query(realEstateListParams);
  const plots = await dynamoDb.query(plotNumberParams);

  const res = [...realEstateLists.Items, ...plots.Items];

  return res;
});
