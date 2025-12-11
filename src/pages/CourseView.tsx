import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBook, FiClock, FiTarget, FiCheckCircle, FiPlayCircle, FiDownload } from 'react-icons/fi';
import { useCourse } from '../hooks/useCourses';
import { coursesApi } from '../services/api';

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function CourseView() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading, fetchCourse } = useCourse(courseId);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleExportPDF = async () => {
    if (!course || !courseId) return;
    
    setExporting(true);
    try {
      await coursesApi.exportPDF(courseId, course.title);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setExporting(false);
    }
  };

  if (loading || !course) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="h-8 w-24 skeleton rounded mb-8" />
        <div className="glass-card mb-8">
          <div className="h-8 w-3/4 skeleton rounded mb-4" />
          <div className="h-4 w-full skeleton rounded mb-2" />
          <div className="h-4 w-2/3 skeleton rounded" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card">
              <div className="h-6 w-1/2 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const completedCount = course.progress.completedLessons.length;
  const totalLessons = course.lessons.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-surface-400 hover:text-accent-400 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="btn-secondary flex items-center gap-2"
        >
          <FiDownload className={`w-4 h-4 ${exporting ? 'animate-bounce' : ''}`} />
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-8"
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
            <FiBook className="w-8 h-8 text-accent-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[course.difficulty]}`}>
                {course.difficulty}
              </span>
              <span className="text-surface-500 text-sm">{course.category}</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-surface-100 mb-3">
              {course.title}
            </h1>
            <p className="text-surface-400 text-lg mb-4">
              {course.description}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-surface-400">
                <FiBook className="w-4 h-4" />
                {totalLessons} lessons
              </span>
              <span className="flex items-center gap-2 text-surface-400">
                <FiClock className="w-4 h-4" />
                {course.totalEstimatedHours} hours
              </span>
              <span className="flex items-center gap-2 text-accent-400">
                <FiCheckCircle className="w-4 h-4" />
                {completedCount}/{totalLessons} completed
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-6 border-t border-surface-800">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-surface-400">Course Progress</span>
            <span className="text-accent-400 font-medium">{course.progress.percentComplete}%</span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="progress-fill"
              style={{ width: `${course.progress.percentComplete}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Learning Outcomes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiTarget className="w-5 h-5 text-accent-400" />
          <h2 className="font-display font-semibold text-xl text-surface-100">
            Learning Outcomes
          </h2>
        </div>
        <ul className="space-y-3">
          {course.learningOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-surface-300">{outcome}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Lessons List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-display font-semibold text-xl text-surface-100 mb-4">
          Course Content
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, index) => {
            const isCompleted = course.progress.completedLessons.includes(lesson.id);
            const isCurrent = course.progress.currentLessonId === lesson.id;

            return (
              <Link
                key={lesson.id}
                to={`/course/${course.courseId}/lesson/${lesson.id}`}
                className={`glass-card flex items-center gap-4 py-4 transition-all duration-200 ${
                  isCurrent ? 'border-accent-500/50 bg-accent-500/5' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-400'
                      : isCurrent
                      ? 'bg-accent-500/20 text-accent-400'
                      : 'bg-surface-800 text-surface-500'
                  }`}
                >
                  {isCompleted ? (
                    <FiCheckCircle className="w-5 h-5" />
                  ) : isCurrent ? (
                    <FiPlayCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-surface-100 truncate">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-surface-500">
                    <span>{lesson.estimatedMinutes} min</span>
                    <span>•</span>
                    <span>{lesson.keyConcepts.length} key concepts</span>
                  </div>
                </div>
                {isCurrent && (
                  <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-xs font-medium">
                    Continue
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

