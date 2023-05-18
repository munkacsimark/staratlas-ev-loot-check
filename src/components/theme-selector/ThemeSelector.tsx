import { createElement } from "react";
import { Select, Spacer } from "@geist-ui/core";
import { Sun, Moon, Monitor } from "@geist-ui/icons";
import type { Icon } from "@geist-ui/icons";
import { themes } from "../../theme/themeContext";
import useTheme from "../../theme/useTheme";
import styles from "./ThemeSelector.module.css";

const selectableThemes = {
  ...themes,
  ...({ SYSTEM: "system" } as const),
};

type SelectableTheme = (typeof selectableThemes)[keyof typeof selectableThemes];

const iconToThemeMap: { [key in SelectableTheme]: Icon } = {
  [selectableThemes.DARK]: Moon,
  [selectableThemes.LIGHT]: Sun,
  [selectableThemes.SYSTEM]: Monitor,
} as const;

const isSelectableTheme = (value: string): value is SelectableTheme =>
  Object.values(selectableThemes)
    .map((theme) => theme.toString())
    .includes(value);

const ThemeToggle = () => {
  const { theme, setTheme, clearTheme } = useTheme();

  const handleSelectTheme = (selectedTheme: string | string[]) => {
    if (typeof selectedTheme !== "string") {
      throw Error(`Multiple selection is not supported.`);
    }

    if (!isSelectableTheme(selectedTheme)) {
      console.error(`${selectedTheme} is an unknown theme.`);
      return;
    }

    selectedTheme === selectableThemes.SYSTEM
      ? clearTheme()
      : setTheme(selectedTheme);
  };

  return (
    <Select
      initialValue={theme}
      onChange={handleSelectTheme}
      className={styles.select}
    >
      {Object.values(selectableThemes).map((selectableTheme) => (
        <Select.Option key={selectableTheme} value={selectableTheme}>
          <div className={styles.selectOption}>
            {createElement(iconToThemeMap[selectableTheme], {
              size: 16,
              className: styles.selectoptionIcon,
            })}
            <Spacer />
            {selectableTheme}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default ThemeToggle;
