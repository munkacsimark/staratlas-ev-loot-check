import { useState } from "react";
import { Loading, Text } from "@geist-ui/core";
import { fetchLoot } from "../../api";
import type { LootResponseItem } from "../../api";
import AddressBar from "../../components/address-bar/AddressBar";
import FilterBar from "../../components/filter-bar/FilterBar";
import DataTable from "../../components/data-table/DataTable";
import { formatDataForTable } from "../../helpers";

const HomePage = () => {
  const [lootData, setLootData] = useState<LootResponseItem[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (address: string) => {
    setError(null);
    setIsFetching(true);
    const { data, error } = await fetchLoot(address);

    if (error) {
      setError(error);
      return;
    }

    setLootData(data);
    setIsFetching(false);
  };

  return (
    <>
      <AddressBar onSearch={handleSearch} />
      {false && <FilterBar />}
      {isFetching && <Loading>Fetching data</Loading>}
      {lootData && !error && <DataTable data={formatDataForTable(lootData)} />}
      {error && <Text type="error">{error}</Text>}
    </>
  );
};

export default HomePage;
