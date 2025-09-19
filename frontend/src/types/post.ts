import type { User } from './user';

export type Post = {
    id: number;
    title: string;
    body: string;
    user_id: string;
    user: User;
};