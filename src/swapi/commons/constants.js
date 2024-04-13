export const SWAPI_URL = "https://swapi.py4e.com/api/";
export const API_HEADERS = {
  "Content-Type": "application/json",
};

export const REQUIRED_ERROR = "This field cannot be blank";
export const INVALID_TYPE_ERROR = "Invalid type provided for this field";

export const APP_OK_001 = {
  code: "OK-001",
  message: "Successful operation.",
};
export const APP_ERR_001 = {
  code: "ERR-001",
  get message() {
    return `${this.object} to be wrong`;
  },
};
export const APP_ERR_002 = {
  code: "ERR-002",
  get message() {
    return `${this.object} not found`;
  },
};
export const APP_ERR_003 = {
  code: "ERR-003",
  message: "Internal server error",
};
export const APP_ERR_004 = {
  code: "ERR-002",
  get message() {
    return `Method not found for this operation: ${this.object}`;
  },
};
