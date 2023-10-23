import {
  FastifyCustomReply,
  DefaultReply,
  DefaultRequest,
} from '../../../generators/BaseSchema';
import { FastifyRequest } from 'fastify';
import { VideoBodyAddType, VideoBodyUpdateType, VideoType } from './VideoSchema';
import VideoRepository from '../data-access/VideoRepository';
import RM from '../../../messages/ResponseMessages';
import { DefaultMessageType } from '../../../utils/schemas';

const entityName = 'Video';

export default class VideoService {
  async findOne(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<VideoType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const video = await new VideoRepository().findById(parsedId);
    if (!video) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(video);
  }

  async findAll(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<VideoType[]>>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const videos = await new VideoRepository().findAll({
      limit: Number(limit),
      offset: Number(offset),
      orderBy,
      orderDirection,
    });
    reply.status(200).send(videos);
  }

  async create(
    request: FastifyRequest<DefaultRequest<VideoBodyAddType>>,
    reply: FastifyCustomReply<DefaultReply<VideoType | DefaultMessageType>>,
  ) {
    const { source, url } = request.body;
    const videoId = await new VideoRepository().create({
      source,
      url,
    });
    const newVideo = await new VideoRepository().findById(videoId[0]);
    reply.status(200).send(newVideo);
  }

  async update(
    request: FastifyRequest<DefaultRequest<VideoBodyUpdateType>>,
    reply: FastifyCustomReply<DefaultReply<VideoType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { source, url } = request.body;
    await new VideoRepository().update(parsedId, {
      source,
      url,
    });
    const updatedVideo = await new VideoRepository().findById(parsedId);
    if (!updatedVideo) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(updatedVideo);
  }

  async delete(
    request: FastifyRequest<DefaultRequest>,
    reply: FastifyCustomReply<DefaultReply<DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const isDeleted = await new VideoRepository().delete(parsedId);
    if (!isDeleted) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send({
      message: RM.delete(entityName, parsedId),
    });
  }
}
