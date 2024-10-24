// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions, basicFetchWithBody, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/goals/';

export const createGoal = async (content, isPublic =  false) => {
  console.log(content);
  return fetchHandler(baseUrl, getPostOptions({ content, isPublic }))
};

// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array
export const getAllGoals = async (id) => {
  const [goals, error] = await fetchHandler(baseUrl + id);
  if (error) console.log(error); // print the error for simplicity.
  return goals || [];
};

export const getAllPublicGoals = async (id) => {
  const [goals, error] = await fetchHandler(baseUrl + `public/${id}`);
  if (error) console.log(error); // print the error for simplicity.
  return goals || [];
};

export const getGoal = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateGoal = async ({ id, target, value }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ target, value }))
}

export const deleteGoal = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, deleteOptions);
}