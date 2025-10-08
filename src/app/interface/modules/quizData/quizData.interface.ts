export interface QuizInfo {
  title: string;
  description: string;
}

export interface CompetitionDetails {
  title: string;
  description: string;
  icon: string;
}

export interface Rules {
  title: string;
  items: string[];
}

export interface IQuizData {
  quizInfo: QuizInfo;
  competitionDetails: CompetitionDetails;
  rules: Rules;
}
