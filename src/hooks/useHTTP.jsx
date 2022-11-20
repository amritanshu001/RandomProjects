import { useState, useCallback } from "react";

const useHttp = (processData) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchdata = await fetch(requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body),
        });
        if (!fetchdata.ok) {
          throw new Error("Request failed!");
        }

        const rawData = await fetchdata.json();
        processData(rawData);
      } catch (err) {
        setError(err.message || "Something Went Wrong...");
      }
      setIsLoading(false);
    },
    [processData]
  );

  // fetchMeals();

  return {
    isloading: isloading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
