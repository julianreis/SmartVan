# 🚐💡 SmartVan
Idee
Eine Kleine Application um MQTT Devices Simple auf einem Rasperry frei konfigurieren zu können.

Hierzu soll es einen node Server für den 24/7 Betrieb geben der den Aktuellen Status der MQTT devices hält und bei änderungen und Updates sich aktualisert.

Der andere Teil ist eine React JS web app welche sich lokal mit dem Node Server verbindet und sich hierdrüber die verschiedenen geräte konfigurieren und anzeigen lassen.


# Install
  Als erstes müssen alle nötigen dependencies installiert werden, dazu
    `npm run install:server`
und
  `npm run install:ui`
ausführen

# Ui oder Server starten
`npm run start:ui` oder 
    `npm run start:server`


# Aktueller Stand
## UI
- Dasboard angelegt
- Settings Seite
- erste (groben) Komponenten
  - Komponenten können direkt MQTT befehle absenden

## Server
- Verbindung zum MQTT Server Aufbauen 
- SQLite DB anlegen
- Neue Geräte werden in der DB angelegt
- Status Update wird in die DB geschrieben

# TODO's
## UI
- Verbindung zum Node Server
- Anzeige von Status aus der DB
- Steuerung der MQTT Geräte
- Einstellungsseite
  - Zuordnen der Geräte zu Räumen
  - 


## Server
### Ablauf
- MQTT Nachricht wird empfangen
- Es wird für jeden Topic ein eintrag in der Device Tabelle gemacht mit dem Aktuellen Status, dem Typen, sowie dem datum / uhrzeit des letzten eintrags
- Anschließend wird die Komponente Angelegt
- Es wird der Name (Analysiert)
- Es wird mit dem Namen ein eintrag in die Components Tabelle angelegt
- Anschließend wird ein eintrag in die Mapping Tabelle "MqttComponents" engelegt.
  - Idee dahinter ist, ein Gerät hat mehrere Topics auf dem es sendet, /Main/Licht/Status /Main/Licht/setState /Main/Lich/getState ...
  - In der Tabelle Components soll eine Übersicht der Konkreten Komponente angelegt sein
  - in devices alle Schnittstellen die zu einer Komponente gehören
  - In der Tabelle componentsMqtt ist die beziehung zwischen den components und dem Devices

