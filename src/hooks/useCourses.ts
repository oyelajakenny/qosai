import { useState, useCallback } from 'react';
import { Course, GenerateCourseInput } from '../types';
import { coursesApi } from '../services/api';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCourse = useCallback(async (input: GenerateCourseInput): Promise<Course | null> => {
    setLoading(true);
    setError(null);
    try {
      const course = await coursesApi.generateCourse(input);
      setCourses((prev) => [course, ...prev]);
      return course;
    } catch (err) {
      setError('Failed to generate course');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCourse = useCallback(async (courseId: string) => {
    try {
      await coursesApi.deleteCourse(courseId);
      setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
    } catch (err) {
      setError('Failed to delete course');
      console.error(err);
    }
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    generateCourse,
    deleteCourse,
  };
}

export function useCourse(courseId: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await coursesApi.getCourse(courseId);
      setCourse(data);
    } catch (err) {
      setError('Failed to fetch course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const markLessonComplete = useCallback(async (lessonId: string) => {
    if (!courseId) return;
    
    try {
      const updated = await coursesApi.markLessonComplete(courseId, lessonId);
      setCourse(updated);
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    }
  }, [courseId]);

  const updateProgress = useCallback(async (progress: Partial<Course['progress']>) => {
    if (!courseId) return;
    
    try {
      const updated = await coursesApi.updateProgress(courseId, progress);
      setCourse(updated);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  }, [courseId]);

  return {
    course,
    loading,
    error,
    fetchCourse,
    markLessonComplete,
    updateProgress,
  };
}

