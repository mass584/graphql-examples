import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
