import { Tag } from "../tag/model";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

type UserProfile = {
  tags: Tag[];
} & User;

export type {
  User,
  UserProfile,
};
