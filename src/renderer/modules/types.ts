export type task = { id: string; description: string; due: string; completed: boolean };
export type plan = {
  name: string;
  color: string;
  id: string;
  tasks: task[];
};
