export const makeErrorPattern = (
  e = {
    type: 0,
    payload: "",
    details: "",
  }
) => new Error(JSON.stringify(e));
