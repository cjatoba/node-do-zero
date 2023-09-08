import {fastify} from "fastify"
import {DatabasePostgres} from "./database-postgres.js";

const server = fastify()

const database = new DatabasePostgres()

database.createTable()
  .then(() => {
    server.post("/videos", async (request, reply) => {
      const {title, description, duration} = request.body

      await database.create({
        title,
        description,
        duration
      })

      return reply.status(201).send()
    })

    server.get("/videos", async (request) => {
      const search = request.query.search

      return await database.list(search)
    })

    server.put("/videos/:id", async (request, reply) => {
      const videoId = request.params.id
      const videoData = request.body

      await database.update(videoId, videoData)

      return reply.status(204).send()
    })

    server.delete("/videos/:id", async (request, reply) => {
      const videoId = request.params.id

      const deleted = await database.delete(videoId)

      deleted ? reply.status(204).send() : reply.status(404).send()
    })

    const port = process.env.PORT ?? 3333

    server.listen({
      host: "0.0.0.0",
      port: port
    }).then(() => console.log(`Running in port ${port}`))

  })
  .catch((reason) => {
    console.error("Falha ao criar a tabela no banco de dados", reason)
  })

