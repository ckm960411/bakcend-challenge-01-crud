import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post/post.controller';
import { PostService } from '../post/post.service';
import { INestApplication } from '@nestjs/common';
import { Post } from 'src/post/post.entity';

describe('PostController', () => {
  let app: INestApplication;
  let controller: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();
    app = module.createNestApplication();

    await app.init();
    controller = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);

    postService.clearPosts();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /post', () => {
    it('Post 기본값을 반환합니다.', async () => {
      const response = await request(app.getHttpServer()).get('/post');
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /post', () => {
    it('Post를 생성합니다.', async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/post')
        .send({
          title: 'test title',
          content: 'test content',
        });

      const getResponse = await request(app.getHttpServer()).get('/post');

      const post: Post = {
        id: expect.any(Number),
        title: 'test title',
        content: 'test content',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      expect(postResponse.body).toEqual(post);
      expect(getResponse.body).toEqual([post]);
    });
  });

  describe('PATCH /post/:id', () => {
    it('Post를 업데이트합니다.', async () => {
      await request(app.getHttpServer()).post('/post').send({
        title: 'test title',
        content: 'test content',
      });

      const patchResponse = await request(app.getHttpServer())
        .patch('/post/1')
        .send({ content: 'updated content' });

      expect(patchResponse.body).toEqual({
        id: 1,
        title: 'test title',
        content: 'updated content',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      const getResponse = await request(app.getHttpServer()).get('/post');
      expect(getResponse.body).toEqual([
        {
          id: 1,
          title: 'test title',
          content: 'updated content',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });

  describe('DELETE /post/:id', () => {
    it('Post를 삭제합니다.', async () => {
      await request(app.getHttpServer()).post('/post').send({
        title: 'test title',
        content: 'test content',
      });

      const deleteResponse = await request(app.getHttpServer()).delete(
        '/post/1',
      );
      expect(deleteResponse.body).toEqual({ id: 1 });

      const getResponse = await request(app.getHttpServer()).get('/post');
      expect(getResponse.body).toEqual([]);
    });
  });
});
