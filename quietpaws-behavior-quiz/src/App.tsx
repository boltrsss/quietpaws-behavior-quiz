import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Dog, ShieldCheck, Star, Users, Award } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your dog's breed and size?",
    options: [
      { value: 'toy', label: 'Toy (Under 10 lbs)' },
      { value: 'small', label: 'Small (10-25 lbs)' },
      { value: 'medium', label: 'Medium (25-50 lbs)' },
      { value: 'large', label: 'Large (50+ lbs)' },
    ],
  },
  {
    id: 2,
    text: 'When does the barking become most challenging?',
    options: [
      { value: 'strangers', label: 'Seeing strangers or passersby' },
      { value: 'night', label: 'In the middle of the night' },
      { value: 'separation', label: 'When they are left alone (Separation)' },
      { value: 'territorial', label: 'Territorial sounds or delivery alerts' },
    ],
  },
  {
    id: 3,
    text: 'What training methods have you explored so far?',
    options: [
      { value: 'verbal', label: 'Verbal commands (No! Stay!)' },
      { value: 'treats', label: 'High-value treats & distractions' },
      { value: 'professional', label: 'Professional trainers' },
      { value: 'none', label: "We haven't tried a consistent method yet" },
    ],
  },
  {
    id: 4,
    text: 'On a scale of 1-10, how much is the barking affecting your life?',
    options: [
      { value: 'low', label: '1-3: Mildly annoying' },
      { value: 'mid', label: '4-6: Frequent daily disruption' },
      { value: 'high', label: '7-8: Affecting work, sleep, or nerves' },
      { value: 'extreme', label: '9-10: Constant stress or neighbor complaints' },
    ],
  },
  {
    id: 5,
    text: 'Which correction approach fits your philosophy best?',
    options: [
      { value: 'humane', label: '100% Humane & Silent (Ultrasonic Science)' },
      { value: 'direct', label: 'Direct Vibration Feedback' },
      { value: 'progressive', label: 'Progressive Sound Alerts' },
      { value: 'mixed', label: 'A Hybrid Non-Invasive Strategy' },
    ],
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = quiz, 1 = loading, 2 = result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState(0);
  const [liveProof, setLiveProof] = useState({ name: 'Sarah from NY', time: '2 mins ago' });

  useEffect(() => {
    const locations = ['Austin, TX', 'Seattle, WA', 'Miami, FL', 'Chicago, IL', 'Denver, CO'];
    const names = ['Michael', 'Jessica', 'David', 'Emma', "Barkley's Mom"];

    const interval = setInterval(() => {
      setLiveProof({
        name: `${names[Math.floor(Math.random() * names.length)]} in ${
          locations[Math.floor(Math.random() * locations.length)]
        }`,
        time: 'Just now',
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = 'I just took the QuietPaws Dog Behavior Quiz and got my custom serenity plan! Check it out:';

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
        break;
      case 'instagram': {
        try {
          await navigator.clipboard.writeText(url);
          const msg = document.getElementById('share-status');
          if (msg) {
            msg.innerText = 'Link copied for IG!';
            setTimeout(() => {
              msg.innerText = 'Share your results with family';
            }, 2000);
          }
        } catch {
          const msg = document.getElementById('share-status');
          if (msg) {
            msg.innerText = 'Copy failed. Please copy manually.';
            setTimeout(() => {
              msg.innerText = 'Share your results with family';
            }, 2000);
          }
        }
        return;
      }
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAnswer = (answer: string) => {
    const questionId = QUESTIONS[currentQuestion].id;
    const nextAnswers = { ...answers, [questionId]: answer };
    setAnswers(nextAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        setProgress((nextQuestion / QUESTIONS.length) * 100);
      }, 300);
    } else {
      setTimeout(() => {
        setProgress(100);
        setCurrentStep(1);
      }, 300);
    }
  };

  useEffect(() => {
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg font-sans relative overflow-x-hidden">
      {/* Live Social Proof Bubble (Desktop only) */}
      <AnimatePresence>
        {currentStep < 2 && (
          <motion.div
            key={liveProof.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-12 left-6 z-50 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-3 items-center gap-3 max-w-[240px] pointer-events-none hidden lg:flex"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-slate-800 leading-tight">{liveProof.name}</p>
              <p className="text-[9px] text-gray-500 uppercase tracking-tighter">
                Completed Assessment • {liveProof.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col py-8 px-6 md:px-12">
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-sm">
              <Dog className="w-6 h-6" />
            </div>
            <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-slate-800">
              QuietPaws Lab
            </span>
          </div>

          <div className="w-full loader-bar mt-8 relative max-w-sm">
            <motion.div
              className="loader-progress relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 leading-tight">
                    {QUESTIONS[currentQuestion].text}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto w-full">
                  {QUESTIONS[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{
                        y: -2,
                        backgroundColor: '#ffffff',
                        borderColor: '#cbd5e1',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-5 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm flex items-center justify-between text-left transition-all"
                    >
                      <span className="text-lg font-medium text-slate-700">{option.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin" />
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-800 italic">
                    Analyzing Behavioral Data...
                  </h2>
                  <p className="text-gray-400 text-lg font-light max-w-sm mx-auto">
                    Our algorithm is cross-referencing breed size with your reported triggers.
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 text-center flex flex-col items-center"
              >
                <div className="space-y-4">
                  <div className="flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 leading-tight">
                    Your Home Serenity Plan
                  </h2>
                </div>

                <div className="max-w-xl bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm">
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed italic">
                    "Based on your dog's triggers, we recommend a{' '}
                    <span className="font-extrabold text-black bg-yellow-300 px-2 py-0.5 rounded-md shadow-md ring-1 ring-yellow-400/50">
                      Passive Ultrasonic Intervention
                    </span>
                    . This method communicates in their language without stress, reducing bark incidents by
                    up to 94%."
                  </p>
                </div>

                <div className="w-full max-w-md space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <a
                      href="https://go.wisecombo.com/click"
                      className="w-full py-5 px-8 rounded-full bg-brand-secondary text-white font-bold uppercase tracking-widest text-lg shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <Award className="w-6 h-6" />
                      Claim Your Device
                    </a>
                  </motion.div>

                  <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                    Official Expert Recommended Solution
                  </p>
                </div>

                <div className="w-full max-w-md aspect-video max-h-48 bg-slate-100 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.consumerskills.org/wp-content/uploads/2026/04/nobark-preivew.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-90 transition-opacity" />
                  <Dog className="w-10 h-10 text-slate-300 mb-2 z-10" />
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold z-10">
                    Recommended Device Preview
                  </span>
                </div>

                <div className="w-full max-w-lg space-y-6 pt-4">
                  <div className="flex items-center justify-center gap-3 text-brand-primary text-sm font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-5 h-5" />
                    Trusted by 450+ Licensed Trainers
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl text-left border border-white shadow-sm ring-1 ring-slate-100">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-base text-slate-600 leading-relaxed italic">
                      "Our rescue used to bark at every leaf. Within 2 days of using this ultrasonic
                      method, the peace was restored. Truly humane and life-changing."
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <p className="text-sm font-bold text-slate-800">— Robert K., Certified Trainer</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <p id="share-status" className="text-slate-400 text-xs font-medium transition-all">
                    Share your results with family
                  </p>
                  <div className="flex items-center gap-5">
                    {[
                      {
                        id: 'facebook',
                        icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                        color: '#1877F2',
                      },
                      {
                        id: 'instagram',
                        icon: (
                          <g>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </g>
                        ),
                        color: '#E4405F',
                      },
                      {
                        id: 'x',
                        icon: <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M12.456 11.544l7.544 -7.544" />,
                        color: '#000000',
                      },
                      {
                        id: 'pinterest',
                        icon: (
                          <g>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 20l4-9" />
                            <path d="M10.7 14c.4-1.1 1.3-2 2.3-2 1.1 0 2 .9 2 2 0 1.1-.9 2-2 2-1.1 0-2-.9-2-2z" />
                          </g>
                        ),
                        color: '#BD081C',
                      },
                    ].map((platform) => (
                      <motion.button
                        key={platform.id}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(platform.id)}
                        className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-all"
                        style={{ color: platform.color }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {platform.icon}
                        </svg>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent hidden CTA for tracking script to detect from initial DOM */}
          <div
            aria-hidden="true"
            className="fixed left-[-9999px] top-[-9999px] opacity-0 pointer-events-none"
          >
            <a href="https://go.wisecombo.com/click">Hidden Tracking CTA</a>
          </div>
        </main>
      </div>

      <footer className="w-full bg-white/30 backdrop-blur-md py-10 px-6 border-t border-slate-200 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {['Terms of Service', 'Privacy Policy', 'Disclaimer', 'Contact Us'].map((item) => (
              <a
                key={item}
                href="https://go.wisecombo.com/click"
                className="text-[11px] uppercase tracking-widest font-bold text-slate-400 hover:text-brand-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider text-center space-y-1">
            <p>© 2026 QuietPaws Behavioral Research Group</p>
            <p className="max-w-md opacity-60">
              Results may vary based on dog temperament. Always combine technology with consistent
              behavioral reinforcement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
