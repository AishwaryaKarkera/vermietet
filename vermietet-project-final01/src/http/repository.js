import { QueryClientProvider, useQuery } from "react-query";
import { ApiClient } from "./api-client";
var config = require("../config.json");

export const useGetTodos = () => {
  
  return useQuery(
    "todos",
    () => {
      console.info("server request sent.", config.results.toString());
      return ApiClient.get(`https://randomuser.me/api/?results=${config.results.toString()}`);
    },
    { refetchOnWindowFocus: false,  enabled: false  }
  );
};
