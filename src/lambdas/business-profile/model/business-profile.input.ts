import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateBusinessProfileInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  profileId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @Field(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  portfolio: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => Float)
  linkedin: string;

}
