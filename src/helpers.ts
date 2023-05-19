import { PublicKey } from "@solana/web3.js";
import { format, formatDistanceToNow } from "date-fns";
import { LootItem } from "./components/data-table/DataTable";

const isSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch (_) {
    return false;
  }
};

const formatDateToHumanReadable = (date: Date) =>
  format(date, "yyyy MMMM do - h:mm:ss a");

const formatDateToElapsed = (date: Date) =>
  formatDistanceToNow(date, { addSuffix: true });

const convertToCSV = (data: LootItem[]) => {
  const columnHeads = Object.keys(data[0]).join(",");

  const rows = [columnHeads];
  for (const row of data) {
    const columns = Object.values(row).map((value) =>
      value instanceof Date
        ? formatDateToHumanReadable(value)
        : value.toString()
    );
    rows.push(columns.join(","));
  }
  return rows.join("\n");
};

const downloadCSV = (csvString: string, filename: string) => {
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export {
  isSolanaAddress,
  formatDateToHumanReadable,
  formatDateToElapsed,
  convertToCSV,
  downloadCSV,
};
