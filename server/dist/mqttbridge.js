var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    reconnect();
});
function reconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Reconnect!");
        yield sleep(1000);
        mqtt.connect("mqtt://" + Host, { clientId: "mqttjs01" });
    });
}
console.log("subscribing to wildcard topics");
client.subscribe("#", { qos: 1 });
module.exports = client;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=mqttbridge.js.map