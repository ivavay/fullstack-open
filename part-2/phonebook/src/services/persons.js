const baseUrl = "/api/persons";

const handleResponse = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      const error = text ? JSON.parse(text) : {};
      const message = error.error || `Request failed with status ${response.status}`;
      const requestError = new Error(message);
      requestError.status = response.status;
      throw requestError;
    });
  }

  if (response.status === 204) {
    return undefined;
  }

  return response.json();
};

const getAll = () => {
  return fetch(baseUrl).then(handleResponse);
};

const create = (newObject) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newObject),
  }).then(handleResponse);
};

const update = (id, updatedObject) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedObject),
  }).then(handleResponse);
};

const remove = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};

export default { getAll, create, update, remove };
