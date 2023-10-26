const _apiUrl = "/api/client";

export const getAllClients = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getClientById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const createClient = (client) => {
  console.log(client)
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }).then((res) => res.json);
  };
