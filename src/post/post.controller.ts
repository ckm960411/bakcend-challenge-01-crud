import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostRequest } from './dto/request/create-post.request';
import { UpdatePostRequest } from './dto/request/update-post.request';

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

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: UpdatePostRequest,
  ): PostEntity {
    return this.postService.updatePost(id, post);
  }
}
