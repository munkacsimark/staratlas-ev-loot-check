import { FormEvent, FunctionComponent, useState } from "react";
import { Button, Input, Checkbox, Text } from "@geist-ui/core";
import { isSolanaAddress } from "../../helpers";
import styles from "./AddressBar.module.css";

const ADDRESS_PROP_NAME = "solanaAddress";
const SAVE_ADDRESS_PROP_NAME = "save-solanaAddress";

type AddressBarProps = {
  onSearch: (address: string) => void;
};

const AddressBar: FunctionComponent<AddressBarProps> = ({ onSearch }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const address = formData.get(ADDRESS_PROP_NAME);
    const saveAddress = formData.get(SAVE_ADDRESS_PROP_NAME);

    if (address === null) {
      throw Error("Error while getting address from form data.");
    }

    const addressString = address.toString();
    if (!isSolanaAddress(addressString)) {
      setError("Invalid Solana address");
      return;
    }

    if (saveAddress && !!saveAddress) {
      console.log("save it");
      // TODO: save address
    }

    onSearch(addressString);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Address"
          name={ADDRESS_PROP_NAME}
          type={error ? "error" : "default"}
          onChange={() => setError(null)}
          className={styles.input}
        />
        <Button htmlType="submit" disabled={!!error}>
          Search
        </Button>
        {false && (
          <Checkbox name={SAVE_ADDRESS_PROP_NAME}>Save address</Checkbox>
        )}
      </form>
      {error && <Text type="error">{error}</Text>}
    </>
  );
};

export default AddressBar;
