import { Suspense, lazy, useEffect, useState } from "react";
import { Input, Loading, Text } from "@geist-ui/core";
import { fetchLoot } from "../../api";
import type { LootResponseItem } from "../../api";
import { isSolanaAddress } from "../../helpers";
import { getAddresses, isAddressSaved, saveAddress } from "../../localStorage";
import styles from "./Home.module.css";

const DynamicAddressBar = lazy(
  () => import("../../components/address-bar/AddressBar")
);
const DynamicFilterBar = lazy(
  () => import("../../components/filter-bar/FilterBar")
);
const DynamicDataTable = lazy(
  () => import("../../components/data-table/DataTable")
);

const REFRESH_INTERVAL_TIME = 30; // sec
const AUTO_REFRESH_ENABLED = true;

const HomePage = () => {
  const [lootData, setLootData] = useState<LootResponseItem[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAddressToSearch, setCurrentAddressToSearch] =
    useState<string>();
  const [savedAddresses, setSavedAddresses] = useState(getAddresses());
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] =
    useState(AUTO_REFRESH_ENABLED);
  const [refreshCounter, setRefreshCounter] = useState(REFRESH_INTERVAL_TIME);

  useEffect(() => {
    setRefreshCounter(REFRESH_INTERVAL_TIME);

    if (!currentAddressToSearch || !isAutoRefreshEnabled) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRefreshCounter((counter) => counter - 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isAutoRefreshEnabled, currentAddressToSearch]);

  useEffect(() => {
    if (refreshCounter > 0 || !currentAddressToSearch) {
      return;
    }

    fetchData(currentAddressToSearch);
    setRefreshCounter(REFRESH_INTERVAL_TIME);
  }, [refreshCounter, currentAddressToSearch]);

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
      <Suspense
        fallback={
          <Input
            height={"2.6rem"}
            placeholder="Address"
            width={"100%"}
            disabled
          />
        }
      >
        <DynamicAddressBar
          isSearchError={!!error}
          savedAddresses={savedAddresses}
          isAutoRefreshEnabled={isAutoRefreshEnabled}
          onSearch={handleSearch}
          onInputChange={() => setError(null)}
          onAutoRefreshChange={setIsAutoRefreshEnabled}
        />
      </Suspense>
      {error && <Text type="error">{error}</Text>}
      {false && <DynamicFilterBar />}
      {!isFetching && isAutoRefreshEnabled && !!currentAddressToSearch && (
        <Text
          font={"0.8rem"}
          className={styles.autoRefreshText}
        >{`Auto refresh in ${refreshCounter} sec.`}</Text>
      )}
      {isFetching && <Loading>Fetching data</Loading>}
      {lootData && !error && (
        <Suspense>
          <DynamicDataTable data={lootData} />
        </Suspense>
      )}
    </>
  );
};

export default HomePage;
