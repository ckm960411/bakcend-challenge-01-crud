import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostRequest } from './dto/request/create-post.request';
import { UpdatePostRequest } from './dto/request/update-post.request';

export let posts: Post[] = [];

@Injectable()
export class PostService {
  clearPosts() {
    posts = [];
  }

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

  updatePost(id: number, body: UpdatePostRequest): Post {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.title = body.title ?? post.title;
    post.content = body.content ?? post.content;
    post.updatedAt = new Date();

    posts = posts.map((p) => (p.id === id ? post : p));

    return post;
  }

  deletePost(id: number): { id: number } {
    const found = posts.find((post) => post.id === id);

    if (!found) {
      throw new NotFoundException('Post not found');
    }

    posts = posts.filter((post) => post.id !== id);
    return { id };
  }
}
