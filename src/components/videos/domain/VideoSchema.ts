import { Static, Type } from '@sinclair/typebox';
import BaseSchema from '../../../generators/BaseSchema';

enum VideoSource {
  tiktok = 'tiktok',
}

export const Video = Type.Object({
  id: Type.Number(),
  url: Type.String(),
  source: Type.Enum(VideoSource),
  active: Type.Boolean(),
  created_at: Type.String(),
  updated_at: Type.String(),
});

export const Videos = Type.Array(Video);

export const VideoBodyAdd = Type.Object({
  url: Type.String(),
  source: Type.Enum(VideoSource),
});

export const VideoBodyUpdate = Type.Object({
  url: Type.Optional(Type.String()),
  source: Type.Optional(Type.Enum(VideoSource)),
});

export type VideoType = Static<typeof Video>;
export type VideoBodyAddType = Static<typeof VideoBodyAdd>;
export type VideoBodyUpdateType = Static<typeof VideoBodyUpdate>;

export default class VideoSchema extends BaseSchema<
  typeof Video,
  typeof Videos,
  typeof VideoBodyAdd,
  typeof VideoBodyUpdate
> {
  constructor() {
    super({
      replySingle: Video,
      replyMany: Videos,
      bodyAdd: VideoBodyAdd,
      bodyUpdate: VideoBodyUpdate,
    });
  }
}
