const _apiUrl = "/api/service";

export const getAllServices = () => {
    return fetch(_apiUrl).then((res) => res.json());
  };
  
  export const getServicesById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
  };