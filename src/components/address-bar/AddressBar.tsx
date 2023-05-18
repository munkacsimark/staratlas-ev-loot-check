import { FormEvent, FunctionComponent, MouseEvent, useState } from "react";
import { Button, AutoComplete, Checkbox, Text, Tooltip } from "@geist-ui/core";
import { QuestionCircle, Delete } from "@geist-ui/icons";
import { isSolanaAddress } from "../../helpers";
import {
  getAddresses,
  removeAddress,
  saveAddress as saveAddressToLocalStorage,
} from "../../localStorage";
import styles from "./AddressBar.module.css";

const ADDRESS_PROP_NAME = "solanaAddress";
const SAVE_ADDRESS_PROP_NAME = "save-solanaAddress";

type AddressBarProps = {
  onSearch: (address: string) => void;
};

const addressesToOptions = (addresses: string[]) =>
  addresses.map((address) => ({ label: address, value: address }));

const AddressBar: FunctionComponent<AddressBarProps> = ({ onSearch }) => {
  const [error, setError] = useState<string | null>(null);
  const [addressOptions, setAddressOptions] = useState(
    addressesToOptions(getAddresses())
  );

  const createAutocompleteOptions = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => (
    <AutoComplete.Option value={value} className={styles.autocompleteOption}>
      <Text className={styles.autocompleteOptionText}>{label}</Text>
      <Delete
        onClick={(event: MouseEvent<SVGElement>) => {
          event.stopPropagation();
          removeAddress(value);
          setAddressOptions((currentOptions) =>
            currentOptions.filter((option) => option.value !== value)
          );
        }}
        size={32}
        className={styles.autocompleteOptionDelete}
      />
    </AutoComplete.Option>
  );

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
      saveAddressToLocalStorage(addressString);
      setAddressOptions((currentOptions) => [
        { value: addressString, label: addressString },
        ...currentOptions,
      ]);
    }

    onSearch(addressString);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <AutoComplete
          placeholder="Address"
          options={addressOptions.map(createAutocompleteOptions)}
          name={ADDRESS_PROP_NAME}
          type={error ? "error" : "default"}
          onChange={() => setError(null)}
          className={styles.input}
        />
        <Button htmlType="submit" disabled={!!error} mr={"1rem"}>
          Fetch loot
        </Button>
        <div className={styles.saveAddressContainer}>
          <Checkbox name={SAVE_ADDRESS_PROP_NAME}>Save address</Checkbox>
          <Tooltip
            text="Saves your address locally to be able to use it quickly in input."
            className={styles.tooltip}
          >
            <QuestionCircle size={16} />
          </Tooltip>
        </div>
      </form>
      {error && <Text type="error">{error}</Text>}
    </>
  );
};

export default AddressBar;
