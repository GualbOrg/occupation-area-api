import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { BusinessProfileDto } from './business-profile.dto';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ProfileDto {

    @Field(() => ID)
    @Directive('@external')
    id: string;


    @Field(() => BusinessProfileDto, { nullable: true })
    businessProfile?: BusinessProfileDto


}
