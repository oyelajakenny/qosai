import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiZap, FiBook, FiTarget, FiClock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: FiZap,
    title: 'AI-Powered Generation',
    description: 'Leverage Amazon Bedrock to create comprehensive courses in seconds',
  },
  {
    icon: FiBook,
    title: 'Structured Learning',
    description: 'Well-organized lessons with objectives, content, and key concepts',
  },
  {
    icon: FiTarget,
    title: 'Custom Difficulty',
    description: 'Choose beginner, intermediate, or advanced to match your level',
  },
  {
    icon: FiClock,
    title: 'Track Progress',
    description: 'Save courses to your profile and continue learning anytime',
  },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface-950 bg-grid overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
                <span className="text-surface-950 font-bold text-xl">Q</span>
              </div>
              <span className="font-display font-bold text-2xl text-surface-100">
                QOS
              </span>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard" className="btn-primary flex items-center gap-2">
                  Go to Dashboard
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/login" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-8"
            >
              <FiZap className="w-4 h-4" />
              Powered by Amazon Bedrock AI
            </motion.div>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-surface-100 leading-tight mb-6">
              Create Learning Courses
              <br />
              <span className="gradient-text glow-text">In Seconds</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-surface-400 mb-10">
              Enter any subject, choose your difficulty level, and let AI generate 
              a complete, structured course with lessons, summaries, and learning outcomes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? "/create" : "/login"}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                Start Creating
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={user ? "/dashboard" : "/login"}
                className="btn-secondary text-lg px-8 py-4"
              >
                View My Courses
              </Link>
            </div>
          </motion.div>

          {/* Course Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="glass-card p-8 glow-accent">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
                  <FiBook className="w-8 h-8 text-accent-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-xs font-medium">
                      Intermediate
                    </span>
                    <span className="text-surface-500 text-sm">• 2.5 hours</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-surface-100 mb-2">
                    Introduction to Machine Learning
                  </h3>
                  <p className="text-surface-400 mb-4">
                    Master the fundamentals of ML including supervised learning, neural networks, 
                    and practical implementation with Python.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <span className="text-sm text-surface-400">35% complete</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-100 mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              Our AI generates comprehensive courses tailored to your learning goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-accent-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-surface-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-accent-950/20 to-surface-950" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-surface-100 mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-surface-400 text-lg mb-8">
              Create your first AI-generated course in less than a minute.
            </p>
            <Link
              to={user ? "/create" : "/login"}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              Create Your First Course
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <span className="text-surface-950 font-bold">Q</span>
              </div>
              <span className="font-display font-semibold text-surface-400">
                QOS Course Creator
              </span>
            </div>
            <p className="text-surface-500 text-sm">
              Powered by Amazon Bedrock
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

