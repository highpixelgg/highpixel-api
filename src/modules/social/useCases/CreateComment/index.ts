import { Controller } from "core/infra/Controller";
import { PrismaCommentRepository } from "modules/social/repositories/implementations/PrismaCommentsRepository";
import { PrismaPostsRepository } from "modules/social/repositories/implementations/PrismaPostsRepository";
import { CreateComment } from "./CreateComment";
import { CreateCommentController } from "./CreateCommentController";

export function makeCreateComment(): Controller {
  const createCommentRepo = new PrismaCommentRepository();
  const repository = new PrismaPostsRepository(null, createCommentRepo);
  const useCase = new CreateComment(repository);
  const controller = new CreateCommentController(useCase);

  return controller;
}