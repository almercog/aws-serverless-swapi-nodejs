export class CreatePeopleDto {
  constructor({
    id = undefined,
    name = undefined,
    height = undefined,
    mass = undefined,
    hairColor = undefined,
    skinColor = undefined,
    eyeColor = undefined,
    birthYear = undefined,
    gender = undefined,
    homeWorld = undefined,
    films = [],
    species = [],
    vehicles = [],
    starShips = [],
    created = undefined,
    edited = undefined,
    url = undefined,
  }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.birthYear = birthYear;
    this.gender = gender;
    this.created = created;
    this.edited = edited;
    this.homeWorld = homeWorld;
    this.films = films;
    this.species = species;
    this.vehicles = vehicles;
    this.starShips = starShips;
    this.url = url;
  }
}
