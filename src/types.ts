export type AspectRatio = "1:1" | "9:16" | "16:9";

export type PosterThemeId = "royal-gold" | "emerald-tech" | "amethyst-rose" | "executive-dark";

export interface PosterTheme {
  id: PosterThemeId;
  name: string;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
}

export interface JobDetails {
  title: string;
  subtitle: string;
  companyName: string;
  establishedYear: number;
  locations: string[];
  workType: string;
  experienceLevel: string;
  genderTarget: string;
  ageLimit: string;
  perks: string[];
  requirements: string[];
  smartApplicationText: string;
  contactChannels: {
    whatsapp: string;
    email: string;
    googleMeet: boolean;
  };
  hashtags: string[];
}

export interface ApplicantSubmission {
  id: string;
  candidateName: string;
  city: "الإسكندرية" | "كفر الدوار" | "أخرى";
  phone: string;
  email: string;
  pitchText: string;
  score?: number;
  verdict?: string;
  status: "new" | "shortlisted" | "interviewed" | "hired";
  submittedAt: string;
  aiNotes?: string;
  meetLink?: string;
}

export interface GeneratedCopy {
  platform: string;
  headline: string;
  formattedPost: string;
  callToAction: string;
  keyTips: string[];
}

export interface PitchEvaluationResult {
  overallScore: number;
  verdict: string;
  criteria: {
    persuasiveness: number;
    marketingSense: number;
    professionalism: number;
    clarity: number;
  };
  strengths: string[];
  improvementTips: string[];
  recommendedInterviewQuestion: string;
  encouragementMessage: string;
}
