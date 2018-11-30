import { ID } from "@datorama/akita";

export interface Category {
  id: ID;
  label: string;
  childs: [{ id: ID; label: string }];
}
export function createCategory({
  id = null,
  label = "",
  childs = []
}: Partial<Category>) {
  return {
    id,
    label,
    childs
  };
}
