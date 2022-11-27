import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOccupationAreaProfileInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  profileId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  occupation: Occupation;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  portfolio: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  workValue: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  amountChargedBy: AmountChargedBy;


}
export type Occupation = "REDACTOR" | "PROGRAMMER" | "SEO_ESPECIALIST" | "BUSINESS" | "SITES_OPTMIZATION" | "MARKETING"

export type AmountChargedBy = "HOUR" | "DAY" | "MOUNTH" | "WORD"