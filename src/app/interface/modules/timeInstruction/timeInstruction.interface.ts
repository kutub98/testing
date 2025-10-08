export type QuizInfoSection = {
  title: string;
  points: string[];
  bgColor?: string;
  textColor?: string;
};

export type IQuizTimelineAndInstructionsType = {
  timeline: QuizInfoSection;
  instructions: QuizInfoSection;
};
