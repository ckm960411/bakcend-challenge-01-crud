import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
