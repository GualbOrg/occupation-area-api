import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface IPaginatedType<T> {
  nodes: T[];
  totalCount?: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int, { nullable: true })
    totalCount?: number;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}