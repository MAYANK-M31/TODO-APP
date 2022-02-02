import axios from "axios";
import { DOMAIN } from "../URLs/url";

// BOARD CRUD
export const fetchBoards = async () => {
  try {
    return await axios.get(`${DOMAIN}/api/board`).then(({ data }) => {
      return handleSuccess(data);
    });
  } catch (error) {
    return handleError();
  }
};

export const createBoard = async () => {
  try {
    return await axios.post(`${DOMAIN}/api/board`).then(({ data }) => {
      return handleSuccess(data);
    });
  } catch (error) {
    return handleError();
  }
};

export const removeBoard = async (id) => {
  try {
    return await axios
      .delete(`${DOMAIN}/api/board`, { data: { boardId: id } })
      .then(({ data }) => {
        console.log(data);
        return handleSuccess(data);
      });
  } catch (error) {
    return handleError();
  }
};

// TASK CRUD

export const fetchTasks = async (id) => {
  try {
    return await axios.get(`${DOMAIN}/api/task?boardId=${id}`).then(({ data }) => {
      return handleSuccess(data);
    });
  } catch (error) {
    return handleError();
  }
};

export const createTask = async (id,description,completed) => {
  try {
    return await axios
      .post(`${DOMAIN}/api/task`, { boardId: id, description: description, completed: completed })
      .then(({ data }) => {
        return handleSuccess(data);
      });
  } catch (error) {
    return handleError();
  }
};

export const removeTask = async (id) => {
  try {
    return await axios
      .delete(`${DOMAIN}/api/task`, { data: { taskId: id } })
      .then(({ data }) => {
        console.log(data);
        return handleSuccess(data);
      });
  } catch (error) {
    return handleError();
  }
};

export const updateTask = async (taskId, description,completed) => {
  try {
    return await axios
      .patch(`${DOMAIN}/api/task`, { taskId: taskId,
        completed: completed,
        description: description,})
      .then(({ data }) => {
        return handleSuccess(data);
      });
  } catch (error) {
    return handleError();
  }
};

const handleSuccess = (res) => {
  if (res?.status != 200) return handleError();
  return res;
};

const handleError = () => {
  return {
    status: 500,
    message: "Something went wrong",
  };
};
