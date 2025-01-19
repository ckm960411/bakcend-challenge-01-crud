import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post/post.controller';
import { PostService } from '../post/post.service';
import { INestApplication } from '@nestjs/common';
import exp from 'constants';
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
});
