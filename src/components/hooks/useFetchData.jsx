import { useEffect, useState } from "react";

function useFetchData(url) {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      let active = true;

      async function fetchData() {
         try {
            setIsLoading(true);
            const response = await fetch(url, { mode: "cors" });

            if (!response.ok) {
               response.ok;
               setData(null);
               setError(response.error);
               return;
            }

            const json = await response.json();

            if (active) {
               setData(json);
            }
         } catch (err) {
            setError(err);
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();

      return () => {
         active = false;
      };
   }, [url]);

   return [data, error, isLoading];
}

export default useFetchData;
