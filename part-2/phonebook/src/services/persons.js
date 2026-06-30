const baseUrl = "http://localhost:3001/api/persons";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
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
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
};

export default { getAll, create, update, remove };
