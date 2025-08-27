export type TaskStatus = "Em andamento" | "Concluída" | "Atrasada";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string; // ISO date
}
