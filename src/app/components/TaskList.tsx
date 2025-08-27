import React from "react";
import { FixedSizeList as List } from "react-window";
import TaskItem from "./TaskItem";
import { Task } from "../type";

type Props = {
  tasks: Task[];
  loading?: boolean;
  onReload?: () => void;
};

export default function TaskList({ tasks, loading, onReload }: Props) {
  if (loading) return <div>Carregando...</div>;
  if (!tasks.length) return <div>Nenhuma tarefa encontrada.</div>;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <TaskItem task={tasks[index]} onReload={onReload} />
    </div>
  );

  return (
    <List
      height={500}
      itemCount={tasks.length}
      itemSize={120}
      width="100%"
      className="border rounded"
    >
      {Row}
    </List>
  );
}
