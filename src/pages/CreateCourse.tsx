import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiLayers, FiTarget, FiArrowRight, FiArrowLeft, FiLoader, FiZap } from 'react-icons/fi';
import { useCourses } from '../hooks/useCourses';
import { GenerateCourseInput } from '../types';

const categories = [
  'Technology',
  'Business',
  'Science',
  'Arts',
  'Health',
  'Language',
  'Mathematics',
  'History',
  'Programming',
];

const difficulties = [
  {
    value: "beginner",
    label: "Beginner",
    description: "No prior knowledge required",
    color:  "from-green-500/20 to-green-600/20 border-green-500/30 text-surface-700",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Some foundational knowledge needed",
    color:"from-amber-500/20 to-amber-600/20 border-amber-500/30 text-surface-700",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Requires solid understanding",
    color: "from-red-500/20 to-red-600/20 border-red-500/30 text-surface-700",
  },
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const { generateCourse, loading } = useCourses();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<GenerateCourseInput>({
    subject: '',
    category: '',
    difficulty: 'beginner',
  });

  const handleSubmit = async () => {
    const course = await generateCourse(formData);
    if (course) {
      navigate(`/course/${course.courseId}`);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.subject.trim().length >= 3;
      case 2:
        return formData.category !== '';
      case 3:
        return true; // difficulty is always set (initialized to 'beginner')
      default:
        return false;
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex items-center ${s < 3 ? 'flex-1 max-w-[120px]' : ''}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                s <= step
                  ? 'bg-gradient-to-br from-accent-400 to-accent-600 text-surface-950'
                  : 'bg-surface-800 text-surface-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  s < step ? 'bg-accent-500' : 'bg-surface-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Subject */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center">
                <FiBook className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-surface-100">
                  What do you want to learn?
                </h2>
                <p className="text-surface-400">
                  Enter the subject or topic for your course
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="label">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Machine Learning, Photography, Spanish"
                className="input-field text-lg"
                autoFocus
              />
              <p className="text-sm text-surface-500 mt-2">
                Be specific for better results. For example, "React Hooks" instead of just "React"
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceed()}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Continue
              <FiArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Category */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center">
                <FiLayers className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-surface-100">
                  Choose a category
                </h2>
                <p className="text-surface-900">
                  Select the category that best fits "{formData.subject}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    formData.category === cat
                      ? 'bg-accent-500/20 border-accent-500 text-black'
                      : 'bg-surface-800/50 border-surface-700 text-surface-600 hover:border-surface-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex items-center gap-2"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceed()}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                Continue
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Difficulty */}
        {step === 3 && !loading && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center">
                <FiTarget className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-surface-100">
                  Select difficulty level
                </h2>
                <p className="text-surface-900">
                  Choose the level that matches your current knowledge
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setFormData({ ...formData, difficulty: diff.value as any })}
                  className={`w-full px-5 py-4 rounded-xl border text-left transition-all duration-200 ${
                    formData.difficulty === diff.value
                      ? `bg-gradient-to-r ${diff.color}`
                      : 'bg-surface-800/50 border-surface-700 hover:border-surface-600'
                  }`}
                >
                  <div className="font-semibold text-surface-950">{diff.label}</div>
                  <div className="text-sm text-surface-900">{diff.description}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary flex items-center gap-2"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <FiZap className="w-5 h-5" />
                Generate Course
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-2 border-accent-500/30 border-t-accent-500 mx-auto mb-6"
            />
            <FiZap className="w-16 h-16 text-accent-500 mx-auto mb-6" />
            <h3 className="font-display font-bold text-xl text-surface-100 mb-2">
              Creating your course...
            </h3>
            <p className="text-surface-400 mb-6">
              AI is generating lessons, objectives, and learning outcomes
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-surface-500">
              <FiLoader className="w-4 h-4 animate-spin" />
              This usually takes 15-30 seconds
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Course Preview */}
      {!loading && (
        <div className="mt-8 p-6 rounded-2xl border border-dashed border-surface-700 bg-surface-900/30">
          <h4 className="font-medium text-surface-400 mb-4">Course Preview</h4>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 text-sm">
              <strong>Subject:</strong> {formData.subject || '—'}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 text-sm">
              <strong>Category:</strong> {formData.category || '—'}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 text-sm">
              <strong>Difficulty:</strong> {formData.difficulty}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

