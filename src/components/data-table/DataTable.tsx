import { FunctionComponent, useState } from "react";
import {
  Pagination,
  Select,
  Table,
  Tooltip,
  Text,
  useMediaQuery,
  Button,
} from "@geist-ui/core";
import { ChevronRightCircle, ChevronLeftCircle } from "@geist-ui/icons";
import {
  convertToCSV,
  downloadCSV,
  formatDateToElapsed,
  formatDateToHumanReadable,
} from "../../helpers";
import type { LootResponseItem } from "../../api";
import styles from "./DataTable.module.css";

const listLimitOptions = {
  TEN: "10",
  TWENTY_FIVE: "25",
  FIFTY: "50",
  HUNDRED: "100",
  ALL: "Show all",
} as const;

type DataTableProps = {
  data: LootResponseItem[];
};

type LootItem = {
  name: string;
  quantity: number;
  rarity: string;
  spawned: Date;
  discovered: Date;
};

type MobileOrNormalLootItem = Pick<
  LootItem,
  "name" | "quantity" | "discovered"
> &
  Partial<Pick<LootItem, "rarity" | "spawned">>;

const generateTableColumns = (data: MobileOrNormalLootItem) =>
  Object.keys(data).map((key) => (
    <Table.Column key={key} prop={key} label={key} />
  ));

const formatDataForTable = (data: LootResponseItem[], isSmallScreen: boolean) =>
  data.map(({ name, quantity, rarity, spawnTimestamp, discoverTimestamp }) => ({
    name,
    quantity,
    ...(isSmallScreen ? {} : { rarity }),
    ...(isSmallScreen ? {} : { spawned: new Date(spawnTimestamp * 1000) }),
    discovered: new Date(discoverTimestamp * 1000),
  }));

const formatDataItemForTable = (
  data: MobileOrNormalLootItem,
  isSmallScreen: boolean
) => {
  const { name, quantity, rarity, spawned, discovered } = data;

  return {
    name,
    quantity,
    ...(rarity && !isSmallScreen ? { rarity } : {}),
    ...(spawned && !isSmallScreen
      ? {
          spawned: (
            <Tooltip text={formatDateToElapsed(spawned)}>
              {formatDateToHumanReadable(spawned)}
            </Tooltip>
          ),
        }
      : {}),
    discovered: isSmallScreen ? (
      formatDateToElapsed(discovered)
    ) : (
      <Tooltip text={formatDateToElapsed(discovered)}>
        {formatDateToHumanReadable(discovered)}
      </Tooltip>
    ),
  };
};

const DataTable: FunctionComponent<DataTableProps> = ({ data }) => {
  const isSmallScreen = useMediaQuery("sm", { match: "down" });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listLimit, setListLimit] = useState<string>(listLimitOptions.TEN);

  const handleListLimitChange = (limit: string | string[]) => {
    if (typeof limit !== "string") {
      throw Error(`Multiple selection is not supported.`);
    }

    setListLimit(limit);
  };

  const handleDownload = () => {
    const tableData = formatDataForTable(data, false);
    const csvString = convertToCSV(tableData as LootItem[]);
    downloadCSV(csvString, `star-atlas-ev-rewards-${Date.now()}.csv`);
  };

  const filterDataItems = (data: MobileOrNormalLootItem[]) => {
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
    return (
      <Text type="warning" className={styles.notFoundText}>
        No loot found for this address.
      </Text>
    );
  }

  const tableData = formatDataForTable(data, isSmallScreen);

  return (
    <>
      <div className={styles.tableContainer}>
        <Table
          data={filterDataItems(tableData).map((item) =>
            formatDataItemForTable(item, isSmallScreen)
          )}
        >
          {generateTableColumns(tableData[0])}
        </Table>
      </div>
      <div className={styles.tableFooter}>
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
        <Button onClick={handleDownload}>Download as CSV</Button>
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
