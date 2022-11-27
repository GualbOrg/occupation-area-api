import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { CreateOccupationAreaProfileInput } from './model/create-occupation-area-profile.input';
import {
  OccupationAreaProfileDto,
  PaginatedOccupationAreaProfileDto,
} from './model/occupation-area-profile.dto';
import OccupationAreaProfileService from './occupation-area-profile.service';
import { PaginationArgs } from '../../utils/pagination';
import { ProfileDto } from './model/profile.dto';


@Resolver(() => OccupationAreaProfileDto)
export class OccupationAreaProfileResolver {
  constructor(
    private readonly service: OccupationAreaProfileService
  ) { }

  @Query(() => PaginatedOccupationAreaProfileDto)
  async getOccupationAreaProfiles(
    @Args('paginationArgs') paginationArgs: PaginationArgs,
  ) {
    return this.service.getOccupationAreaProfiles(paginationArgs);
  }

  @Mutation(() => OccupationAreaProfileDto)
  async createOperationAreaProfile(
    @Args('createOccupationAreaProfileInput')
    createOccupationAreaInput: CreateOccupationAreaProfileInput,
  ): Promise<OccupationAreaProfileDto> {
    return await this.service.createOccupationAreaProfileService(
      createOccupationAreaInput,
    );
  }

  @ResolveField(() => ProfileDto)
  user(@Parent() orccupationArea: OccupationAreaProfileDto): any {
    return { __typename: 'ProfileDto', id: orccupationArea.profileId };
  }
}
