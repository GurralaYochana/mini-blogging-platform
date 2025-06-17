import moment from "moment";

export const formatDate = (createdAt: string) => {
  return moment(createdAt).format("MMM Do, YYYY");
};
