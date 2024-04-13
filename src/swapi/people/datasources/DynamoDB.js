import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export class DynamoDB {
  constructor() {
    this.docClient = new DynamoDBClient({ region: "us-east-1" });
  }

  async create({ tableName, createDto }) {
    const item = marshall(createDto);
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await this.docClient.send(command);
    return unmarshall(item);
  }

  async update({ tableName, key, updateDto, itemKeys }) {
    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: marshall(key),
      UpdateExpression: `SET ${itemKeys
        .map((k, index) => `#field${index} = :value${index}`)
        .join(", ")}`,
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({
          ...accumulator,
          [`#field${index}`]: k,
        }),
        {}
      ),
      ExpressionAttributeValues: marshall(
        itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]: updateDto[k],
          }),
          {}
        )
      ),
      ReturnValues: "ALL_NEW",
      ConditionExpression: "attribute_exists(id)",
    });
    const response = await this.docClient.send(command);
    return response.Attributes ? unmarshall(response.Attributes) : undefined;
  }

  async delete({ tableName, key }) {
    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: marshall(key),
    });
    await this.docClient.send(command);
    return true;
  }

  async getAll({ tableName }) {
    const scanParams = {
      TableName: tableName,
    };
    const scanCommand = new ScanCommand(scanParams);
    const response = await this.docClient.send(scanCommand);
    return response.Items ? response.Items.map((item) => unmarshall(item)) : [];
  }

  async get({ tableName, key }) {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: marshall(key),
    });
    const response = await this.docClient.send(command);
    return response.Item ? unmarshall(response.Item) : undefined;
  }
}
