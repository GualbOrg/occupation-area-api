import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { OccupationAreaProfileResolver } from './occupation-area-profile.resolver';
import OccupationAreaProfileService from './occupation-area-profile.service';



@Module({

  providers: [OccupationAreaProfileResolver, OccupationAreaProfileService, PrismaService],
})
export class OccupationAreaProfileModule { }
