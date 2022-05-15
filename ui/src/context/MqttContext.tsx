import mqtt, { IClientOptions, QoS } from "mqtt";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

type MsgObject = {
  topic: string;
  message: string;
  time: string;
};

export enum ConnectionStatus {
  Connectet = "Connect",
  Disconnect = "Disconnect",
  Reconnect = "Reconnect",
  Failure = "Error"
}

interface IMqttProvider {
  connect: (host: any, port: string) => void;
  disconnect: () => void;
  subscribe: (topic: string) => void;
  unSubscribe: (topic: string) => void;
  connectStatus: ConnectionStatus;
  isSubed: boolean;
  payload: MsgObject | undefined;
  client: mqtt.MqttClient | undefined;
  publish: (topic: string, msg: any, qos: QoS) => void;
  lastHost: string | undefined;
  topicList: string[];
}

const NotImplemented = () => null;

export const MqttContext = createContext<IMqttProvider>({
  connect: NotImplemented,
  disconnect: NotImplemented,
  subscribe: NotImplemented,
  unSubscribe: NotImplemented,
  connectStatus: ConnectionStatus.Disconnect,
  isSubed: false,
  payload: undefined,
  client: undefined,
  publish: NotImplemented,
  lastHost: undefined,
  topicList: []
});

type Props = {
  children: ReactNode;
};

export default function MqttProvider(props: Props): ReactElement {
  const [client, setClient] = useState<mqtt.MqttClient>();
  const [connectStatus, setConnectStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Disconnect
  );
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState<MsgObject>();
  const lastTopic = useRef<string>("");
  const [lastHost, setLastHost] = useState<string>();
  const [topicList, setTopicList] = useState<string[]>([]);

  const OPTIONS: IClientOptions = {
    keepalive: 30,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  };

  const analyseTopic = useCallback(
    (topic: string) => {
      if (!topicList.includes(topic)) {
        topicList.push(topic);
        setTopicList(topicList);
      }
    },
    [topicList]
  );

  useEffect(() => {
    const tempHost = localStorage.getItem("host");
    console.log("read host from storage: ", tempHost);
    if (tempHost) setLastHost(tempHost);
  }, []);

  useEffect(() => {
    if (lastHost) {
      console.log("Autoconnect to", lastHost);
      connect(lastHost, "9001");
    }
  }, [lastHost]);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus(ConnectionStatus.Connectet);
      });
      client.on("error", err => {
        console.error("Connection error: ", err);
        client.end();
        setClient(undefined);
        setConnectStatus(ConnectionStatus.Failure);
      });
      client.on("reconnect", () => {
        setConnectStatus(ConnectionStatus.Reconnect);
      });
      client.on("message", (topic, message) => {
        const payload = {
          topic,
          message: message.toString(),
          time: new Date().toLocaleTimeString()
        };
        analyseTopic(topic);
        setPayload(payload);
      });
    }
  }, [client, analyseTopic]);

  const connect = (ip: string, port: string) => {
    if (lastHost !== ip) {
      localStorage.setItem("host", ip);
      setLastHost(ip);
    }
    const url = `mqtt://${ip}:${port}`;
    //const connection = mqtt.connect(url, OPTIONS);
    //setClient(connection);
  };

  const disconnect = () => {
    if (client) {
      unSubscribe(lastTopic.current);
      client.removeAllListeners();
      client.end(true);
      setClient(undefined);
      setConnectStatus(ConnectionStatus.Disconnect);
    }
  };

  const subscribe = (topic: string) => {
    if (client) {
      lastTopic.current = topic;
      const qos: QoS = 0;
      try {
        client.subscribe(topic, { qos }, error => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          setIsSub(true);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const publish = (topic: string, msg: any, qos: QoS = 0) => {
    if (client) {
      client.publish(topic, msg, { qos }, error => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const unSubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic);
      setIsSub(false);
      setPayload(undefined);
    }
  };

  return (
    <MqttContext.Provider
      value={{
        connect,
        disconnect,
        subscribe,
        unSubscribe,
        connectStatus,
        isSubed,
        payload,
        client,
        publish,
        lastHost,
        topicList
      }}
    >
      {props.children}
    </MqttContext.Provider>
  );
}

export const useMqttContext = (): IMqttProvider => {
  return useContext(MqttContext);
};
