import { api } from "../index";

export default {
  allTopics: () => api.get("/topics"),
  topicDefinitionsById: (id: string) => api.get(`/topics/definitions/${id}`),
  getTopic: (id: string) => api.get(`/topics/${id}`),
  deleteTopic: (id: string) => api.delete(`/topics/${id}`),
};
