// Create express app
var express = require("express");
var app = express();
var database = require("./database.js");
var mqtt = require("./mqttbridge.js");
var bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Server port
var HTTP_PORT = 8081;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%", HTTP_PORT);
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ message: "Ok", mqtt: { connected: mqtt.connected } });
});
// Insert here other API endpoints
app.get("/api/devices", (req, res, next) => {
    var sql = "select id, name from devices";
    var params = [];
    database.db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});
app.get("/api/device/:id", (req, res, next) => {
    var sql = "select * from devices where id = ?";
    var params = [req.params.id];
    database.db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});
// app.post("/api/user/", (req, res, next) => {
//   var errors = [];
//   if (!req.body.password) {
//     errors.push("No password specified");
//   }
//   if (!req.body.email) {
//     errors.push("No email specified");
//   }
//   if (errors.length) {
//     res.status(400).json({ error: errors.join(",") });
//     return;
//   }
//   var data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: md5(req.body.password)
//   };
//   var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
//   var params = [data.name, data.email, data.password];
//   db.run(sql, params, function (err, result) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: data,
//       id: this.lastID
//     });
//   });
// });
// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
//handle incoming messages
mqtt.on("message", function (topic, message, packet) {
    //console.log("topic: ", topic, " - message: ", message.toString());
    database.insertOrUpdateDevice(topic, "TEST", message.toString());
    database.insertComponent(topic);
});
//# sourceMappingURL=server.js.map