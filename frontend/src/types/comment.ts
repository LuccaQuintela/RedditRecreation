import type { User } from './user';

export type Comment = {
    id: number;
    body: string;
    user: User;
    userId: number;
    postId: number;
    parentId?: number | null;
    replies: Comment[];
};