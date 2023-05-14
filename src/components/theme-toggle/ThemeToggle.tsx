import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { themes, setTheme, clearTheme } from "../../theme";
import styles from "./ThemeToggle.module.css";

const selectableThemes = {
  ...themes,
  ...({ SYSTEM: "system" } as const),
};

type SelectableTheme = (typeof selectableThemes)[keyof typeof selectableThemes];

const iconToThemeMap: { [key in SelectableTheme]: ReactNode } = {
  [selectableThemes.DARK]: <MoonIcon className={styles.icon} aria-hidden />,
  [selectableThemes.LIGHT]: <SunIcon className={styles.icon} aria-hidden />,
  [selectableThemes.SYSTEM]: (
    <Cog6ToothIcon className={styles.icon} aria-hidden />
  ),
};

const ThemeToggle = () => {
  const handleSelectTheme = (theme: SelectableTheme) =>
    theme === selectableThemes.SYSTEM ? clearTheme() : setTheme(theme);

  return (
    <Menu as="div" className={styles.dorpdownMenu}>
      <div>
        <Menu.Button className={styles.dropdownMenuButton}>
          Theme
          <ChevronDownIcon className={styles.icon} aria-hidden />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={styles.dropdownMenuItems}>
          {Object.values(selectableThemes).map((theme: SelectableTheme) => (
            <Menu.Item key={theme}>
              {({ active }) => (
                <span
                  className={`${styles.dropdownMenuItem} ${
                    active ? styles.dropdownMenuItemActive : ""
                  }`}
                  onClick={() => handleSelectTheme(theme)}
                >
                  {iconToThemeMap[theme]}
                  <span className={styles.dropdownMenuItemText}>{theme}</span>
                </span>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeToggle;
