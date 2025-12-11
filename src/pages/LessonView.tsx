import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiBookOpen,
  FiList,
  FiCheck,
} from 'react-icons/fi';
import { useCourse } from '../hooks/useCourses';
import { Lesson } from '../types';

export default function LessonView() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { course, loading, fetchCourse, markLessonComplete } = useCourse(courseId);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  useEffect(() => {
    if (course && lessonId) {
      const index = course.lessons.findIndex((l) => l.id === lessonId);
      if (index !== -1) {
        setCurrentLesson(course.lessons[index]);
        setLessonIndex(index);
      }
    }
  }, [course, lessonId]);

  const handleMarkComplete = async () => {
    if (lessonId) {
      await markLessonComplete(lessonId);
    }
  };

  const goToNextLesson = () => {
    if (course && lessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[lessonIndex + 1];
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    }
  };

  const goToPrevLesson = () => {
    if (course && lessonIndex > 0) {
      const prevLesson = course.lessons[lessonIndex - 1];
      navigate(`/course/${courseId}/lesson/${prevLesson.id}`);
    }
  };

  if (loading || !course || !currentLesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-6 w-32 skeleton rounded mb-8" />
        <div className="glass-card mb-8">
          <div className="h-8 w-2/3 skeleton rounded mb-4" />
          <div className="h-4 w-full skeleton rounded mb-2" />
          <div className="h-4 w-full skeleton rounded mb-2" />
          <div className="h-4 w-3/4 skeleton rounded" />
        </div>
      </div>
    );
  }

  const isCompleted = course.progress.completedLessons.includes(currentLesson.id);
  const hasNext = lessonIndex < course.lessons.length - 1;
  const hasPrev = lessonIndex > 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link
          to={`/course/${courseId}`}
          className="text-surface-400 hover:text-accent-400 transition-colors"
        >
          {course.title}
        </Link>
        <span className="text-surface-600">/</span>
        <span className="text-surface-300">Lesson {lessonIndex + 1}</span>
      </div>

      {/* Lesson Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center">
              <span className="font-bold text-accent-400">{lessonIndex + 1}</span>
            </div>
            <div>
              <p className="text-sm text-surface-500 mb-1">
                Lesson {lessonIndex + 1} of {course.lessons.length}
              </p>
              <h1 className="font-display font-bold text-2xl text-surface-100">
                {currentLesson.title}
              </h1>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm">
              <FiCheckCircle className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-surface-400">
          <span className="flex items-center gap-1.5">
            <FiBookOpen className="w-4 h-4" />
            {currentLesson.estimatedMinutes} min read
          </span>
          <span className="flex items-center gap-1.5">
            <FiList className="w-4 h-4" />
            {currentLesson.objectives.length} objectives
          </span>
        </div>
      </motion.div>

      {/* Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiTarget className="w-5 h-5 text-accent-400" />
          <h2 className="font-display font-semibold text-lg text-surface-100">
            Learning Objectives
          </h2>
        </div>
        <ul className="space-y-2">
          {currentLesson.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3 text-surface-300">
              <FiCheck className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
              {objective}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card mb-8"
      >
        <h2 className="font-display font-semibold text-lg text-surface-100 mb-4">
          Lesson Content
        </h2>
        <div className="prose prose-invert prose-surface max-w-none">
          {currentLesson.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-surface-300 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Key Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card mb-8"
      >
        <h2 className="font-display font-semibold text-lg text-surface-100 mb-4">
          Key Concepts
        </h2>
        <div className="flex flex-wrap gap-2">
          {currentLesson.keyConcepts.map((concept, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm"
            >
              {concept}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card mb-8 bg-gradient-to-br from-accent-500/5 to-transparent border-accent-500/20"
      >
        <h2 className="font-display font-semibold text-lg text-surface-100 mb-3">
          Summary
        </h2>
        <p className="text-surface-300 leading-relaxed">
          {currentLesson.summary}
        </p>
      </motion.div>

      {/* Navigation and Complete */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
      >
        <div className="flex gap-3 flex-1">
          <button
            onClick={goToPrevLesson}
            disabled={!hasPrev}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button
            onClick={goToNextLesson}
            disabled={!hasNext}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <button
            onClick={handleMarkComplete}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <FiCheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        ) : hasNext ? (
          <button
            onClick={goToNextLesson}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Continue to Next Lesson
            <FiArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <Link
            to={`/course/${courseId}`}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <FiCheckCircle className="w-5 h-5" />
            Course Complete!
          </Link>
        )}
      </motion.div>

      {/* Lesson Sidebar Navigator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="glass p-3 rounded-2xl">
          <p className="text-xs text-surface-500 mb-3 text-center">Lessons</p>
          <div className="space-y-2">
            {course.lessons.map((lesson, index) => {
              const isActive = lesson.id === currentLesson.id;
              const isDone = course.progress.completedLessons.includes(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/course/${courseId}/lesson/${lesson.id}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent-500 text-surface-950'
                      : isDone
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-surface-800 text-surface-400 hover:bg-surface-700'
                  }`}
                  title={lesson.title}
                >
                  {isDone && !isActive ? <FiCheck className="w-4 h-4" /> : index + 1}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

