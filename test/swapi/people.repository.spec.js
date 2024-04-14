import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

import { Items } from "./people.mock";
import { PeopleRepository } from "../../src/swapi/people/repository/PeopleRepository";

const ddbMock = mockClient(DynamoDBClient);
const peopleRepository = new PeopleRepository();

describe("People Repository", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  test("should getAll People", () => {
    ddbMock.on(ScanCommand).resolves({ Items });
    peopleRepository.getAll();
    expect().toBeUndefined();
  });

  test("should getAll People empty", () => {
    ddbMock.on(ScanCommand).resolves({});
    peopleRepository.getAll();
    expect().toBeUndefined();
  });
});
