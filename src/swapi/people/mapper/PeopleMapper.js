export class PeopleMapper {
  constructor({
    name = undefined,
    height = undefined,
    mass = undefined,
    hair_color = undefined,
    skin_color = undefined,
    eye_color = undefined,
    birth_year = undefined,
    gender = undefined,
    homeworld = undefined,
    films = [],
    species = [],
    vehicles = [],
    starships = [],
    created = undefined,
    edited = undefined,
    url = undefined,
  }) {
    this.nombre = name;
    this.altura = height;
    this.peso = mass;
    this.colorCabello = hair_color;
    this.colorPiel = skin_color;
    this.colorOjo = eye_color;
    this.fechaNacimiento = birth_year;
    this.genero = gender;
    this.creado = created;
    this.modificado = edited;
    this.planetaNatal = homeworld;
    this.peliculas = films;
    this.especies = species;
    this.vehiculos = vehicles;
    this.naveEspacial = starships;
    this.url = url;
  }
}
