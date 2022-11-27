
import { Directive, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../utils/pagination';
import { ProfileDto } from './profile.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class OccupationAreaProfileDto {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    profileId: string;

    @Field(() => String)
    occupation: Occupation;

    @Field(() => String)
    portfolio: string;

    @Field(() => Float)
    workValue: number;

    @Field(() => String)
    amountChargedBy: AmountChargedBy;

    @Field(() => ProfileDto)
    profile?: ProfileDto;
}

@ObjectType()
export class PaginatedOccupationAreaProfileDto extends Paginated(OccupationAreaProfileDto) { }

type Occupation = "REDACTOR" | "PROGRAMMER" | "SEO_ESPECIALIST" | "BUSINESS" | "SITES_OPTMIZATION" | "MARKETING"

type AmountChargedBy = "HOUR" | "DAY" | "MOUNTH" | "WORD"