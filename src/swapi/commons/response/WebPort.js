import { APP_ERR_003, APP_OK_001 } from "../constants.js";

export const WebPort = {
  ok: (data, message = APP_OK_001.message) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        type: 200,
        data,
        message,
      }),
    };
  },
  badRequest: (message = "", details = "") => {
    return {
      statusCode: 400,
      body: JSON.stringify({
        type: 400,
        message,
        details,
      }),
    };
  },
  serverError: (message = APP_ERR_003.message) => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        type: 500,
        message,
      }),
    };
  },
};
