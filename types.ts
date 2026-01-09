
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  comments: Comment[];
  date: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  folder: 'inbox' | 'sent';
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  author: string;
  isPrivate: boolean;
}

export enum ProjectTab {
  OVERVIEW = 'overview',
  BLOG = 'blog',
  MEMORY_GAME = 'memory_game',
  MAIL_APP = 'mail_app',
  VIDEO_APP = 'video_app'
}
