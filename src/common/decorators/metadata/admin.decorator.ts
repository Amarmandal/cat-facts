import { SetMetadata } from '@nestjs/common';

export const Admin = (isAdmin: boolean) => SetMetadata('admin', isAdmin);
