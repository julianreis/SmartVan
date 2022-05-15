import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState
} from "react";
import { DefaultTheme } from "styled-components";

interface ISettingsContext {
  setTheme: (val: DefaultTheme) => void;
  theme: DefaultTheme | undefined;
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
  const [theme, setTheme] = useState<DefaultTheme>();
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
