
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Paginated } from '../../../utils/pagination';
import { ProfileDto } from './profile.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class BusinessProfileDto {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    profileId: string;

    @Field(() => String)
    portfolio: string;

    @Field(() => String)
    linkedin: string;

    @MaxLength(15)
    @Field(() => String)
    phoneNumber: string;

    @Field(() => ProfileDto)
    profile?: ProfileDto;
}

@ObjectType()
export class PaginatedBusinessProfileDto extends Paginated(BusinessProfileDto) { }