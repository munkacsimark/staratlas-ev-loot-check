import { Theme } from "./theme/themeContext";

const LOCAL_STORAGE_THEME_KEY = "theme";
const LOCAL_STORAGE_ADDRESSES_KEY = "addresses";

const saveTheme = (theme: Theme) => {
  localStorage[LOCAL_STORAGE_THEME_KEY] = theme;
};

const removeTheme = () => {
  localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
};

const getTheme = (): Theme => localStorage[LOCAL_STORAGE_THEME_KEY];

const getAddresses = (): string[] =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_ADDRESSES_KEY) || "[]");

const saveAddress = (address: string) =>
  localStorage.setItem(
    LOCAL_STORAGE_ADDRESSES_KEY,
    JSON.stringify([address, ...getAddresses()])
  );

const removeAddress = (address: string) => {
  localStorage.setItem(
    LOCAL_STORAGE_ADDRESSES_KEY,
    JSON.stringify(getAddresses().filter((addr) => addr !== address))
  );
};

export {
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_ADDRESSES_KEY,
  saveTheme,
  removeTheme,
  getTheme,
  saveAddress,
  getAddresses,
  removeAddress,
};
