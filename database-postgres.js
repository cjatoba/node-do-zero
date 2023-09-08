import {sql} from "./db.js";
import {randomUUID} from "node:crypto";

export class DatabasePostgres {

  async createTable() {
    await sql`
      CREATE TABLE IF NOT EXISTS videos
      (
        id
        TEXT
        PRIMARY
        KEY,
        title
        TEXT,
        description
        TEXT,
        duration
        INTEGER
      );
    `
  }

  async list(search = "") {
    return await sql`SELECT *
                     FROM videos
                     WHERE title ILIKE ${'%' + search + '%'};`
  }

  async create(video) {
    const videoId = randomUUID()
    const {title, description, duration} = video

    await sql`INSERT INTO videos (id, title, description, duration)
              VALUES (${videoId}, ${title}, ${description}, ${duration});`
  }

  async update(id, video) {
    const {title, description, duration} = video

    await sql`UPDATE videos
              SET title       = ${title},
                  description = ${description},
                  duration    = ${duration}
              WHERE id = ${id};`
  }

  async delete(id) {
    console.log(id)
    await sql`DELETE
              FROM videos
              WHERE id =
                    ${id};`
  }
}