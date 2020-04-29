# Weinhandlung

Starten des Backends: 
-falls noch nicht vorhanden Docker Desktop installieren
-falls noch nicht vorhanden NPM installieren

mit der Shell/Bash in den Ordner Weinhandlung-Backend navigieren
-Docker Desktop starten
-Befehl `docker-compose up -d`ausführen
-Stoppen des Backends mit `docker-compose down -v`
-Initialisierung der Datenbank ist momentan noch manuell nötig
get Request auf http://localhost:3003/initializeDB 


Starten des Frontends:
mit der Shell in den Ordner Weinhandlung-Frontend navigieren
dependencies installieren: `npm -i`
electron app starten `npm start`