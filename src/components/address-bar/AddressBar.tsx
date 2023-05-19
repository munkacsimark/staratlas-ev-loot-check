import {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import {
  Button,
  AutoComplete,
  Checkbox,
  Text,
  Tooltip,
  Input,
  Toggle,
  Card,
} from "@geist-ui/core";
import type { AutoCompleteProps, InputProps } from "@geist-ui/core";
import { QuestionCircle, Delete } from "@geist-ui/icons";
import { removeAddress } from "../../localStorage";
import styles from "./AddressBar.module.css";

const ADDRESS_PROP_NAME = "solanaAddress";
const SAVE_ADDRESS_PROP_NAME = "save-solanaAddress";

type AddressBarProps = {
  isSearchError: boolean;
  savedAddresses: string[];
  isAutoRefreshEnabled: boolean;
  onSearch: ({ address, save }: { address: string; save: boolean }) => void;
  onInputChange: () => void;
  onAutoRefreshChange: (checked: boolean) => void;
};

const addressesToOptions = (addresses: string[]) =>
  addresses.map((address) => ({ label: address, value: address }));

const AddressBar: FunctionComponent<AddressBarProps> = ({
  isSearchError,
  savedAddresses,
  isAutoRefreshEnabled,
  onSearch,
  onInputChange,
  onAutoRefreshChange,
}) => {
  const [addressOptions, setAddressOptions] = useState(
    addressesToOptions(savedAddresses)
  );

  useEffect(() => {
    setAddressOptions(addressesToOptions(savedAddresses));
  }, [savedAddresses]);

  const createAutocompleteOption = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => (
    <AutoComplete.Option value={value}>
      <div className={styles.autocompleteOptionContainer}>
        <Text className={styles.autocompleteOptionText}>{label}</Text>
        <Delete
          onClick={(event: MouseEvent<SVGElement>) => {
            event.stopPropagation();
            removeAddress(value);
            setAddressOptions((currentOptions) =>
              currentOptions.filter((option) => option.value !== value)
            );
          }}
          size={16}
          className={styles.autocompleteOptionDelete}
        />
      </div>
    </AutoComplete.Option>
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSearch({
      address: formData.get(ADDRESS_PROP_NAME)?.toString() || "",
      save: !!formData.get(SAVE_ADDRESS_PROP_NAME),
    });
  };

  const inputProps: Partial<AutoCompleteProps & InputProps> = {
    height: "2.6rem",
    placeholder: "Address",
    name: ADDRESS_PROP_NAME,
    type: isSearchError ? "error" : "default",
    width: "100%",
    clearable: true,
    onChange: onInputChange,
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.autocompleteContainer}>
          {addressOptions.length === 0 ? (
            <Input {...inputProps} />
          ) : (
            <AutoComplete
              {...inputProps}
              options={addressOptions.map(createAutocompleteOption)}
            />
          )}
        </div>

        <div className={styles.fetchButtonContainer}>
          <Button
            htmlType="submit"
            type="success"
            ghost
            disabled={!!isSearchError}
          >
            Fetch loot
          </Button>
        </div>

        <div className={styles.saveAddressContainer}>
          <Card>
            <Checkbox name={SAVE_ADDRESS_PROP_NAME}>Save address</Checkbox>
            <Tooltip
              text="Saves your address locally to be able to select it quickly."
              className={styles.tooltip}
            >
              <QuestionCircle size={16} />
            </Tooltip>
          </Card>
        </div>

        <div className={styles.toggleAutorefrechContainer}>
          <Card>
            <Toggle
              checked={isAutoRefreshEnabled}
              onChange={({ target: { checked } }) =>
                onAutoRefreshChange(checked)
              }
            />
            <Text small className={styles.autoRefreshText}>
              Auto refresh
            </Text>
          </Card>
        </div>
      </form>
    </>
  );
};

export default AddressBar;
