export interface User {
  id: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  active?: boolean;
}
export interface Post {
  id: number;
  title: string;
  description?: string;
  published?: boolean;
  user_id: string;
}
