// import DynamoDB from "aws-sdk/clients/dynamodb";
import graphql from "graphql-tag";
import { mutate } from "../libs/graphql";
import { ulid } from "ulid";

export const main = async (event) => {
  console.log("NOTIFY STREAM");
  console.log("EVENT RECORDS: ", event.Records);
  try {
    await notifyPropertyUpdatedMutation();
  } catch (e) {
    console.log("CATCH ERR: ", e);
  }
  // for (const record of event.Records) {
  //   if (record.eventName === 'MODIFY') {
  //     const property = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
  //     console.log("PROPRETY FROM NOTIFY: ", property);
  //     try {
  //       await notifyPropertyUpdatedMutation(property);
  //     } catch (e) {
  //       console.log("CATCH ERR: ", e);
  //     }
  //     console.log("NOTIFY PROPERTY FROM FOR LOOP CALLED AND DONE");
  //   };
  // };
  console.log("NOTIFY STREAM FINISHED");
};

async function notifyPropertyUpdatedMutation() {
  console.log("NOTIFY PROPERTY UPDATED MUTATION");
  await mutate(graphql `mutation notifyPropertyUpdated(
    $id: ID!
    $userId: ID!
    $propertyId: ID!
  ) {
    notifyPropertyUpdated(
      id: $id
      userId: $userId
      propertyId: $propertyId
    ) {
      id
      userId
      propertyId
      createdAt
    }
  }`, {
    id: ulid(),
    userId: "29be4080-8ede-4b8d-8757-447cf26afc3a",
    propertyId: "11111",
  });
  console.log("MUTATE WAS SUPPOSED TO BE CALLED");
}

notifyPropertyUpdatedMutation();