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
const returningFields: Array<keyof VideoType> = [
  'id',
  'active',
  'source',
  'url',
  'created_at',
  'updated_at',
];

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
      limit,
      offset,
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
    const payload = {
      source,
      url,
    };

    const video = await new VideoRepository().create({
      payload,
      returningFields,
    });

    reply.status(200).send(video[0]);
  }

  async update(
    request: FastifyRequest<DefaultRequest<VideoBodyUpdateType>>,
    reply: FastifyCustomReply<DefaultReply<VideoType | DefaultMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const { source, url } = request.body;
    const payload = {
      source,
      url,
    };
    const updatedVideo = await new VideoRepository().update({
      id: parsedId,
      payload,
      returningFields,
    });

    if (!updatedVideo.length) {
      reply.status(400).send({
        message: RM.notFound(entityName, parsedId),
      });
    }
    reply.status(200).send(updatedVideo[0]);
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
