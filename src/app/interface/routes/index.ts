import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { BannerRoutes } from '../modules/Banner/Banner.route';

import { OfferRouter } from '../modules/Offer/Package.route';
import { QuizDataRouter } from '../modules/quizData/quizData.route';
import { JudgesRouter } from '../modules/judgePannel/judge.route';
import { TimeInstructionRouter } from '../modules/timeInstruction/timeInstruction.route';
import { FaQRouter } from '../modules/FqA/faq.route';
import { EventRouter } from '../modules/events/event.route';
import { QuestionRoutes } from '../modules/questions/questions.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },

  {
    path: '/quiz-data',
    route: QuizDataRouter,
  },

  {
    path: '/offers',
    route: OfferRouter,
  },
  {
    path: '/judge',
    route: JudgesRouter,
  },
  {
    path: '/time-instruction',
    route: TimeInstructionRouter,
  },
  {
    path: '/faq',
    route: FaQRouter,
  },
  {
    path: '/events',
    route: EventRouter,
  },
  {
    path: '/questions',
    route: QuestionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
