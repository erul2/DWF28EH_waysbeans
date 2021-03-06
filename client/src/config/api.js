import axios from "axios";

export const API = axios.create({
  baseURL: `http://localhost:5001/api/v1/`,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// config

export const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
