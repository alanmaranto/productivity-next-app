import axios from "axios";

const SERVER_URL = "http://localhost:3001";

const setRequest = async (url, options = {}) => {
  const method = options.method ? options.method.toUpperCase() : "GET";
  const axiosRequest = {
    url: `${SERVER_URL}/${url}`,
    method,
  };

  if (options.data) {
    axiosRequest.data = options.data;
  }

  if (options.jsonHeader) {
    axiosRequest.headers = {
      "Content-Type": "application/json",
    };
  }
  return await axios(axiosRequest);
};

const getAll = async () => {
  try {
    const result = await setRequest("tasks");
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Error recuperando las tareas");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const result = await setRequest(`tasks${id}`);
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createTask = async (body) => {
  try {
    const options = {
      method: "post",
      data: body,
      jsonHeader: true,
    };
    const result = await setRequest("tasks", options);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTask = async (id) => {
  try {
    const options = {
      method: "delete",
    };
    const result = await setRequest(`tasks/${id}`, options);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createTask,
  getAll,
  deleteTask,
  getById,
};
