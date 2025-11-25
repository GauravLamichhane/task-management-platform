import api from "./api";

const auditService = {
  // Get all audit logs
  getLogs: async (params = {}) => {
    const response = await api.get("/logs/", { params });
    return response.data;
  },
};

export default auditService;
