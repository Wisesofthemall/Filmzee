export type VideoType = {
  id: number;
  title: string;
  description: string;
  tag: string;
  link: string;
  channelTitle: string;
  likes: number;
  bookmark: number;
};

export type UserType = {
  displayName?: string;
  id: number;
  createdAt: string;
  uniq: string;
  name: string;
  email: string;
  photoUrl: string;
};
