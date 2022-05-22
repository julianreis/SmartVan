import { Theme } from "@mui/material";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState
} from "react";

interface ISettingsContext {
  setTheme: (val: Theme) => void;
  theme: Theme | undefined;
}

const NotImplemented = () => null;

export const SettingsContext = createContext<ISettingsContext>({
  setTheme: NotImplemented,
  theme: undefined
});

type Props = {
  children: ReactNode;
};

export default function SettingsProvider(props: Props): ReactElement {
  const [theme, setTheme] = useState<Theme>();
  //   useColorScheme(val => {
  //     setTheme(val);
  //   });

  return (
    <SettingsContext.Provider
      value={{
        setTheme,
        theme
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = (): ISettingsContext => {
  return useContext(SettingsContext);
};
