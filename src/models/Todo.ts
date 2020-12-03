import { Category } from "./Categories";

export interface TodoModel {
    id?: string;
    title: string;
    description: string;
    category: Category;
}