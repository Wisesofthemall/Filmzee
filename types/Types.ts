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
  localId: string;
  Bio: string;
  location: string;
  backgroundImg: string;
};

export type FirebaseUserType = {
  createdAt: string;
  displayName: string;
  email: string;
  localId: string;
  photoUrl: string;
};
export type ChatType = {
  show?: boolean;
  created_at: string;
  id: number;
  recepientEmail: string;
  recepientId: number;
  recepientLocalID: string;
  recepientName: string;
  recepientPhoto: string;
  recepientUniq: string;
  userId: string;
  roomId: string;
};

export type MemberType = {
  name: string;
  email: string;
  photoUrl: string;
  localId: string;
  uniq: string;
};
