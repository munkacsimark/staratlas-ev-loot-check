import { useEffect, useState } from "react";
import { Loading, Text } from "@geist-ui/core";
import { fetchLoot } from "../../api";
import type { LootResponseItem } from "../../api";
import AddressBar from "../../components/address-bar/AddressBar";
import FilterBar from "../../components/filter-bar/FilterBar";
import DataTable from "../../components/data-table/DataTable";
import { formatDataForTable, isSolanaAddress } from "../../helpers";
import { getAddresses, isAddressSaved, saveAddress } from "../../localStorage";
import styles from "./Home.module.css";

const REFRESH_INTERVAL_TIME = 30; // sec

const HomePage = () => {
  const [lootData, setLootData] = useState<LootResponseItem[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAddressToSearch, setCurrentAddressToSearch] =
    useState<string>();
  const [savedAddresses, setSavedAddresses] = useState(getAddresses());
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [activeIntervalId, setActiveIntervalId] = useState<number>();
  const [refreshCounter, setRefreshCounter] = useState(REFRESH_INTERVAL_TIME);

  useEffect(() => {
    if (activeIntervalId !== null) {
      window.clearInterval(activeIntervalId);
      setActiveIntervalId(undefined);
      setRefreshCounter(REFRESH_INTERVAL_TIME);
    }

    if (!isAutoRefreshEnabled || !currentAddressToSearch) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRefreshCounter((counter) => counter - 1);
    }, 1000);

    setActiveIntervalId(intervalId);
  }, [isAutoRefreshEnabled, currentAddressToSearch]);

  useEffect(() => {
    if (refreshCounter > 0 || !currentAddressToSearch) {
      return;
    }

    fetchData(currentAddressToSearch);
    setRefreshCounter(REFRESH_INTERVAL_TIME);
  }, [refreshCounter]);

  const fetchData = async (address: string) => {
    setIsFetching(true);
    const { data, error } = await fetchLoot(address);

    if (error) {
      setError(error);
    }

    setLootData(data);
    setIsFetching(false);
  };

  const handleSearch = async ({
    address,
    save,
  }: {
    address: string;
    save: boolean;
  }) => {
    setError(null);
    setLootData(undefined);
    setCurrentAddressToSearch(undefined);

    if (address === "") {
      setError("Address field is empty.");
      return;
    }

    if (!isSolanaAddress(address)) {
      setError("Invalid Solana address.");
      return;
    }

    // save address locally
    if (save && !isAddressSaved(address)) {
      saveAddress(address);
      setSavedAddresses((savedAddresses) => [address, ...savedAddresses]);
    }

    setCurrentAddressToSearch(address);

    // fetch data
    await fetchData(address);
  };

  return (
    <>
      <AddressBar
        isSearchError={!!error}
        savedAddresses={savedAddresses}
        isAutoRefreshEnabled={isAutoRefreshEnabled}
        onSearch={handleSearch}
        onInputChange={() => setError(null)}
        onAutoRefreshChange={setIsAutoRefreshEnabled}
      />
      {error && <Text type="error">{error}</Text>}
      {false && <FilterBar />}
      {!isFetching && isAutoRefreshEnabled && !!currentAddressToSearch && (
        <Text
          font={"0.8rem"}
          className={styles.autoRefreshText}
        >{`Auto refresh in ${refreshCounter} sec.`}</Text>
      )}
      {isFetching && <Loading>Fetching data</Loading>}
      {lootData && !error && <DataTable data={formatDataForTable(lootData)} />}
    </>
  );
};

export default HomePage;
