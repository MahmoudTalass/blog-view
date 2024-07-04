import { useEffect, useReducer, useState } from "react";
import useLogout from "./useLogout";
import useAuth from "./useAuth";

function reducer(data, action) {
   switch (action.type) {
      case "ADD":
         return [action.payload, ...data];
      case "DELETE":
         return data.filter((item) => item._id !== action.id);
      case "SET":
         return action.payload;
      case "UPDATE":
         return data.map((item) => {
            if (item._id === action.id) {
               return action.payload;
            } else {
               return item;
            }
         });
      default:
         throw new Error("Invalid reducer action type");
   }
}

export function useFetch(url) {
   const [data, dispatch] = useReducer(reducer, null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const { token } = useAuth();
   const logout = useLogout();

   const setData = (data) => dispatch({ type: "SET", payload: data });
   const deleteData = (id) => dispatch({ type: "DELETE", id });
   const addData = (data) => dispatch({ type: "ADD", payload: data });
   const updateData = (data, id) => dispatch({ type: "UPDATE", payload: data, id });

   useEffect(() => {
      setIsLoading(true);
      const controller = new AbortController();

      async function fetchData() {
         try {
            const response = await fetch(url, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               signal: controller.signal,
            });

            if (response.status === 401) {
               setData(null);
               logout();
               throw new Error("Authorization required");
            }

            const json = await response.json();

            if (!response.ok) {
               setData(null);
               throw new Error(json.error.message);
            }

            setError(null);
            setData(json);
         } catch (err) {
            if (err.name !== "AbortError") {
               setError(err);
            }
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();

      return () => {
         controller.abort();
      };
   }, [url, token, logout]);

   const actions = {
      setData,
      deleteData,
      addData,
      updateData,
   };

   return { data, isLoading, error, actions };
}
