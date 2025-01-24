### Anforderungen

- Spieler registrieren sich mit einem Nutzernamen (keine Passwörter oder Sicherheitsüberprüfungen erforderlich).
- Spieler können einer Matchmaking-Warteschlange beitreten.
- Zwei Spieler werden automatisch miteinander verbunden, und eine Runde [Ultimate Tic-Tac-Toe](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe) startet.
- Ein Spieler beginnt mit dem ersten Zug; jeder Zug hat ein Zeitlimit von maximal 20 Sekunden.
- Nach dem Spiel (Sieg, Niederlage oder wenn ein Spieler die Verbindung verliert) kehren beide Spieler zur Startseite zurück.
- **Optional:** Ein Elo-System, das Spieler nach jeder Runde basierend auf ihrem Elo-Score auf- oder abwertet.

### Technische Anforderungen

- **Frontend:** Entwickelt mit Vue.js
- **Backend:** Implementiert in Node.js unter Verwendung von Fastify
- **Tests und Dokumentation:** Unterstützt durch Github Copilot und ChatGPT
