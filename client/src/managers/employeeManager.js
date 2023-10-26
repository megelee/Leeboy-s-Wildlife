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

    export const deactivateEmployee = (employeeId) => {
      return fetch(`${_apiUrl}/deactivate/${employeeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            // Successfully deactivated, no response content expected.
            return;
          } else {
            // Handle other status codes (e.g., 404, 500) or any response content here.
            return res.json().then((data) => {
              throw new Error(data.message); // or any appropriate error message
            });
          }
        });
    };
    
    
    
     