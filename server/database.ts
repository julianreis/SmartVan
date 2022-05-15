var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error("DB ERROR: ", err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        //db.run('DROP TABLE devices');
        createMqttDeviceTable();
        //db.run('DROP TABLE components');
        createDeviceComponents();
        //db.run('DROP TABLE componentsMqtt');
        createDeviceMqttMappingTable();
        //db.run('DROP TABLE devices');
        createUserDevices();
    }
});

const createMqttDeviceTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE,
            type text,
            state text,
            lastupdate text,
            CONSTRAINT name_unique UNIQUE (name)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("DB ERROR: ", err)
            } else {
                // Table just created, creating some rows
                console.log("createtd Devices")
                // var insert = 'INSERT OR REPLACE INTO devices (name, type, state, lastupdate) VALUES (?,?,?,?)'
                // db.run(insert, ["SERVER","MQTT_SERVER","Online",new Date()])
                insertOrUpdateDevice("SERVER", "MQTT_SERVER", "Online")
            }
        });
}

const createDeviceMqttMappingTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS componentsMqtt (
            id_mqtt INTEGER NOT NULL,
            id_component text NOT NULL,
            FOREIGN KEY (id_mqtt) REFERENCES devices (id),
            FOREIGN KEY (id_component) REFERENCES components (id) 
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("DB ERROR: ", err)
            } else {
                console.log("createtd components Mqtt")
            }
        });
}

const createDeviceComponents = () => {
    db.run(`CREATE TABLE IF NOT EXISTS components (
            name text PRIMARY KEY,
            lastupdate text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("DB ERROR: ", err)
            } else {
                console.log("createtd components")
            }
        });
}

const createUserDevices = () => {
    db.run(`CREATE TABLE IF NOT EXISTS userdevices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_component INTEGER,
            name text UNIQUE,
            lastupdate text,
            state text,
            CONSTRAINT name_unique UNIQUE (name),
            FOREIGN KEY (id_component) REFERENCES components (id)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("DB ERROR: ", err)
            } else {
                console.log("createtd userdevices")
            }
        });
}

const insertOrUpdateDevice = async (name, type, state) => {
    var insert = `INSERT OR REPLACE INTO devices (id, name, type, state, lastupdate) VALUES ((select id from devices where Name = '${name}'),'${name}','${type}','${state}','${new Date().getTime()}')`
    //console.log("run DB: ", insert)
    if (db) {
        await run(insert)
    }
}

const insertComponent = async (name) => {
    const componentName = createComponentName(name);
    var insert = `INSERT OR IGNORE INTO components (name, lastupdate) VALUES ('${componentName}','${new Date().getTime()}')`
    if (db) {
        await new Promise(function (resolve, reject) {
            if (db) {
                db.run(insert, function (err) {
                    if (err) reject(err.message)
                    else {
                        resolve(true)
                    }
                })
            }
            else reject(false)
        })
        await insertMqttComponentMapping(name)
    }
}

const insertMqttComponentMapping = async (name) => {
    var insert = `INSERT OR IGNORE INTO componentsMqtt (id_mqtt, id_component)
    SELECT d.id, c.name FROM devices as d 
        LEFT JOIN components as c ON d.name LIKE "%${name}%"
        WHERE d.name LIKE "%${name}%"
        GROUP BY d.name`
    console.log("run DB: ", insert)
    if (db) {
        await run(insert)
    }
}

const createComponentName = (name) => {
    const chars = name.split('/');
    if (chars.length === 1) {
        return chars[0];
    }
    if (chars.length > 2) {
        if (chars[0].length > 1) {
            return chars[0] + "/" + chars[1]
        } else {
            return chars[1] + "/" + chars[2]
        }
    }
    return name
}

const run = (query) => {
    return new Promise(function (resolve, reject) {
        if (db) {
            db.run(query,
                function (err) {
                    if (err) reject(err.message)
                    else resolve(true)
                })
        }
        else reject(false)
    })
}


module.exports = {
    db,
    insertOrUpdateDevice,
    insertComponent
}