import React from "react";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  statusFilter: string | null;
  onStatusChange: (s: string | null) => void;
};

export default function FilterBar({ query, onQueryChange, statusFilter, onStatusChange }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar por título..."
        className="border rounded px-3 py-2 flex-1"
      />
      <select
        value={statusFilter ?? ""}
        onChange={(e) => onStatusChange(e.target.value || null)}
        className="border rounded px-3 py-2"
      >
        <option value="">Todos</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
        <option value="Atrasada">Atrasada</option>
      </select>
    </div>
  );
}
