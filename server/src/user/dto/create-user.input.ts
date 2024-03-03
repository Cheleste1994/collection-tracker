import { Prisma, User, Role } from 'prisma/generated/client/';
import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
