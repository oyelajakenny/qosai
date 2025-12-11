import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiBook, FiClock, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useCourses } from '../hooks/useCourses';
import { Course } from '../types';

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function CourseCard({ course, onDelete }: { course: Course; onDelete: (id: string) => void }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card group relative"
    >
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (confirm('Are you sure you want to delete this course?')) {
            onDelete(course.courseId);
          }
        }}
        className="absolute top-4 right-4 p-2 rounded-lg bg-surface-800/50 text-surface-500 
                   opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 
                   transition-all duration-200"
        title="Delete course"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>

      <Link to={`/course/${course.courseId}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
            <FiBook className="w-6 h-6 text-accent-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-3 py-0.6 rounded-full text-xs font-medium border ${difficultyColors[course.difficulty]}`}>
                {course.difficulty}
              </span>
            </div>
            <h3 className="font-display font-semibold text-lg text-surface-100 truncate pr-8">
              {course.title}
            </h3>
          </div>
        </div>

        <p className="text-surface-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-surface-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FiBook className="w-4 h-4" />
            {course.lessons.length} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4" />
            {course.totalEstimatedHours}h
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-surface-400">Progress</span>
            <span className="text-accent-400 font-medium">{course.progress.percentComplete}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.progress.percentComplete}%` }} 
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-surface-800">
          <span className="text-xs text-surface-500">
            Created {formatDate(course.createdAt)}
          </span>
          <span className="text-accent-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Continue
            <FiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 rounded-2xl bg-surface-800/50 border border-surface-700 flex items-center justify-center mx-auto mb-6">
        <FiBook className="w-10 h-10 text-surface-600" />
      </div>
      <h3 className="font-display font-semibold text-xl text-surface-300 mb-2">
        No courses yet
      </h3>
      <p className="text-surface-500 mb-6 max-w-md mx-auto">
        Create your first AI-generated course and start learning something new today
      </p>
      <Link to="/create" className="btn-primary inline-flex items-center gap-2">
        <FiPlus className="w-5 h-5" />
        Create Your First Course
      </Link>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl skeleton" />
            <div className="flex-1">
              <div className="h-4 w-20 skeleton rounded mb-2" />
              <div className="h-6 w-full skeleton rounded" />
            </div>
          </div>
          <div className="h-4 w-full skeleton rounded mb-2" />
          <div className="h-4 w-3/4 skeleton rounded mb-4" />
          <div className="h-2 w-full skeleton rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { courses, loading, fetchCourses, deleteCourse } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-surface-100 mb-2">
            My Courses
          </h1>
          <p className="text-surface-400">
            {courses.length > 0
              ? `You have ${courses.length} course${courses.length > 1 ? 's' : ''}`
              : 'Start your learning journey today'}
          </p>
        </div>
        <Link to="/create" className="btn-primary flex items-center gap-2">
          <FiPlus className="w-5 h-5" />
          <span className="hidden sm:inline">New Course</span>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              onDelete={deleteCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
}

