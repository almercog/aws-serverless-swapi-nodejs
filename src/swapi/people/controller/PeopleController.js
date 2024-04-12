import { WebPort } from "../../commons/response/WebPort.js";
import { PeopleService } from "../service/PeopleService.js";

const peopleService = new PeopleService();

export class PeopleController {
  async create(event) {
    try {
      const { payload } = JSON.parse(event.body);
      const people = await peopleService.create(payload);
      return WebPort.ok(people);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message);
      }
    }
  }

  async update(event) {
    try {
      const id = event.pathParameters.id;
      const { payload } = JSON.parse(event.body);
      const people = await peopleService.update({ id, ...payload });
      return WebPort.ok(people);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message);
      }
    }
  }

  async delete(event) {
    try {
      const id = event.pathParameters.id;
      const people = await peopleService.delete({ id });
      return WebPort.ok(people);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message);
      }
    }
  }

  async get(event) {
    try {
      const id = event.pathParameters.id;
      const people = await peopleService.get({ id });
      return WebPort.ok(people);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message);
      }
    }
  }

  async getAll(_) {
    try {
      const people = await peopleService.getAll();
      return WebPort.ok(people);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message);
      }
    }
  }
}
