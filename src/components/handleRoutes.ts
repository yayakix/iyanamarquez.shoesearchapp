import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function useHandleRoutes() {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const handleRoutes = async (method: string, route: string, body: any) => {
    const URL = import.meta.env.VITE_REACT_APP_API_URL;
    if (method === "POST") {
      console.log("post");
      //   console.log("token", await getToken());
      const response = await fetch(`${URL}/${route}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        // body: JSON.stringify({ name: "hello" }),
      });
      console.log("erm bruh");
      const data = await response.json();
      //   navigate(0);
      return data;
    }
    if (method === "GET") {
      const response = await fetch(`${URL}/${route}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      const data = await response.json();
      navigate(0);
      return data;
    }
  };

  return handleRoutes;
}

export default useHandleRoutes;
