export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};


export type Task = {
  id?: string;
  email: string;
  title: string;
  description: string;
  priority: string;
  date: string;
  category: string;
  tags: string;
  is_done: boolean;
  is_deleted: boolean;
};

export const apiUrl = 'http://localhost:3000'
