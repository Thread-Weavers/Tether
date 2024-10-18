// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions, basicFetchWithBody, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/rituals';

export const createRitual = async ({content, isPublic}) => {
  return fetchHandler(baseUrl, getPostOptions({ content, isPublic }))
};

// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array
export const getAllRituals = async (id) => {
  const [rituals, error] = await fetchHandler(baseUrl, basicFetchWithBody({ id }));
  if (error) console.log(error); // print the error for simplicity.
  return rituals || [];
};

export const getRitual = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateRitual = async ({ id, target, value }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ target, value }))
}

export const deleteRitual = async ({}) => {
  return fetchHandler(`${baseUrl}/${id}`, deleteOptions);
}