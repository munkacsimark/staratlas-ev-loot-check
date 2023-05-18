import { PublicKey } from "@solana/web3.js";
import { format, formatDistanceToNow } from "date-fns";
import type { LootItem } from "./components/data-table/DataTable";
import type { LootResponseItem } from "./api";

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

const formatDataForTable = (data: LootResponseItem[]): LootItem[] =>
  data.map(({ name, quantity, rarity, spawnTimestamp, discoverTimestamp }) => ({
    name,
    quantity,
    rarity,
    spawned: new Date(spawnTimestamp * 1000),
    discovered: new Date(discoverTimestamp * 1000),
  }));

export {
  isSolanaAddress,
  formatDateToHumanReadable,
  formatDateToElapsed,
  formatDataForTable,
};
