import {sql} from "./db.js";

sql`DROP TABLE IF EXISTS videos;`.then(() => {
  console.log("Tabela apagada com sucesso!")
})

sql`
  CREATE TABLE videos
  (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  );
`.then((resp) => {
  console.log("Tabela criada com sucesso!", resp)
})