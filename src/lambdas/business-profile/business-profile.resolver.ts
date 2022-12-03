import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { CreateBusinessProfileInput } from './model/business-profile.input';
import {
  BusinessProfileDto,
  PaginatedBusinessProfileDto,
} from './model/business-profile.dto';
import BusinessProfileService from './business-profile.service';
import { PaginationArgs } from '../../utils/pagination';
import { ProfileDto } from './model/profile.dto';


@Resolver(() => BusinessProfileDto)
export class BusinessProfileResolver {
  constructor(
    private readonly service: BusinessProfileService
  ) { }

  @Query(() => PaginatedBusinessProfileDto)
  async getBusinessProfiles(
    @Args('paginationArgs') paginationArgs: PaginationArgs,
  ) {
    return this.service.getBusinessProfiles(paginationArgs);
  }

  @Mutation(() => BusinessProfileDto)
  async createBusinessProfile(
    @Args('createBusinessProfileInput')
    createBusinessProfileInput: CreateBusinessProfileInput,
  ): Promise<CreateBusinessProfileInput> {
    return await this.service.createBusinessProfileService(
      createBusinessProfileInput,
    );
  }

  @ResolveField(() => ProfileDto)
  user(@Parent() businessProfile: BusinessProfileDto): any {
    return { __typename: 'ProfileDto', id: businessProfile.profileId };
  }
}
