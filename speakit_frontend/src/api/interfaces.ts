export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  language: string;
  level: string;
  createdAt: Date;
  profileImg?: string;
  learnedTopics?: string[];
}

export interface Definition {
  id: string;
  word: string;
  description: string;
  level: string;
  topicId?: string;
}

export interface Topic {
  id: string;
  name: string;
  level: string;
  language: string;
  topicImg?: string;
}
