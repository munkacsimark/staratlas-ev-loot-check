import { FunctionComponent, useState } from "react";
import { Pagination, Select, Table, Tooltip, Text } from "@geist-ui/core";
import { ChevronRightCircle, ChevronLeftCircle } from "@geist-ui/icons";
import { formatDateToElapsed, formatDateToHumanReadable } from "../../helpers";
import styles from "./DataTable.module.css";

const listLimitOptions = {
  TEN: "10",
  TWENTY_FIVE: "25",
  FIFTY: "50",
  HUNDRED: "100",
  ALL: "Show all",
} as const;

type DataTableProps = {
  data: LootItem[];
};

type LootItem = {
  name: string;
  quantity: number;
  rarity: string;
  spawned: Date;
  discovered: Date;
};

const generateTableColumns = (data: LootItem) => {
  const keys = Object.keys(data);
  return keys.map((key) => <Table.Column key={key} prop={key} label={key} />);
};

const formatDataItemForTable = (data: LootItem) => ({
  ...data,
  spawned: (
    <Tooltip text={formatDateToElapsed(data.spawned)}>
      {formatDateToHumanReadable(data.spawned)}
    </Tooltip>
  ),
  discovered: (
    <Tooltip text={formatDateToElapsed(data.discovered)}>
      {formatDateToHumanReadable(data.discovered)}
    </Tooltip>
  ),
});

const DataTable: FunctionComponent<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listLimit, setListLimit] = useState<string>(listLimitOptions.TEN);

  const handleListLimitChange = (limit: string | string[]) => {
    if (typeof limit !== "string") {
      throw Error(`Multiple selection is not supported.`);
    }

    setListLimit(limit);
  };

  const filterDataItems = (data: LootItem[]) => {
    if (listLimit === listLimitOptions.ALL) {
      return data;
    }

    const startIndex = (currentPage - 1) * Number(listLimit);
    return data.slice(startIndex, startIndex + Number(listLimit));
  };

  const getPaginationCount = () => {
    return Math.ceil(data.length / Number(listLimit));
  };

  if (data.length === 0) {
    return <Text>No loot found for this address.</Text>;
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <Table data={filterDataItems(data).map(formatDataItemForTable)}>
          {generateTableColumns(data[0])}
        </Table>
      </div>
      <div className={styles.limitSelect}>
        <Text className={styles.limitSelectLabel}>Show entries:</Text>
        <Select initialValue={listLimit} onChange={handleListLimitChange}>
          {Object.values(listLimitOptions).map((limitOption) => (
            <Select.Option key={limitOption} value={limitOption}>
              {limitOption}
            </Select.Option>
          ))}
        </Select>
      </div>
      {listLimit !== listLimitOptions.ALL && (
        <Pagination
          count={getPaginationCount()}
          onChange={setCurrentPage}
          className={styles.pagination}
        >
          <Pagination.Next>
            <ChevronRightCircle />
          </Pagination.Next>
          <Pagination.Previous>
            <ChevronLeftCircle />
          </Pagination.Previous>
        </Pagination>
      )}
    </>
  );
};

export default DataTable;
export type { LootItem };
