import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://dummyjson.com";

const HttpClient = axios.create({});

export const HttpClientBaseQuery = async <T>({
  url = "",
  method = "get",
  data,
}: {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
}) => {
  try {
    const response: AxiosResponse<T> = await HttpClient({
      url: BASE_URL + url,
      method,
      data,
    });
    return { data: response.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
