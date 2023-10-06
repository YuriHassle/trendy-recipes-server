import { Type } from '@sinclair/typebox';
import BaseSchema from '../../../common/BaseSchema';

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

export type VideoType = typeof Video;
export type VideosType = typeof Videos;
export type VideoBodyAddType = typeof VideoBodyAdd;
export type VideoBodyUpdateType = typeof VideoBodyUpdate;

export default class VideoSchema extends BaseSchema<
  VideoType,
  VideosType,
  VideoBodyAddType,
  VideoBodyUpdateType
> {
  constructor() {
    super({
      replySingle: Video,
      replyAll: Videos,
      bodyAdd: VideoBodyAdd,
      bodyUpdate: VideoBodyUpdate,
    });
  }
}
