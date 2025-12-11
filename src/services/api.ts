import axios from "axios";
import { User, Course, GenerateCourseInput } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors - but DON'T redirect for /auth/me (initial auth check)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthMeRequest = error.config?.url === "/auth/me";

    // Only redirect to login for 401 errors that are NOT the initial auth check
    // This prevents infinite redirect loops
    if (error.response?.status === 401 && !isAuthMeRequest) {
      localStorage.removeItem("token");
      // Only redirect if not already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get("/auth/me");
      return response.data.user;
    } catch {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  },

  getGoogleAuthUrl: () => `${API_BASE}/api/auth/google`,
  getGitHubAuthUrl: () => `${API_BASE}/api/auth/github`,
};

// Courses API
export const coursesApi = {
  generateCourse: async (input: GenerateCourseInput): Promise<Course> => {
    const response = await api.post("/courses/generate", input);
    return response.data.course;
  },

  getCourses: async (): Promise<Course[]> => {
    const response = await api.get("/courses");
    return response.data.courses;
  },

  getCourse: async (courseId: string): Promise<Course> => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data.course;
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await api.delete(`/courses/${courseId}`);
  },

  updateProgress: async (
    courseId: string,
    progress: Partial<Course["progress"]>
  ): Promise<Course> => {
    const response = await api.patch(`/courses/${courseId}/progress`, progress);
    return response.data.course;
  },

  markLessonComplete: async (
    courseId: string,
    lessonId: string
  ): Promise<Course> => {
    const response = await api.post(
      `/courses/${courseId}/lessons/${lessonId}/complete`
    );
    return response.data.course;
  },

  exportPDF: async (courseId: string, courseTitle: string): Promise<void> => {
    const response = await api.get(`/courses/${courseId}/export/pdf`, {
      responseType: "blob",
    });

    // Create download link
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${courseTitle.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default api;
