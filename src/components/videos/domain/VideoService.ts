import { Static, TSchema } from '@sinclair/typebox';
import {
  BaseMessageType,
  BaseParamType,
  BaseQueryType,
  FastifyCustomReply,
} from '../../../common/BaseSchema';
import { FastifyRequest } from 'fastify';
import {
  VideoBodyAddType,
  VideoBodyUpdateType,
  VideoType,
  VideosType,
} from './VideoSchema';
import VideoRepository from '../data-access/VideoRepository';
import { serializeResponse } from '../../../common/serializer';
import RM from '../../../common/ResponseMessages';

interface VideoRequest<CustomBody extends TSchema = never> {
  Body: Static<CustomBody>;
  Params: Static<BaseParamType>;
  Querystring: Static<BaseQueryType>;
}

interface VideoReply<
  CustomReply extends TSchema,
  CustomBody extends TSchema = never,
> extends VideoRequest<CustomBody> {
  Reply: Static<CustomReply>;
}

const entityName = 'Video';

export default class VideoService {
  async findOne(
    request: FastifyRequest<VideoRequest>,
    reply: FastifyCustomReply<VideoReply<VideoType | BaseMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const video = await new VideoRepository().findById(parsedId);
    if (!video) {
      reply.status(400).send(
        serializeResponse<BaseMessageType>({
          message: RM.notFound(entityName, parsedId),
        }),
      );
    }
    reply.status(200).send(serializeResponse<VideoType>(video));
  }

  async findAll(
    request: FastifyRequest<VideoRequest>,
    reply: FastifyCustomReply<VideoReply<VideosType>>,
  ) {
    const { offset, orderBy, orderDirection, limit } = request.query;
    const videos = await new VideoRepository().findAll({
      limit: Number(limit),
      offset: Number(offset),
      orderBy,
      orderDirection,
    });
    reply.status(200).send(serializeResponse<VideosType>(videos));
  }

  async create(
    request: FastifyRequest<VideoRequest<VideoBodyAddType>>,
    reply: FastifyCustomReply<VideoReply<VideoType | BaseMessageType>>,
  ) {
    const { source, url } = request.body;
    const videoId = await new VideoRepository().create({
      source,
      url,
    });
    const newVideo = await new VideoRepository().findById(videoId[0]);
    reply.status(200).send(serializeResponse<VideoType>(newVideo));
  }

  async update(
    request: FastifyRequest<VideoRequest<VideoBodyUpdateType>>,
    reply: FastifyCustomReply<VideoReply<VideoType | BaseMessageType>>,
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
      reply.status(400).send(
        serializeResponse<BaseMessageType>({
          message: RM.notFound(entityName, parsedId),
        }),
      );
    }
    reply.status(200).send(serializeResponse<VideoType>(updatedVideo));
  }

  async delete(
    request: FastifyRequest<VideoRequest>,
    reply: FastifyCustomReply<VideoReply<BaseMessageType>>,
  ) {
    const { id } = request.params;
    const parsedId = Number(id);
    const isDeleted = await new VideoRepository().delete(parsedId);
    if (!isDeleted) {
      reply.status(400).send(
        serializeResponse<BaseMessageType>({
          message: RM.notFound(entityName, parsedId),
        }),
      );
    }
    reply.status(200).send(
      serializeResponse<BaseMessageType>({
        message: RM.delete(entityName, parsedId),
      }),
    );
  }
}
