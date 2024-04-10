import { API_HEADERS, SWAPI_URL } from "../../commons/constants.js";

export class PeopleAPI {
  async getAll() {
    return fetch(SWAPI_URL.concat("/people"), {
      method: "GET",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}
