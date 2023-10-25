const _apiUrl = "/api/client";

export const getAllClients = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getClientById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};


