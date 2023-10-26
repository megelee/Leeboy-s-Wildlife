const _apiUrl = "/api/employee";

export const getAllEmployees = () => {
    return fetch(_apiUrl).then((res) => res.json());
  };
  
  export const getEmployeeById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
  };

  export const createEmployee = (employee) => {
    console.log(employee)
      return fetch(_apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }).then((res) => res.json);
    };