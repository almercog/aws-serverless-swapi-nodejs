import { randomUUID } from "node:crypto";
import { PeopleAPI } from "../http/PeopleAPI.js";
import { PeopleMapper } from "../mapper/PeopleMapper.js";
import { ValidatePeople } from "../validation/validate-people.js";
import { PeopleRepository } from "../repository/PeopleRepository.js";

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
    return peopleRepository.update(people);
  }

  async delete(deletePeopleDto) {
    const people = ValidatePeople.delete(deletePeopleDto);
    return peopleRepository.delete(people);
  }

  async get(getPeopleDto) {
    const people = ValidatePeople.get(getPeopleDto);
    return peopleRepository.get(people);
  }

  async getAll() {
    const people = await peopleAPI.getAll();
    return people.results.map((person) => new PeopleMapper(person));
  }
}
