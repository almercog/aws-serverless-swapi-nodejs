import z from "zod";

import {
  APP_ERR_001,
  INVALID_TYPE_ERROR,
  REQUIRED_ERROR,
} from "../../commons/constants.js";
import { Errors, makeErrorPattern } from "../../commons/errors/index.js";

const idPeopleSchema = z.object({
  id: z
    .string({
      invalid_type_error: INVALID_TYPE_ERROR,
      required_error: REQUIRED_ERROR,
    })
    .uuid(),
});

const peopleSchema = z.object({
  name: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  height: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  mass: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  hairColor: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  skinColor: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  eyeColor: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  birthYear: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  gender: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  homeWorld: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
  films: z.array(z.any()).optional(),
  species: z.array(z.any()).optional(),
  vehicles: z.array(z.any()).optional(),
  starShips: z.array(z.any()).optional(),
  url: z.string({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
  }),
});

const makeError = (error) => {
  throw makeErrorPattern({
    code: Errors.BAD_REQUEST,
    message: Object.assign(APP_ERR_001, { object: "Person" }).message,
    details: JSON.parse(error.message),
  });
};

export const ValidatePeople = {
  create: (input) => {
    const result = peopleSchema.safeParse(input);
    if (!result.success) makeError(result.error);
    return result.data;
  },
  edit: (input) => {
    const result = idPeopleSchema
      .merge(peopleSchema)
      .partial()
      .safeParse(input);
    if (!result.success) makeError(result.error);
    return result.data;
  },
  get: (input) => {
    const result = idPeopleSchema.safeParse(input);
    if (!result.success) makeError(result.error);
    return result.data;
  },
  delete: (input) => {
    const result = idPeopleSchema.safeParse(input);
    if (!result.success) makeError(result.error);
    return result.data;
  },
};
