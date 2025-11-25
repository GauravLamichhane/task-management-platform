import api from "./api";
import { setTokens, removeTokens } from "../utils/tokenStorage";

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post("/accounts/register/", userData);
    if (response.data.tokens) {
      setTokens(response.data.tokens.access, response.data.tokens.refresh);
    }
    return response.data;
  },

  // Login user
  login: async (username, password) => {
    const response = await api.post("/accounts/login/", { username, password });
    setTokens(response.data.access, response.data.refresh);
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await api.post("/accounts/logout/", { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeTokens();
    }
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/accounts/profile/");
    return response.data;
  },
};

export default authService;
