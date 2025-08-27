"use client"
import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";

export default function Home() {
  const { tasks, load, isLoading, error, setTasks } = useTasks();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = tasks.filter((t) => {
    if (statusFilter && t.status !== statusFilter) return false;
    if (query && !t.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      {error && <div className="text-red-500 my-2">{error}</div>}
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <TaskList tasks={filtered} loading={isLoading} onReload={() => load()} setTasks={setTasks} />
        </div>
        <div style={{ width: 360 }}>
          <TaskForm onSaved={() => load()} />
        </div>
      </div>
    </div>
  );
}
