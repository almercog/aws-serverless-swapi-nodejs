import { randomUUID } from "node:crypto";
import { Errors } from "../../commons/errors/enum.js";
import { APP_ERR_002 } from "../../commons/constants.js";
import { PeopleMapper } from "../mapper/PeopleMapper.js";
import { makeErrorPattern } from "../../commons/errors/pattern.js";

export class PeopleService {
  constructor({ peopleRepository, peopleAPI }) {
    this.peopleAPI = peopleAPI;
    this.peopleRepository = peopleRepository;
  }

  async create(createPeopleDto) {
    const newPeople = {
      ...createPeopleDto,
      id: randomUUID(),
      created: Date.now(),
      edited: Date.now(),
    };
    return this.peopleRepository.create(newPeople);
  }

  async update(updatePeopleDto) {
    await this.get({ id: updatePeopleDto.id });
    const updatePeople = await this.peopleRepository.update(updatePeopleDto);
    return updatePeople;
  }

  async delete(deletePeopleDto) {
    await this.get({ id: deletePeopleDto.id });
    return this.peopleRepository.delete(deletePeopleDto);
  }

  async get(getPeopleDto) {
    const getPeople = await this.peopleRepository.get(getPeopleDto);
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
    const people = await this.peopleAPI.getAll();
    return people.results.map((person) => new PeopleMapper(person));
  }
}
