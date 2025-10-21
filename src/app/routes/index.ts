import { Router } from 'express';
import { BannerRoutes } from '../modules/Banner/Banner.route';
import { OfferRouter } from '../modules/Offer/Package.route';
import { JudgesRouter } from '../modules/judgePannel/judge.route';
import { TimeInstructionRouter } from '../modules/timeInstruction/timeInstruction.route';
import { FaQRouter } from '../modules/FqA/faq.route';
import { UserRoutes } from '../modules/User/user.route';
import { EventRouter } from '../modules/events/event.route';
import { QuizRouter } from '../modules/quiz/quiz.route';
import { QuestionRouter } from '../modules/questions/questions.route';
import { ParticipationRouter } from '../modules/Participation/participation.route';
import { MessagingRouter } from '../modules/Messaging/messaging.route';

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  { path: '/banner', route: BannerRoutes },
  { path: '/offers', route: OfferRouter },
  { path: '/judge', route: JudgesRouter },
  { path: '/time-instruction', route: TimeInstructionRouter },
  { path: '/faq', route: FaQRouter },
  { path: '/auth', route: UserRoutes },

  { path: '/events', route: EventRouter },
  { path: '/quizzes', route: QuizRouter },
  { path: '/questions', route: QuestionRouter },
  { path: '/participations', route: ParticipationRouter },
  { path: '/messaging', route: MessagingRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
