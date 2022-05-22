var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');
const DBSOURCE = "db.sqlite";
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error("DB ERROR: ", err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite database.');
        initial();
    }
});
const runAsync = (query) => {
    return new Promise(function (resolve, reject) {
        if (db) {
            db.run(query, function (err) {
                if (err)
                    reject(err.message);
                else
                    resolve(true);
            });
        }
        else
            reject(false);
    });
};
const initial = () => __awaiter(this, void 0, void 0, function* () {
    yield dropTables();
    console.log("Drop Finish");
    yield createTables();
});
const createTables = () => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('Create Tabels');
        yield createMqttDeviceTable();
        yield createDeviceComponents();
        yield createDeviceMqttMappingTable();
        yield createUserDevices();
    }
    catch (err) {
        console.log("CreateTable: ", err);
    }
});
const dropTables = () => __awaiter(this, void 0, void 0, function* () {
    console.log('Drop Tabels');
    try {
        yield runAsync('DROP TABLE IF EXISTS devices');
        yield runAsync('DROP TABLE IF EXISTS user');
        yield runAsync('DROP TABLE IF EXISTS components');
        yield runAsync('DROP TABLE IF EXISTS componentsMqtt');
        yield runAsync('DROP TABLE IF EXISTS userdevices');
    }
    catch (err) {
        console.log("DropTables", err);
    }
});
const createMqttDeviceTable = () => __awaiter(this, void 0, void 0, function* () {
    yield runAsync(`CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE,
            type text,
            state text,
            lastupdate text,
            CONSTRAINT name_unique UNIQUE (name)
            )`).then(() => {
        // var insert = 'INSERT OR REPLACE INTO devices (name, type, state, lastupdate) VALUES (?,?,?,?)'
        // db.run(insert, ["SERVER","MQTT_SERVER","Online",new Date()])
        insertOrUpdateDevice("SERVER", "MQTT_SERVER", "Online");
    });
});
const createDeviceMqttMappingTable = () => __awaiter(this, void 0, void 0, function* () {
    yield runAsync(`CREATE TABLE IF NOT EXISTS componentsMqtt (
            id_mqtt INTEGER NOT NULL,
            id_component text NOT NULL,
            CONSTRAINT id_unique UNIQUE (id_mqtt)
            FOREIGN KEY (id_mqtt) REFERENCES devices (id),
            FOREIGN KEY (id_component) REFERENCES components (id) 
            )`);
});
const createDeviceComponents = () => __awaiter(this, void 0, void 0, function* () {
    yield runAsync(`CREATE TABLE IF NOT EXISTS components (
            name text PRIMARY KEY,
            lastupdate text
            )`);
});
const createUserDevices = () => __awaiter(this, void 0, void 0, function* () {
    yield runAsync(`CREATE TABLE IF NOT EXISTS userdevices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_component INTEGER,
            name text UNIQUE,
            lastupdate text,
            state text,
            CONSTRAINT name_unique UNIQUE (name),
            FOREIGN KEY (id_component) REFERENCES components (id)
            )`);
});
const insertOrUpdateDevice = (name, type, state) => __awaiter(this, void 0, void 0, function* () {
    var insert = `INSERT OR REPLACE INTO devices (id, name, type, state, lastupdate) VALUES ((select id from devices where Name = '${name}'),'${name}','${type}','${state}','${new Date().getTime()}')`;
    //console.log("run DB: ", insert)
    yield runAsync(insert);
});
const insertComponent = (name) => __awaiter(this, void 0, void 0, function* () {
    const componentName = createComponentName(name);
    var insert = `INSERT OR IGNORE INTO components (name, lastupdate) VALUES ('${componentName}','${new Date().getTime()}')`;
    runAsync(insert).then(() => {
        insertMqttComponentMapping(componentName);
    });
});
const insertMqttComponentMapping = (componentName) => __awaiter(this, void 0, void 0, function* () {
    var insert = `INSERT OR IGNORE INTO componentsMqtt (id_mqtt, id_component)
    SELECT d.id, c.name FROM devices as d 
        LEFT JOIN components as c ON c.name LIKE "%${componentName}%"
        WHERE d.name LIKE "%${componentName}%"
        GROUP BY d.name`;
    yield runAsync(insert);
});
const createComponentName = (name) => {
    const chars = name.split('/');
    if (chars.length === 1) {
        return chars[0];
    }
    if (chars.length > 2) {
        if (chars[0].length > 1) {
            return chars[0] + "/" + chars[1];
        }
        else {
            return chars[1] + "/" + chars[2];
        }
    }
    return name;
};
module.exports = {
    db,
    insertOrUpdateDevice,
    insertComponent,
};
//# sourceMappingURL=database.js.map