import axios from 'axios';

const servAddr = 'http://localhost:3080/';

export async function getBookmarks() {
  let res;

  await axios.get(`${servAddr}bookmark/`)
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}

export async function getBookmarkInfo(id) {
  let res;

  await axios.get(`${servAddr}bookmark/${id}`)
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}

export async function putNewTags(id, tags) {
  let res;

  await axios.put(`${servAddr}bookmark/${id}`, { tags })
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}

export async function deleteBookmark(id) {
  let res;

  await axios.delete(`${servAddr}bookmark/${id}`)
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}

export async function postNewImgBookmark(url, tags) {
  let res;

  await axios.post(`${servAddr}bookmark/img/`, { url, tags })
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}

export async function postNewVideoBookmark(url, tags) {
  let res;

  await axios.post(`${servAddr}bookmark/video/`, { url, tags })
    .then((response) => { res = response.data; return response.status; })
    .catch((err) => err);
  return res;
}
