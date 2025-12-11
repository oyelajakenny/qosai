export interface User {
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github';
}

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  content: string;
  keyConcepts: string[];
  summary: string;
  estimatedMinutes: number;
}

export interface CourseProgress {
  completedLessons: string[];
  currentLessonId: string | null;
  percentComplete: number;
  lastAccessedAt: string;
}

export interface Course {
  courseId: string;
  userId: string;
  subject: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  lessons: Lesson[];
  learningOutcomes: string[];
  totalEstimatedHours: number;
  createdAt: string;
  updatedAt: string;
  progress: CourseProgress;
}

export interface GenerateCourseInput {
  subject: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

