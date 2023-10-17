export const pushSelected = (vari: string, value: string) => {
  const url = new URL(window.location.href);

  //* Add or update the query parameter
  url.searchParams.set(vari, value);

  //* Replace the current URL with the updated URL
  window.history.replaceState({}, "", url.toString());
};
export const getQueryParam = (key: string) => {
  //* Get the current URL
  const url = new URL(window.location.href);

  //* Retrieve the query parameter value
  return url.searchParams.get(key);
};
