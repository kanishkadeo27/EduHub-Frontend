import apiClient from '../config';

const adminService = {
  // Update admin profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/admin/update', userData);
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId, roleData) => {
    const response = await apiClient.put(`/admin/users/${userId}/role`, roleData);
    return response.data;
  },

  // Get all trainers
  getAllTrainers: async () => {
    const response = await apiClient.get('/admin/trainers');
    return response.data;
  },

  // Create trainer
  createTrainer: async (trainerData) => {
    const response = await apiClient.post('/admin/trainers', trainerData);
    return response.data;
  },

  // Delete trainer
  deleteTrainer: async (trainerId) => {
    const response = await apiClient.delete(`/admin/trainers/${trainerId}`);
    return response.data;
  },

  // Get trainer by ID
  getTrainerById: async (trainerId) => {
    const response = await apiClient.get(`/admin/trainers/${trainerId}`);
    return response.data;
  },

  // Update trainer
  updateTrainer: async (trainerId, trainerData) => {
    const response = await apiClient.put(`/admin/trainers/${trainerId}`, trainerData);
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  }
};

export default adminService;