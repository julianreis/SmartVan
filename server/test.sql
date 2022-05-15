-- SQLite
-- SELECT name From components WHERE name = "Main/Licht_7D03DD"
-- WHERE d.name LIKE "%Main/Licht_7D03DD%"

INSERT INTO componentsMqtt (id_mqtt, id_component)
SELECT d.id, c.name FROM devices as d 
    LEFT JOIN components as c ON d.name LIKE "%Main/Licht_7D03DD%"
    WHERE d.name LIKE "%Main/Licht_7D03DD%"
    GROUP BY d.name


DROP TABLE componentsMqtt
