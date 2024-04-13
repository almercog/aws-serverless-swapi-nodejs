import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { loadFeature, defineFeature } from "jest-cucumber";

import { Item, updItem } from "./people.mock.js";
import { ApiGatewayEvent } from "../common/ApiGatewayEvent.js";
import { PeopleController } from "../../src/swapi/people/controller/PeopleController.js";

const apiGateway = new ApiGatewayEvent();
const ddbMock = mockClient(DynamoDBClient);
const peopleController = new PeopleController();
const feature = loadFeature("./test/features/people.feature", {});

defineFeature(feature, (test) => {
  let request;

  beforeEach(() => {
    ddbMock.reset();
  });

  test("Create a person", ({ given, when, then }) => {
    given(/^A user (.*)$/, async (req) => {
      request = await req;
    });

    when(/^I send POST request to (.*)$/, async (path) => {
      ddbMock.on(PutItemCommand).resolves({});
      const event = await apiGateway.event({
        httpMethod: "POST",
        path,
        resource: path,
        body: request,
      });
      request = await peopleController.create(event);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      if (code === 200) {
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("name");
        expect(data).toHaveProperty("skinColor");
        expect(data).toHaveProperty("eyeColor");
        expect(message).toEqual(jsonRes.message);
      } else {
        expect(message).toEqual(jsonRes.message);
      }
    });
  });

  test("Get All people", ({ when, then }) => {
    when(/^I send GET request to (.*)$/, async (path) => {
      const event = await apiGateway.event({
        httpMethod: "GET",
        path,
        resource: path,
      });
      request = await peopleController.getAll(event);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      expect(data[0]).toHaveProperty("nombre");
      expect(data[0]).toHaveProperty("altura");
      expect(data.length).toBeGreaterThan(3);
      expect(message).toEqual(jsonRes.message);
    });
  });

  test("Get people", ({ given, when, then }) => {
    given(/^A person with (.*) exist$/, (id) => {
      request = id;
    });

    when(/^I send GET request to (.*)$/, async (path) => {
      if (request === "e58bf64d-5014-42a7-9b4b-3be4280c5895") {
        ddbMock.on(GetItemCommand).resolves({
          Item: Item,
        });
      } else {
        ddbMock.on(GetItemCommand).resolves({});
      }
      const resourcePath = path + request;
      const event = await apiGateway.event({
        httpMethod: "GET",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
      });
      request = await peopleController.get(event);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      if (code === 200) {
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("name");
        expect(data.name).toContain(jsonRes.data.name);
      } else {
        expect(message).toEqual(jsonRes.message);
      }
    });
  });

  test("modify people", ({ given, when, then }) => {
    given(/^A person with (.*) exist$/, (id) => {
      request = id;
    });

    when(/^I send PATCH request with a (.*) to (.*)$/, async (req, path) => {
      if (request === "6a5e9eb1-bde9-44fa-a830-b1cd49386c8f") {
        ddbMock.on(GetItemCommand).resolves({
          Item: updItem,
        });
        ddbMock.on(UpdateItemCommand).resolves({
          Attributes: updItem,
        });
      } else {
        ddbMock.on(GetItemCommand).resolves({});
      }
      const resourcePath = path + request;
      const event = await apiGateway.event({
        httpMethod: "PATCH",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
        body: req,
      });
      request = await peopleController.update(event);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      if (code === 200) {
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("name");
        expect(data.name).toContain(jsonRes.data.name);
      } else {
        expect(message).toEqual(jsonRes.message);
      }
    });
  });

  test("delete people", ({ given, when, then }) => {
    given(/^A person with (.*) exist$/, (id) => {
      request = id;
    });

    when(/^I send DELETE request to (.*)$/, async (path) => {
      if (request === "f735f0d4-0c8e-4712-b7d9-5fa1e5d08a68") {
        ddbMock.on(GetItemCommand).resolves({
          Item: Item,
        });
        ddbMock.on(DeleteItemCommand).resolves({});
      } else {
        ddbMock.on(GetItemCommand).resolves({});
      }
      const resourcePath = path + request;
      const event = await apiGateway.event({
        httpMethod: "DELETE",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
      });
      request = await peopleController.delete(event);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      if (code === 200) {
        expect(data).toEqual(true);
      } else {
        expect(message).toEqual(jsonRes.message);
      }
    });
  });
});
