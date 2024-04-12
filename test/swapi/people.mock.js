const Item = {
  hairColor: { S: "blond" },
  homeWorld: { S: "https://swapi.py4e.com/api/planets/1/" },
  created: { N: "1712732532514" },
  birthYear: { S: "19BBY" },
  skinColor: { S: "fair" },
  url: { S: "https://swapi.py4e.com/api/people/1/" },
  films: {
    L: [
      { S: "https://swapi.py4e.com/api/films/1/" },
      { S: "https://swapi.py4e.com/api/films/2/" },
      { S: "https://swapi.py4e.com/api/films/3/" },
      { S: "https://swapi.py4e.com/api/films/6/" },
      { S: "https://swapi.py4e.com/api/films/7/" },
    ],
  },
  name: { S: "LukeSkywalker" },
  gender: { S: "male" },
  species: { L: [{ S: "https://swapi.py4e.com/api/species/1/" }] },
  starShips: {
    L: [
      { S: "https://swapi.py4e.com/api/starships/12/" },
      { S: "https://swapi.py4e.com/api/starships/22/" },
    ],
  },
  mass: { S: "77" },
  height: { S: "172" },
  edited: { N: "1712732532514" },
  eyeColor: { S: "blue" },
  vehicles: {
    L: [
      { S: "https://swapi.py4e.com/api/vehicles/14/" },
      { S: "https://swapi.py4e.com/api/vehicles/30/" },
    ],
  },
  id: { S: "e58bf64d-5014-42a7-9b4b-3be4280c5895" },
};

const updItem = {
  id: { S: "6a5e9eb1-bde9-44fa-a830-b1cd49386c8f" },
  name: { S: "Obi-WanKenobis" },
  height: { S: "184" },
  mass: { S: "79" },
  hairColor: { S: "auburn, grey" },
  homeWorld: { S: "https://swapi.py4e.com/api/planets/1/" },
  created: { N: "1712732532514" },
  birthYear: { S: "19BBY" },
  skinColor: { S: "fair" },
  url: { S: "https://swapi.py4e.com/api/people/1/" },
  films: {
    L: [
      { S: "https://swapi.py4e.com/api/films/1/" },
      { S: "https://swapi.py4e.com/api/films/2/" },
      { S: "https://swapi.py4e.com/api/films/3/" },
      { S: "https://swapi.py4e.com/api/films/6/" },
      { S: "https://swapi.py4e.com/api/films/7/" },
    ],
  },
  gender: { S: "male" },
  species: { L: [{ S: "https://swapi.py4e.com/api/species/1/" }] },
  starShips: {
    L: [
      { S: "https://swapi.py4e.com/api/starships/12/" },
      { S: "https://swapi.py4e.com/api/starships/22/" },
    ],
  },
  edited: { N: "1712732532514" },
  eyeColor: { S: "blue" },
  vehicles: {
    L: [
      { S: "https://swapi.py4e.com/api/vehicles/14/" },
      { S: "https://swapi.py4e.com/api/vehicles/30/" },
    ],
  },
  id: { S: "e58bf64d-5014-42a7-9b4b-3be4280c5895" },
};

export { Item, updItem };
