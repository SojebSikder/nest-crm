import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DateHelper } from 'src/common/helper/date.helper';
import { UserRepository } from '../../repository/user/user.repository';

@Injectable()
export class HasPlanGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const user_id = req.user.userId;
      const userDetails = await UserRepository.getUserDetails({
        userId: user_id,
      });

      // check if trial has expired
      if (String(userDetails.tenant.trial_end_at) < DateHelper.now()) {
        const tenantSubscriptionDetails =
          await UserRepository.getSubscriptionDetails(user_id);

        if (tenantSubscriptionDetails) {
          return true;
        } else {
          throw new ForbiddenException('Access denied');
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
