"use client";
import { useEffect, useState } from "react";
import { Task } from "../type";
import * as api from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (params?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.fetchTasks(params);
      setTasks(res.data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar tasks");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect precisa estar dentro do hook
  useEffect(() => {
    load();
  }, []);

  // retorno corrigido
  return { tasks, setTasks, load, isLoading, error };
};
