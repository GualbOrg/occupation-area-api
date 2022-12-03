import { Injectable } from '@nestjs/common';
import { BusinessProfile } from '@prisma/client';
import { LinkouException } from '../../config/exception/linkou.exception';
import { PaginationArgs } from '../../utils/pagination';
import { PaginationHelper } from '../../utils/pagination/pagination.helper';
import { PrismaService } from '../../prisma.service';
import { OccupationErors } from './error/business-profile.error';
import { CreateBusinessProfileInput } from './model/business-profile.input';
import { BusinessProfileDto } from './model/business-profile.dto';

@Injectable()
export default class BusinessProfileService {
    constructor(private prisma: PrismaService) { }

    async getBusinessProfiles(paginationArgs: PaginationArgs) {
        const { skip, take } = paginationArgs;
        const totalCount = await this.prisma.businessProfile.count();

        const lastItem = await this.prisma.businessProfile.findMany({
            skip,
            take
        })

        const cursor = lastItem.pop();

        const businessProfile = await this.prisma.businessProfile.findMany({
            skip,
            take,
            cursor: {
                id: cursor?.id
            }

        })

        return PaginationHelper.paginate<BusinessProfile>(totalCount, businessProfile)

    }

    async createBusinessProfileService(
        createBusinessProfileInput: CreateBusinessProfileInput,
    ): Promise<BusinessProfileDto> {
        const { profileId } = createBusinessProfileInput;

        const existsBusinessProfile = await this.prisma.businessProfile.findFirst({
            where: { profileId },
        });

        if (existsBusinessProfile) throw new LinkouException(OccupationErors.OCCUPATION_CONFLICT);

        const createBusinessProfile = await this.prisma.businessProfile.create({
            data: {
                ...createBusinessProfileInput as BusinessProfile
            }
        }) as BusinessProfileDto

        return createBusinessProfile;
    }
    async findByProfileId(profileId: string): Promise<BusinessProfileDto> {
        return await this.prisma.businessProfile.findFirst({ where: { profileId } }) as BusinessProfileDto;
    }
}
