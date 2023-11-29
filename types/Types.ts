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
  created_at: Date;
  uniq: string;
  name: string;
  email: string;
  photoUrl: string;
  localId: string;
  bio: string;
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
export type MessageType = {
  roomId: string;
  sender: FirebaseUserType;
  createdAt: any;
  text: string;
  image: string;
  edit: boolean;
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

export type FilmzType = {
  id: string;
  createdAt: any;
  image: string;
  likes: { [key: string]: string };
  sender: FirebaseUserType;
  senderId: string;
  text: string;
};

export type FirebaseMemberType = {
  email: string;
  localId: string;
  name: string;
  photoUrl: string;
  uniq: string;
};
