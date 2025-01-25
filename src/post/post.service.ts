import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostRequest } from './dto/request/create-post.request';
import { UpdatePostRequest } from './dto/request/update-post.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postRepository.find();

    return posts;
  }

  async createPost({ title, content }: CreatePostRequest): Promise<Post> {
    if (!title || !content) {
      throw new BadRequestException('제목과 본문은 필수 입력사항입니다.');
    }

    const post: Post = await this.postRepository.save({
      title,
      content,
    });

    return post;
  }

  async updatePost(id: number, body: UpdatePostRequest): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const updatedPost = {
      ...post,
      title: body.title ?? post.title,
      content: body.content ?? post.content,
    };

    await this.postRepository.update(id, {
      title: updatedPost.title,
      content: updatedPost.content,
    });

    return updatedPost;
  }

  async deletePost(id: number): Promise<{ id: number }> {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.delete(id);
    return { id };
  }
}
