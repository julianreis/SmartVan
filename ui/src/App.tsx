import React from "react";
import { Route, Switch } from "react-router-dom";
import DeviceProvider from "./context/DeviceContext";
import MqttProvider from "./context/MqttContext";
import SettingsProvider from "./context/SettingContext";

import Lights from "./Pages/Lights";
import Settings from "./Pages/Settings";
import Startpage from "./Pages/Startpage";
import Water from "./Pages/Water";
import Skeleton from "./Skeleton";

function App() {
  return (
    <MqttProvider>
      <SettingsProvider>
        <DeviceProvider>
          <Skeleton>
            <Switch>
              <Route path="/Lights">
                <Lights />
              </Route>
              <Route path="/Water">
                <Water />
              </Route>
              <Route path="/Settings">
                <Settings />
              </Route>
              <Route path="/">
                <Startpage />
              </Route>
            </Switch>
          </Skeleton>
        </DeviceProvider>
      </SettingsProvider>
    </MqttProvider>
  );
}

export default App;
