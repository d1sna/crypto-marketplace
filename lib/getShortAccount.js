import { isString } from "lodash";

export const getShortAccount = (account) =>
  isString(account)
    ? `${account[0]}${account[1]}${account[2]}${account[3]}${account[4]}...${account[account.length - 3]}${
        account[account.length - 2]
      }${account[account.length - 1]}`
    : "Unknown account";
