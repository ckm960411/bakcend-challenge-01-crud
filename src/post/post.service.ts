import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

const posts: Post[] = [];

@Injectable()
export class PostService {
  getPosts() {
    return posts;
  }
}
