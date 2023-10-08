enum VideoSource {
  tiktok = 'tiktok',
}

export interface Video {
  id: number;
  url: string;
  source: VideoSource;
  active: boolean;
  created_at: string;
  updated_at: string;
}
