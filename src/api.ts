const url = `https://galaxy.staratlas.com/prizes/`;

type LootResponseItem = {
  sector: {
    x: number;
    y: number;
  };
  chargeConsumers: string[];
  _id: string;
  name: string;
  mint: string;
  quantity: number;
  charges: number;
  spawnTimestamp: number;
  expireTimestamp: number;
  rarity: string;
  discoverTimestamp: number;
  winnerPublicKey: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

type FetchResponse = {
  data?: LootResponseItem[];
  error?: string;
};

const fetchLoot = async (address: string): Promise<FetchResponse> => {
  try {
    const response = await fetch(`${url}${address}`);

    if (!response.ok) {
      throw new Error("Network response error.");
    }

    const data: LootResponseItem[] = await response.json();

    return { data };
  } catch (error) {
    console.error("Error fetching data:", error);

    let errorMessage = "Unknown error while fetching data.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
};

export { fetchLoot };
export type { FetchResponse, LootResponseItem };
