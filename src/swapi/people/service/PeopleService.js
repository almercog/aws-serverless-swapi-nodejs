import { randomUUID } from "node:crypto";
import { PeopleAPI } from "../http/PeopleAPI.js";
import { Errors } from "../../commons/errors/enum.js";
import { APP_ERR_002 } from "../../commons/constants.js";
import { PeopleMapper } from "../mapper/PeopleMapper.js";
import { ValidatePeople } from "../validation/validate-people.js";
import { PeopleRepository } from "../repository/PeopleRepository.js";
import { makeErrorPattern } from "../../commons/errors/pattern.js";

const peopleRepository = new PeopleRepository();
const peopleAPI = new PeopleAPI();

export class PeopleService {
  async create(createPeopleDto) {
    const people = ValidatePeople.create(createPeopleDto);
    const newPeople = {
      ...people,
      id: randomUUID(),
      created: Date.now(),
      edited: Date.now(),
    };
    return peopleRepository.create(newPeople);
  }

  async update(updatePeopleDto) {
    const people = ValidatePeople.edit(updatePeopleDto);
    await this.get({ id: people.id });
    const updatePeople = await peopleRepository.update(people);
    return updatePeople;
  }

  async delete(deletePeopleDto) {
    const people = ValidatePeople.delete(deletePeopleDto);
    await this.get({ id: people.id });
    return peopleRepository.delete(people);
  }

  async get(getPeopleDto) {
    const people = ValidatePeople.get(getPeopleDto);
    const getPeople = await peopleRepository.get(people);
    if (getPeople === undefined) {
      const messageError = Object.assign(APP_ERR_002, {
        object: "Person",
      }).message;
      throw makeErrorPattern({
        code: Errors.BAD_REQUEST,
        message: messageError,
        details: messageError,
      });
    }
    return getPeople;
  }

  async getAll() {
    const people = await peopleAPI.getAll();
    return people.results.map((person) => new PeopleMapper(person));
  }
}
