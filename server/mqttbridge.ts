var mqtt = require("mqtt");
var client;

//const Host = "10.3.141.1";
const Host = "192.168.178.7";

console.log("Connect to: ", Host);
client = mqtt.connect("mqtt://" + Host, { clientId: "mqttjs01" });

client.on("connect", function () {
  console.log("connected " + client.connected);
});

client.on("error", function (error) {
  console.error("Can't connect" + error);
  reconnect()
});

async function reconnect() {
  console.log("Reconnect!")
  await sleep(1000)
  mqtt.connect("mqtt://" + Host, { clientId: "mqttjs01" });
}

console.log("subscribing to wildcard topics");
client.subscribe("#", { qos: 1 });

module.exports = client;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 