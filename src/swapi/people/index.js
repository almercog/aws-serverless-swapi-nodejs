import { PeopleController } from "./controller/PeopleController.js";

const peopleController = new PeopleController();

export async function createPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await peopleController.create(event);
  cb(null, response);
}

export async function getPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await peopleController.get(event);
  cb(null, response);
}

export async function updatePeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await peopleController.update(event);
  cb(null, response);
}

export async function deletePeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await peopleController.delete(event);
  cb(null, response);
}

export async function getAllPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await peopleController.getAll(event);
  cb(null, response);
}
