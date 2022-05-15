import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState
} from "react";

interface IDeviceContext {
  dev: string;
}

const NotImplemented = () => null;

export const DeviceContext = createContext<IDeviceContext>({
  dev: ""
});

type Props = {
  children: ReactNode;
};

export default function DeviceProvider(props: Props): ReactElement {
  const [dev, setDev] = useState<string>("");

  return (
    <DeviceContext.Provider
      value={{
        dev
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = (): IDeviceContext => {
  return useContext(DeviceContext);
};
