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
- TBD
