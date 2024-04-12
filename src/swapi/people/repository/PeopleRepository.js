import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const PEOPLE_TABLE_NAME = process.env.PEOPLE_TABLE_NAME;

export class PeopleRepository {
  async create(createPeopleDto) {
    const people = marshall(createPeopleDto);
    const command = new PutItemCommand({
      TableName: PEOPLE_TABLE_NAME,
      Item: people,
    });
    await client.send(command);
    return unmarshall(people);
  }

  async get(getPeopleDto) {
    const command = new GetItemCommand({
      TableName: PEOPLE_TABLE_NAME,
      Key: marshall(getPeopleDto),
    });
    const response = await client.send(command);
    return response.Item ? unmarshall(response.Item) : undefined;
  }

  async getAll() {
    const scanParams = {
      TableName: PEOPLE_TABLE_NAME,
    };
    const scanCommand = new ScanCommand(scanParams);
    const response = await client.send(scanCommand);
    return response;
  }

  async update(createPeopleDto) {
    const itemKeys = Object.keys(createPeopleDto).filter(
      (item) => item !== "id"
    );
    const command = new UpdateItemCommand({
      TableName: PEOPLE_TABLE_NAME,
      Key: marshall({ id: createPeopleDto.id }),
      UpdateExpression: `SET ${itemKeys
        .map((k, index) => `#field${index} = :value${index}`)
        .join(", ")}`,
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
        {}
      ),
      ExpressionAttributeValues: marshall(
        itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]: createPeopleDto[k],
          }),
          {}
        )
      ),
      ReturnValues: "ALL_NEW",
      ConditionExpression: "attribute_exists(id)",
    });
    const response = await client.send(command);
    return response.Attributes ? unmarshall(response.Attributes) : undefined;
  }

  async delete(getPeopleDto) {
    const command = new DeleteItemCommand({
      TableName: PEOPLE_TABLE_NAME,
      Key: marshall(getPeopleDto),
    });
    await client.send(command);
    return true;
  }
}
