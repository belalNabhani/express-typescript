import { UsersRepository } from "./users";
import { PostsRepository } from "./posts";

interface IExtensions {
  users: UsersRepository;
  posts: PostsRepository;
}

export { IExtensions, UsersRepository, PostsRepository };
