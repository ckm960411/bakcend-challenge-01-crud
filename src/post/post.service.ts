import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostRequest } from './dto/request/create-post.request';

export const posts: Post[] = [];

@Injectable()
export class PostService {
  getPosts(): Post[] {
    return posts;
  }

  createPost({ title, content }: CreatePostRequest): Post {
    const post: Post = {
      id: posts.length + 1,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    posts.push(post);
    return post;
  }
}
