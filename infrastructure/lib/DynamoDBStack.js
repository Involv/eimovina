import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const tableProperties = new dynamodb.Table(this, "Properties", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
    });

    const tableUsers = new dynamodb.Table(this, "Users", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // Properties Output values
    new CfnOutput(this, "PropertiesTableName", {
      value: tableProperties.tableName,
      exportName: app.logicalPrefixedName("PropertiesTableName"),
    });

    new CfnOutput(this, "PropertiesTableArn", {
      value: tableProperties.tableArn,
      exportName: app.logicalPrefixedName("PropertiesTableArn"),
    });

    new CfnOutput(this, "PropertiesStreamArn", {
      value: tableProperties.tableStreamArn,
      exportName: app.logicalPrefixedName("PropertiesStreamArn"),
    });

    // Users Output values
    new CfnOutput(this, "UsersTableName", {
      value: tableUsers.tableName,
      exportName: app.logicalPrefixedName("UsersTableName"),
    });

    new CfnOutput(this, "UsersTableArn", {
      value: tableUsers.tableArn,
      exportName: app.logicalPrefixedName("UsersTableArn"),
    });
  }
}