import {fastify} from "fastify"
import {z} from "zod";
import {ReturnEnum} from "./enums"
import {VideoService} from "./services/video";

const app = fastify()

const videoService = new VideoService()

app.post("/videos", async (request, reply) => {
  const createVideoSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const {title, description, duration} = createVideoSchema.parse(request.body)

  const created = await videoService.create({title, description, duration})

  if (created === ReturnEnum.ERROR) {
    return reply.status(500).send()
  }

  return reply.status(201).send()
})

app.get("/videos", async () => {
  return await videoService.getAll()
})

app.put("/videos/:id", async (request, reply) => {
  const videoIdSchema = z.object({
    id: z.string()
  })
  const createVideoDataSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const {id} = videoIdSchema.parse(request.params)
  const {title, description, duration} = createVideoDataSchema.parse(request.body)

  const updated = await videoService.update(id, {title, description, duration})

  if (updated === ReturnEnum.ERROR) {
    reply.status(500).send()
  }

  return reply.status(204).send()
})

app.delete("/videos/:id", async (request, reply) => {
  const videoIdSchema = z.object({
    id: z.string()
  })
  const {id} = videoIdSchema.parse(request.params)

  const deleted = await videoService.delete(id)

  if (deleted === ReturnEnum.NOT_FOUND) {
    reply.status(404).send()
  }

  if (deleted === ReturnEnum.ERROR) {
    reply.status(500).send()
  }

  return reply.status(204).send()
})

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Http server running")
})