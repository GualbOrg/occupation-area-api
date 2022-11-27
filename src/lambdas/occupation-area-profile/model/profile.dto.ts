import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { OccupationAreaProfileDto } from './occupation-area-profile.dto';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ProfileDto {

    @Field(() => ID)
    @Directive('@external')
    id: string;


    @Field(() => OccupationAreaProfileDto, { nullable: true })
    occupationAreaProfile?: OccupationAreaProfileDto


}
