import { PublicKey } from "@solana/web3.js";
import { format, formatDistanceToNow } from "date-fns";

const isSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch (_) {
    return false;
  }
};

const formatDateToHumanReadable = (date: Date) =>
  format(date, "yyyy MMMM do, h:mm:ss a");

const formatDateToElapsed = (date: Date) =>
  formatDistanceToNow(date, { addSuffix: true });

export { isSolanaAddress, formatDateToHumanReadable, formatDateToElapsed };
