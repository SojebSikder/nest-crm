import { HasPlanMiddleware } from './has-plan.middleware';

describe('HasPlanMiddleware', () => {
  it('should be defined', () => {
    expect(new HasPlanMiddleware()).toBeDefined();
  });
});
