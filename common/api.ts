import axios from "axios";
import { NextRequest } from "next/server";

export const API_BASE_URL = process.env.API_URL;

export const AxiosServer = (accessToken: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const AxiosWithAuth = () => {
  const accessToken = localStorage.getItem("accessToken");

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const AxiosNoAuth = axios.create({
  baseURL: API_BASE_URL,
});

export const AxiosClient = axios.create({
  baseURL: "/api",
});

export const AxiosClientWithAuth = () => {
  const accessToken = localStorage.getItem("accessToken");

  return axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
