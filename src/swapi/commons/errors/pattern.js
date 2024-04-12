export const makeErrorPattern = (
  e = {
    code: 0,
    payload: "",
    details: "",
  }
) => new Error(JSON.stringify(e));
