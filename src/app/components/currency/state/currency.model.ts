import { ID } from "@datorama/akita";

export interface Currency {
  id: ID;
  iso_code: string;
};
export function createCurrency({
  id = null,
  iso_code = "HUF"
}: Partial<Currency>) {
  return {
    id,
    iso_code
  };
}