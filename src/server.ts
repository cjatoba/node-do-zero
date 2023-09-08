import {fastify} from "fastify"
import {z} from "zod";
import {PrismaClient} from "@prisma/client"

const app = fastify()

const prisma = new PrismaClient()

app.post("/videos", async (request, reply) => {
  const createVideoSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const {title, description, duration} = createVideoSchema.parse(request.body)

  await prisma.video.create({
    data: {
      title,
      description,
      duration,
    }
  })
  return reply.status(201).send()
})

app.get("/videos", async () => {
  const videos = await prisma.video.findMany()

  return {videos}
})

app.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id
  const createVideoSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const {title, description, duration} = createVideoSchema.parse(request.body)

  await prisma.video.update({
    where: {
      id: videoId
    },
    data: {
      title,
      description,
      duration,
    }
  })

  return reply.status(204).send()
})

app.delete("/videos/:id", async (request, reply) => {
  const videoIdSchema = z.object({
    id: z.string()
  })
  const {id} = videoIdSchema.parse(request.params)

  const deleted = await prisma.video.delete({
    where: {
      id: id
    }
  })

  deleted ? reply.status(204).send() : reply.status(404).send()
})

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("Http server running")
})