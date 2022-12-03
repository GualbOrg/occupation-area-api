import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { BusinessProfileResolver } from './business-profile.resolver';
import BusinessProfileService from './business-profile.service';



@Module({

  providers: [BusinessProfileResolver, BusinessProfileService, PrismaService],
})
export class BusinessProfileModule { }
