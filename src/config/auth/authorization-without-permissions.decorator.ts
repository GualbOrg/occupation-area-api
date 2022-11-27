import { SetMetadata } from '@nestjs/common';

export const AUTHORIZATION_WITHOUT_PERMISSIONS = 'authorizationWithoutPermissions';
export const AuthotizationWithoutPermissions = () => SetMetadata(AUTHORIZATION_WITHOUT_PERMISSIONS, true);