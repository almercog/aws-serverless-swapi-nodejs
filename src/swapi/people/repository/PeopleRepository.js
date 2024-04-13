import { DynamoDB } from "../datasources/DynamoDB.js";

const tableName = process.env.PEOPLE_TABLE_NAME;

export class PeopleRepository {
  constructor() {
    this.dynamoDB = new DynamoDB();
  }

  async create(createPeopleDto) {
    const newPeople = await this.dynamoDB.create({
      tableName,
      createDto: createPeopleDto,
    });
    return newPeople;
  }

  async update(updatePeopleDto) {
    const itemKeys = Object.keys(updatePeopleDto).filter(
      (item) => item !== "id"
    );
    const updatePeople = await this.dynamoDB.update({
      tableName,
      key: { id: updatePeopleDto.id },
      updateDto: updatePeopleDto,
      itemKeys,
    });
    return updatePeople;
  }

  async delete(getPeopleDto) {
    await this.dynamoDB.delete({
      tableName,
      key: { id: getPeopleDto.id },
    });
    return true;
  }

  async get(getPeopleDto) {
    const getPeople = await this.dynamoDB.get({
      tableName,
      key: { id: getPeopleDto.id },
    });
    return getPeople;
  }

  async getAll() {
    const response = await this.dynamoDB.getAll({
      tableName,
    });
    return response;
  }
}
