const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return fetch(baseUrl).then((response) => response.json());
};

const create = (newObject) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newObject),
  }).then((response) => response.json());
};

export default { getAll, create };
