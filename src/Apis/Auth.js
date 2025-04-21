"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(accessToken, "----");
      const response = await axios.post(
        `${baseUrl}/api/logout`,
        { token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      );

      return response.data;
    },
    onSuccess: () => {
      Cookies.remove("accessToken");
      localStorage.removeItem("refreshToken")
      router.push("/login");
    },
    onError: error => {
      console.error("Logout failed:", error);
    }
  });
};
