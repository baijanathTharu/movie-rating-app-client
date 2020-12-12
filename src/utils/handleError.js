export const handleError = (promise) => {
  return promise
    .then((data) => [undefined, data])
    .catch((error) => Promise.resolve([error, undefined]));
};
