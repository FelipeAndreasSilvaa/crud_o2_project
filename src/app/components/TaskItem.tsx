"use client";
import React, { useState } from "react";
import { Task } from "../type";
import { deleteTask, updateTask } from "../services/api";

type Props = {
  task: Task;
  onReload?: () => void;
};

export default function TaskItem({ task, onReload }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const handleDelete = async () => {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await deleteTask(task.id);
      onReload?.();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir tarefa");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, { title, status });
      setIsEditing(false);
      onReload?.();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar tarefa");
    }
  };

  return (
    <div className="p-3 border-b flex justify-between items-start">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-2"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="border px-2 py-1 rounded"
            >
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Atrasada">Atrasada</option>
            </select>
          </>
        ) : (
          <>
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">{task.description}</div>
            <div className="text-xs text-gray-500 mt-1">Vencimento: {task.dueDate}</div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 items-end ml-4">
        <span
          className={`px-2 py-1 rounded text-xs ${
            task.status === "Concluída"
              ? "bg-green-100"
              : task.status === "Atrasada"
              ? "bg-red-100"
              : "bg-yellow-100"
          }`}
        >
          {task.status}
        </span>

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 text-xs bg-gray-200 rounded"
          >
            Editar
          </button>
        )}

        <button
          onClick={handleDelete}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
