import axios from "axios";

const SERVER_URL = "http://localhost:3001";

const getAll = async () => {
  try {
    const result = await axios({
      url: `${SERVER_URL}/tasks`,
      method: "GET",
    });
    console.log("RESULT", result);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Error recuperando las tareas");
    }
    /*     const result = await fetch(`${SERVER_URL}/tasks`, {});
    console.log("result", result);
    const response = await result.json();
    console.log('response', response) */
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createTask = async (body) => {
  try {
    const result = await axios({
      url: `${SERVER_URL}/tasks`,
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createTask,
  getAll,
};
