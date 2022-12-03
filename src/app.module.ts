import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './config/auth/auth.module';
import { formatErrorConfig } from './config/exception/format-error.config'
import { ProfileDto } from './lambdas/business-profile/model/profile.dto';
import { BusinessProfileModule } from './lambdas/business-profile/business-profile.module';

type RequestType = { req: Request, res: Response }
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      formatError: formatErrorConfig,
      context: ({ req, res }: RequestType) => ({ req, res }),
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [ProfileDto],
      },
    }),
    AuthModule,
    BusinessProfileModule
  ]
})
export class AppModule { }
