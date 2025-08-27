"use client"
import React, { useState } from "react";
import { createTask } from "../services/api";
import { TaskStatus } from "../type";

type Props = { onSaved?: () => void };

export default function TaskForm({ onSaved }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Em andamento");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask({ title, description, dueDate, status });
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Em andamento");
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-gray-50 p-4 rounded shadow-sm">
      <h2 className="font-semibold mb-2">Nova tarefa</h2>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título" className="w-full mb-2 p-2 border rounded" required />
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Descrição" className="w-full mb-2 p-2 border rounded" />
      <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <select value={status} onChange={(e)=>setStatus(e.target.value as TaskStatus)} className="w-full mb-3 p-2 border rounded">
        <option>Em andamento</option>
        <option>Concluída</option>
        <option>Atrasada</option>
      </select>
      <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
