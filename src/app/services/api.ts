import axios from "axios";
import { Task } from "../type";

const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000
})


export const fetchTasks = (params?: any) =>
    api.get<Task[]>("/tasks", { params });
  
  export const getTask = (id: number) => api.get<Task>(`/tasks/${id}`);
  
  export const createTask = (task: Omit<Task, "id">) => api.post<Task>("/tasks", task);
  
  export const updateTask = (id: number, task: Partial<Task>) =>
    api.put<Task>(`/tasks/${id}`, task);
  
  export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);