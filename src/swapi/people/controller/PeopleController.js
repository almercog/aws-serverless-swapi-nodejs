import { WebPort } from "../../commons/response/WebPort.js";
import { PeopleService } from "../service/PeopleService.js";

const peopleService = new PeopleService();

export class PeopleController {
  async create(event, cb) {
    try {
      const { payload } = JSON.parse(event.body);
      const people = await peopleService.create(payload);
      cb(null, WebPort.ok(people));
    } catch (error) {
      if (error.message.includes("type")) {
        const err = JSON.parse(error.message);
        console.log(err);
        cb(null, WebPort.badRequest(err.message, err.details));
      } else {
        cb(null, WebPort.serverError(error.message));
      }
    }
  }

  async update(event, cb) {
    try {
      const id = event.pathParameters.id;
      const { payload } = JSON.parse(event.body);
      const people = await peopleService.update({ id, ...payload });
      cb(null, WebPort.ok(people));
    } catch (error) {
      if (error.message.includes("type")) {
        const err = JSON.parse(error.message);
        console.log(err);
        cb(null, WebPort.badRequest(err.message, err.details));
      } else {
        cb(null, WebPort.serverError(error.message));
      }
    }
  }

  async delete(event, cb) {
    try {
      const id = event.pathParameters.id;
      const people = await peopleService.delete({ id });
      cb(null, WebPort.ok(people));
    } catch (error) {
      if (error.message.includes("type")) {
        const err = JSON.parse(error.message);
        console.log(err);
        cb(null, WebPort.badRequest(err.message, err.details));
      } else {
        cb(null, WebPort.serverError(error.message));
      }
    }
  }

  async get(event, cb) {
    try {
      const id = event.pathParameters.id;
      const people = await peopleService.get({ id });
      cb(null, WebPort.ok(people));
    } catch (error) {
      if (error.message.includes("type")) {
        const err = JSON.parse(error.message);
        console.log(err);
        cb(null, WebPort.badRequest(err.message, err.details));
      } else {
        cb(null, WebPort.serverError(error.message));
      }
    }
  }

  async getAll(_, cb) {
    try {
      const people = await peopleService.getAll();
      cb(null, WebPort.ok(people));
    } catch (error) {
      if (error.message.includes("type")) {
        const err = JSON.parse(error.message);
        console.log(err);
        cb(null, WebPort.badRequest(err.message, err.details));
      } else {
        cb(null, WebPort.serverError(error.message));
      }
    }
  }
}
