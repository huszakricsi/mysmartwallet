import { ID } from "@datorama/akita";

export interface Transaction {
  id: ID;
  amount: number;
  comment: string;
  account_id: ID;
  category_id: ID;
  created_at: Date;
  isIncome: boolean;
}
export function createTransaction({
  id = null,
  amount = 0,
  comment = "",
  account_id = null,
  category_id = null,
  created_at = Date.now(),
  isIncome = false
}: Partial<Transaction>) {
  return {
  id,
  amount,
  comment,
  account_id,
  category_id,
  created_at,
  isIncome
  };
}
