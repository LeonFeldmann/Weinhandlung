# mariadb-backend
Starten des Backends funktioniert wie folgt:
-falls noch nicht vorhanden Docker Desktop installieren
-falls noch nicht vorhanden NPM installieren

in der Shell/Bash in diesen Ordner navigieren
-Docker Desktop starten
-Befehl `docker-compose up -d`ausführen
-Stoppen des Backends mit `docker-compose down -v`
-Initialisierung der Datenbank ist momentan noch nötig
get Request auf http://localhost:3003/initializeDB 

