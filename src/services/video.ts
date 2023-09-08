import {PrismaClient} from "@prisma/client";
import {ReturnEnum} from "../enums";
import {Video} from "../types/video";

export class VideoService {
  private model

  constructor() {
    this.model = new PrismaClient()
  }

  find = async (id: string) => {
    try {
      const video: Video = await this.model.video.findUnique({
        where: {
          id
        }
      })

      return video ? video : ReturnEnum.NOT_FOUND
    } catch {
      return ReturnEnum.ERROR
    }
  }

  create = async (data: Video) => {
    try {
      const {title, description, duration} = data

      await this.model.video.create({
        data: {
          title,
          description,
          duration,
        }
      })

      return ReturnEnum.OK
    } catch {
      return ReturnEnum.ERROR
    }
  }

  getAll = () => {
    try {
      return this.model.video.findMany()
    } catch {
      return ReturnEnum.ERROR
    }
  }

  update = async (id: string, data: Video) => {
    try {
      await this.model.video.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })

      return ReturnEnum.OK
    } catch {
      return ReturnEnum.ERROR
    }
  }

  delete = async (id: string) => {
    try {
      const video = await this.find(id);

      if (video === ReturnEnum.ERROR) {
        return ReturnEnum.ERROR
      }

      if (video === ReturnEnum.NOT_FOUND) {
        return ReturnEnum.NOT_FOUND
      }

      const videoDelete = async () => {
        await this.model.video.delete({
          where: {
            id
          }
        })
          .then((data) => {
            console.log("delete return:", data)
            return ReturnEnum.OK
          })
          .catch(() => {
            return ReturnEnum.ERROR
          })
      }

      return await videoDelete()
    } catch {
      return ReturnEnum.ERROR
    }
  }
}
