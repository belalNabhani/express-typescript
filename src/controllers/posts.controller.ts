import { Response, NextFunction, Request } from "express";
import createHttpError from "http-errors";
import { db } from "../db";
import { Post } from "../db/models";
import { createPostParamsType, IUserRequest } from "../types";

export const init = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  await db.posts.init();
  return res.sendStatus(200);
};
export const findAll = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts: Post[] = await db.posts.all();
    if (!posts) {
      throw new createHttpError.BadRequest("table not found");
    }
    return res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;

    const post: Post | null = await db.posts.findById(+postId);
    if (!post) {
      throw new createHttpError.BadRequest("Post not found!");
    }
    return res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};
export const create = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, published }: createPostParamsType = req.body;
    const user_id = req.user?.id as string;

    const post: Post | null = await db.posts.add(
      title,
      description,
      published,
      user_id
    );
    if (!post) {
      throw new createHttpError.BadRequest("Post not found!");
    }
    return res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};
