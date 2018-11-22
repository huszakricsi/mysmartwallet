import { ID } from "@datorama/akita";

export type Auth = {
  uid: ID;
  client: string;
  accessToken: string;
  expiry: string;
  tokenType: string;
};
export function createAuth({
  uid = null,
  client = "",
  accessToken = "",
  expiry = "",
  tokenType = "Bearer"
}: Partial<Auth>) {
  return {
    uid,
    client,
    accessToken,
    expiry,
    tokenType
  };
}
