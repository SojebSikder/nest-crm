import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';

@Injectable()
export class HasPlanGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const tenantSubscriptionDetails =
        await UserRepository.getSubscriptionDetails(req.user.userId);

      if (tenantSubscriptionDetails) {
        return true;
      } else {
        throw new ForbiddenException('Access denied');
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
