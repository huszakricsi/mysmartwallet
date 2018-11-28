import { ID } from "@datorama/akita";

export interface Account {
  id: ID;
  name: string;
  balance: number;
  currency: string;
};
export function createAccount({
  id = null,
  name = "",
  balance = 0,
  currency = ""
}: Partial<Account>) {
  return {
    id,
    name,
    balance,
    currency
  };
}