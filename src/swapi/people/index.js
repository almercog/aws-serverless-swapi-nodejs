import { PeopleAPI } from "./http/PeopleAPI.js";
import { APP_ERR_004 } from "../commons/constants.js";
import { WebPort } from "../commons/response/WebPort.js";
import { PeopleService } from "./service/PeopleService.js";
import { PeopleRepository } from "./repository/PeopleRepository.js";
import { PeopleController } from "./controller/PeopleController.js";

const peopleAPI = new PeopleAPI();
const peopleRepository = new PeopleRepository();
const peopleService = new PeopleService({ peopleAPI, peopleRepository });
const peopleController = new PeopleController({ peopleService });

export const handler = async (events) => {
  const eventBody = events.body;
  const { httpMethod, pathParameters } = events;
  const requestBody = JSON.parse(eventBody);
  if (httpMethod === "POST") {
    return peopleController.create(requestBody.payload);
  } else if (httpMethod === "PATCH") {
    return peopleController.update(pathParameters, requestBody.payload);
  } else if (httpMethod === "DELETE") {
    return peopleController.delete(pathParameters);
  } else if (httpMethod === "GET" && pathParameters) {
    return peopleController.get(pathParameters);
  } else if (httpMethod === "GET") {
    return peopleController.getAll();
  }
  const messageError = Object.assign(APP_ERR_004, {
    object: httpMethod,
  }).message;
  return WebPort.badRequest(messageError, messageError);
};
