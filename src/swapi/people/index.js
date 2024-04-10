import { PeopleController } from "./controller/PeopleController.js";

const peopleController = new PeopleController();

export async function createPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  await peopleController.create(event, cb);
}

export async function getPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  await peopleController.get(event, cb);
}

export async function updatePeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  await peopleController.update(event, cb);
}

export async function deletePeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  await peopleController.delete(event, cb);
}

export async function getAllPeople(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false;
  await peopleController.getAll(event, cb);
}
