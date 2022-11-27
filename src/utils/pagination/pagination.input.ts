import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";

@InputType()
export class PaginationArgs {
  @IsInt()
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int, { defaultValue: 10, nullable: true })
  take?: number;
}