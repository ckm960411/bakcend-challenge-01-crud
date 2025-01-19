import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostRequest } from './dto/request/create-post.request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(): PostEntity[] {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() post: CreatePostRequest): PostEntity {
    return this.postService.createPost(post);
  }
}
