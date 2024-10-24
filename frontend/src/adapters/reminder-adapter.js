// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions, basicFetchWithBody, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/reminders/';

export const createReminder = async (content, isPublic = false) => {
  console.log(content);
  return fetchHandler(baseUrl, getPostOptions({ content, isPublic }))
};

// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array
export const getAllReminders = async (id) => {
  const [reminder, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // print the error for simplicity.
  return reminder || [];
};

export const getAllPublicReminders = async (id) => {
  const [reminders, error] = await fetchHandler(baseUrl + "public/");
  if (error) console.log(error); // print the error for simplicity.
  return reminders || [];
};

export const getReminder = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateReminder = async ({ id, target, value }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ target, value }))
}

export const deleteReminder = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, deleteOptions);
}