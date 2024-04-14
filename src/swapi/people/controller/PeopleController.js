import { WebPort } from "../../commons/response/WebPort.js";
import { ValidatePeople } from "../validation/validate-people.js";

export class PeopleController {
  constructor({ peopleService }) {
    this.peopleService = peopleService;
  }

  async create(createPeopleDto) {
    try {
      const validPeople = ValidatePeople.create(createPeopleDto);
      const response = await this.peopleService.create(validPeople);
      return WebPort.ok(response);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message || "Internal Server Error");
      }
    }
  }

  async update(getPeopleDto, updatePeopleDto) {
    try {
      const validPeople = ValidatePeople.edit({
        ...getPeopleDto,
        ...updatePeopleDto,
      });
      const response = await this.peopleService.update(validPeople);
      return WebPort.ok(response);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message || "Internal Server Error");
      }
    }
  }

  async delete(deletePeopleDto) {
    try {
      const validPeople = ValidatePeople.delete(deletePeopleDto);
      const response = await this.peopleService.delete(validPeople);
      return WebPort.ok(response);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message || "Internal Server Error");
      }
    }
  }

  async get(getPeopleDto) {
    try {
      const validPeople = ValidatePeople.get(getPeopleDto);
      const response = await this.peopleService.get(validPeople);
      return WebPort.ok(response);
    } catch (error) {
      if (error.message.includes("code")) {
        const err = JSON.parse(error.message);
        return WebPort.badRequest(err.message, err.details);
      } else {
        return WebPort.serverError(error.message || "Internal Server Error");
      }
    }
  }

  async getAll() {
    try {
      const people = await this.peopleService.getAll();
      return WebPort.ok(people);
    } catch (error) {
      return WebPort.serverError(error.message || "Internal Server Error");
    }
  }
}
