const _apiUrl = "/api/workorder";

export const getIncompleteWorkOrders = () => {
  return fetch(_apiUrl + "/incomplete").then((res) => res.json());
};
export const getAllWorkOrders = () => {
  return fetch(_apiUrl + "/all").then((res) => res.json());
};

export const createWorkOrder = (workOrder) => {
  console.log(workOrder)
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workOrder),
    }).then((res) => res.json);
  };

  export const updateWorkOrder = (workOrder) => {
    return fetch(`${_apiUrl}/${workOrder.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workOrder),
    });
  };

  export const updateAsComplete = (workOrder) => {
    console.log(workOrder)
    return fetch(`${_apiUrl}/${workOrder.id}/complete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workOrder),
    });
};
export const deleteAWorkOrder = (workOrderId) => {
    return fetch(`${_apiUrl}/${workOrderId}/delete`, {
        method: "Delete",
    });
};
// workOrderManager.js

export const getWorkOrderById = async (id) => {
  try {
    const response = await fetch(`/api/workorder/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching work order by ID: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching work order by ID: ${error.message}`);
  }
};

