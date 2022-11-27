import { Injectable } from '@nestjs/common';
import { OccupationAreaProfile } from '@prisma/client';
import { LinkouException } from '../../config/exception/linkou.exception';
import { PaginationArgs } from '../../utils/pagination';
import { PaginationHelper } from '../../utils/pagination/pagination.helper';
import { PrismaService } from '../../prisma.service';
import { OccupationErors } from './error/occupation-area-profile.error';
import { CreateOccupationAreaProfileInput } from './model/create-occupation-area-profile.input';
import { OccupationAreaProfileDto } from './model/occupation-area-profile.dto';

@Injectable()
export default class OccupationAreaProfileService {
    constructor(private prisma: PrismaService) { }

    async getOccupationAreaProfiles(paginationArgs: PaginationArgs) {
        const { skip, take } = paginationArgs;
        const totalCount = await this.prisma.occupationAreaProfile.count();

        const lastItem = await this.prisma.occupationAreaProfile.findMany({
            skip,
            take
        })

        const cursor = lastItem.pop();

        const occupationAreaProfile = await this.prisma.occupationAreaProfile.findMany({
            skip,
            take,
            cursor: {
                id: cursor?.id
            }

        })

        return PaginationHelper.paginate<OccupationAreaProfile>(totalCount, occupationAreaProfile)

    }

    async createOccupationAreaProfileService(
        occupationProfileInput: CreateOccupationAreaProfileInput,
    ): Promise<OccupationAreaProfileDto> {
        const { profileId } = occupationProfileInput;

        const existsOccupation = await this.prisma.occupationAreaProfile.findFirst({
            where: { profileId },
        });

        if (existsOccupation) throw new LinkouException(OccupationErors.OCCUPATION_CONFLICT);

        const createOccupationAreaProfile = await this.prisma.occupationAreaProfile.create({
            data: {
                ...occupationProfileInput as OccupationAreaProfile
            }
        }) as OccupationAreaProfileDto

        return createOccupationAreaProfile;
    }
    async findByProfileId(profileId: string): Promise<OccupationAreaProfileDto> {
        return await this.prisma.occupationAreaProfile.findFirst({ where: { profileId } }) as OccupationAreaProfileDto;
    }
}
