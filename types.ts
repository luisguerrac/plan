export interface UserInputs {
  institution: string;
  teacher: string;
  date: string;
  academicYear: string;
  subject: string;
  grade: string;
  unitTitle: string;
  topic: string;
  needsAdaptation: boolean;
  educationalNeed: string;
  adaptationGrade: string;
}

export interface Skill {
  code: string;
  description: string;
}

export interface LearningActivities {
  representation: string[];
  expressionAndAction: string[];
  implication: string[];
}

export interface Evaluation {
  indicator: string;
  technique: string;
  instrument: string;
}

export interface WeeklyPlan {
  week: number;
  skill: Skill;
  learningActivities: LearningActivities;
  resources: string[];
  evaluation: Evaluation;
}

export interface CurricularAdaptation {
  educationalNeed: string;
  adaptationGrade: string;
  skillAdaptation: string;
  methodologyAdaptation: string[];
  resourceAdaptation: string[];
  evaluationAdaptation: string;
}

export interface LessonPlanData {
  institution: string;
  teacher: string;
  subject: string;
  grade: string;
  date: string;
  academicYear: string;
  unitNumber: number;
  unitTitle: string;
  unitObjective: string;
  evaluationCriteria: string;
  curricularInsertions: string[];
  weeklyPlans: WeeklyPlan[];
  curricularAdaptation?: CurricularAdaptation;
}