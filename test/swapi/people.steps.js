import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { loadFeature, defineFeature } from "jest-cucumber";

import { Item, FetchPeople, ItemUpd } from "./people.mock.js";
import { handler } from "../../src/swapi/people/index.js";
import { ApiGatewayEvent } from "../common/ApiGatewayEvent.js";

const apiGateway = new ApiGatewayEvent();
const ddbMock = mockClient(DynamoDBClient);
const feature = loadFeature("./test/features/people.feature", {});

defineFeature(feature, (test) => {
  let request;
  let count = 0;

  beforeEach(() => {
    ddbMock.reset();
  });

  test("Create a person", ({ given, when, then }) => {
    given(/^A user (.*)$/, async (req) => {
      request = await req;
    });

    when(/^I send POST request to (.*)$/, async (path) => {
      const req = JSON.parse(request);
      if (req.payload.name === "R2-D2") {
        ddbMock.on(PutItemCommand).rejects({});
      } else {
        ddbMock.on(PutItemCommand).resolves({});
      }
      const events = await apiGateway.event({
        httpMethod: "POST",
        path,
        resource: path,
        body: request,
      });
      request = await handler(events);
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
      if (count === 0) {
        jest
          .spyOn(global, "fetch")
          .mockImplementationOnce(() =>
            Promise.resolve({ json: () => Promise.resolve(FetchPeople) })
          );
        count++;
      } else {
        jest
          .spyOn(global, "fetch")
          .mockImplementationOnce(() =>
            Promise.reject({ message: "Internal Server Error" })
          );
      }

      const events = await apiGateway.event({
        httpMethod: "GET",
        path,
        resource: path,
        body: null,
      });
      request = await handler(events);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, data, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      expect(message).toEqual(jsonRes.message);
      if (code === 200) {
        expect(data[0]).toHaveProperty("nombre");
        expect(data[0]).toHaveProperty("altura");
        expect(data.length).toBeGreaterThan(3);
      }
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
        if (request === "4d134f8b-1b81-4cdc-92c5-6e48f57dd49e") {
          ddbMock.on(GetItemCommand).rejects({});
        } else {
          ddbMock.on(GetItemCommand).resolves({});
        }
      }
      const resourcePath = path + request;
      const events = await apiGateway.event({
        httpMethod: "GET",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
        body: null,
      });
      request = await handler(events);
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
          Item: ItemUpd,
        });
        ddbMock.on(UpdateItemCommand).resolves({
          Attributes: ItemUpd,
        });
      } else {
        ddbMock.on(GetItemCommand).resolves({});
        if (request === "a132b94f-0cca-48f8-8ebc-89ff4e9f4ee2") {
          ddbMock.on(GetItemCommand).rejects({});
        } else {
          ddbMock.on(GetItemCommand).resolves({});
        }
      }
      const resourcePath = path + request;
      const events = await apiGateway.event({
        httpMethod: "PATCH",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
        body: req,
      });
      request = await handler(events);
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
        if (request === "c1e0f16f-8e5f-4a38-98f3-3684adfce8eb") {
          ddbMock.on(GetItemCommand).rejects({});
        } else {
          ddbMock.on(GetItemCommand).resolves({});
        }
      }
      const resourcePath = path + request;
      const events = await apiGateway.event({
        httpMethod: "DELETE",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
        body: null,
      });
      request = await handler(events);
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

  test("update people", ({ given, when, then }) => {
    given(/^A person with (.*) exist$/, (id) => {
      request = id;
    });

    when(/^I send PATCH request with a (.*) to (.*)$/, async (req, path) => {
      const resourcePath = path + request;
      const events = await apiGateway.event({
        httpMethod: "PUT",
        path: resourcePath,
        resource: path.concat("{id}"),
        pathParameters: { id: request },
        body: req,
      });
      request = await handler(events);
    });

    then(/^I get (.*)$/, async (res) => {
      const { code, message } = JSON.parse(request.body);
      const jsonRes = await JSON.parse(res);
      expect(code).toEqual(jsonRes.code);
      expect(message).toEqual(jsonRes.message);
    });
  });
});
