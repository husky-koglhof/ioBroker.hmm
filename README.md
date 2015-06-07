# iobroker.hmm

## Dokumentation

Der Adapter Homematic-Manager (kurz iobroker.hmm) bindet die Homematic Manager Web-Schnittstelle von
hobbyquaker (https://github.com/hobbyquaker/homematic-manager/) ein.

### Installation

* iobroker.hmm wird mittels npm install iobroker.hmm im Root Verzeichnis des ioBroker installiert.
* In diesem Zuge wird der Homematic-Manager heruntergeladen.
* Web Interface ist unter http://ip:8090 erreichbar

### Konfiguration

* Die Einstellungen des Adapters müssen bei der Erstinstallation geöffnet, überprüft und gespeichert werden.
* In diesem Zuge werden automatisch alle vorhandenen hm-rpc Adapter eingebunden und konfiguriert.
* Hierbei wird die config.json für den Homematic-Manager geschrieben.

## Todo

* Doku, Doku, Doku
* Englische Übersetzung
* Russische Übersetzung
* locallink ip in Übersicht dynamisch verändern

## Changelog

### 0.1.0
* (husky-koglhof) Paket Abhängigkeit für homematic-manager angepasst

### 0.0.17 
* (husky-koglhof) Datastore Path und Language korrigiert

### 0.0.16
* (bluefox) kleine anpassungen

### 0.0.14
* (husky-koglhof) keywords hinzugefügt

### 0.0.11
* (husky-koglhof) npm Upload, Versionsabgleich

### 0.0.9
* (husky-koglhof) npm install Script für homematic-manager Auto Installation

### 0.0.8
* (husky-koglhof) Korrektur Author, Lizenz

### 0.0.7
* (husky-koglhof) Anpassungen in package.json und io-package.json
* (husky-koglhof) Hinzufügen der Lizenz und Readme.md
* (husky-koglhof) Hinzufügen der beiden PullRequests
    add dependency for homematic-manager (GermanBluefox)
    Change module name of homematicmanager (GermanBluefox)

### 0.0.6
* (versteckt) initial Release

## Lizenz

Copyright (c) 2015 husky-koglhof

[CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)


Der obige Urheberrechtsvermerk ist in allen Kopien oder Teilkopien der Software beizulegen.

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ODER EINEM BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHRÄNKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE HAFTBAR ZU MACHEN, OB INFOLGE DER ERFÜLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.

HomeMatic und BidCoS sind eingetragene Warenzeichen der [eQ-3 AG](http://eq-3.de)