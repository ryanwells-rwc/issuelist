export interface Issue {
  key?:string;
  title?:string;
  description?:string;
  assignee?: string;
  kind?: string;
  priority?: number;
}