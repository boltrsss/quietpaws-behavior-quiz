import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Dog, ShieldCheck, Heart, Sparkles, Volume2, Info, Share2, Star, Users, Award } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string; icon?: any }[];
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
    ]
  },
  {
    id: 2,
    text: "When does the barking become most challenging?",
    options: [
      { value: 'strangers', label: 'Seeing strangers or passersby' },
      { value: 'night', label: 'In the middle of the night' },
      { value: 'separation', label: 'When they are left alone (Separation)' },
      { value: 'territorial', label: 'Territorial sounds or delivery alerts' },
    ]
  },
  {
    id: 3,
    text: "What training methods have you explored so far?",
    options: [
      { value: 'verbal', label: 'Verbal commands (No! Stay!)' },
      { value: 'treats', label: 'High-value treats & distractions' },
      { value: 'professional', label: 'Professional trainers' },
      { value: 'none', label: "We haven't tried a consistent method yet" },
    ]
  },
  {
    id: 4,
    text: "On a scale of 1-10, how much is the barking affecting your life?",
    options: [
      { value: 'low', label: '1-3: Mildly annoying' },
      { value: 'mid', label: '4-6: Frequent daily disruption' },
      { value: 'high', label: '7-8: Affecting work, sleep, or nerves' },
      { value: 'extreme', label: '9-10: Constant stress or neighbor complaints' },
    ]
  },
  {
    id: 5,
    text: "Which correction approach fits your philosophy best?",
    options: [
      { value: 'humane', label: '100% Humane & Silent (Ultrasonic Science)' },
      { value: 'direct', label: 'Direct Vibration Feedback' },
      { value: 'progressive', label: 'Progressive Sound Alerts' },
      { value: 'mixed', label: 'A Hybrid Non-Invasive Strategy' },
    ]
  }
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
        name: `${names[Math.floor(Math.random() * names.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`,
        time: 'Just now'
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'QuietPaws Dog Behavior Quiz',
      text: 'I just took the QuietPaws Dog Behavior Quiz and got my custom serenity plan! Check it out:',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Using a subtle status message instead of a harsh alert
        const btn = document.getElementById('share-btn');
        if (btn) {
          const originalText = btn.innerHTML;
          btn.innerText = 'Link Copied!';
          setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        }
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [QUESTIONS[currentQuestion].id]: answer });
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setProgress(((currentQuestion + 1) / QUESTIONS.length) * 100);
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
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 font-sans relative overflow-hidden">
      {/* Live Social Proof Bubble (Desktop only or floating) */}
      <AnimatePresence>
        {currentStep < 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            key={liveProof.name}
            className="fixed bottom-6 left-6 z-50 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl p-3 items-center gap-3 max-w-[240px] pointer-events-none hidden md:flex"
          >
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-slate-800 leading-tight">{liveProof.name}</p>
              <p className="text-[9px] text-gray-500 uppercase tracking-tighter">Completed Assessment • {liveProof.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[450px] min-h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col relative border border-gray-100 transition-all duration-500 z-10">
        {/* Header */}
        <header className="pt-8 px-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4 opacity-30 grayscale contrast-125 overflow-hidden whitespace-nowrap">
            <span className="text-[8px] font-bold tracking-tighter uppercase italic">VET-TECH</span>
            <span className="text-[8px] font-bold tracking-tighter uppercase italic">CANINE DAILY</span>
            <span className="text-[8px] font-bold tracking-tighter uppercase italic">SHARP PAW</span>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
            <Dog className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
            Certified Canine Behaviorist Assessment
          </p>
          <div className="w-full loader-bar mt-4 relative">
            <motion.div 
              className="loader-progress relative" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {/* Animated highlight/shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-white/30"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Completion Pulse */}
            {progress === 100 && (
              <motion.div 
                className="absolute inset-0 bg-brand-primary/20 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </div>
        </header>

        <main className="flex-1 p-8 relative flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Question Text */}
                <div className="space-y-2 text-center mb-4">
                  <h2 className="text-2xl font-semibold text-slate-800 leading-tight">
                    {QUESTIONS[currentQuestion].text}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {QUESTIONS[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.01, backgroundColor: "#fcfcfb", borderColor: "#94a3b8" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      id={`option-${option.value}`}
                      className="option-card group flex items-center justify-between"
                    >
                      <span className="text-[15px] font-medium text-slate-700 transition-colors">
                        {option.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-primary" />
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
                className="h-full flex flex-col items-center justify-center space-y-6 text-center"
              >
                <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin mb-2"></div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-slate-800 italic">Analyzing Dog Data...</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Generating your Home Serenity Plan based on behavior expert algorithms
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center h-full flex flex-col overflow-y-auto max-h-[500px] pr-1 scrollbar-hide"
              >
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 -mt-2">Your Serenity Plan is Ready</h2>
                
                <div className="bg-[#F1F3EE] p-5 rounded-2xl border border-transparent">
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "Based on your dog's triggers, we recommend a <span className="font-bold text-slate-800 text-base">Passive Ultrasonic Intervention</span>. This method communicates in their language without stress, reducing bark incidents by up to 94%."
                  </p>
                </div>

                <div className="w-full h-32 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                   <Dog className="w-8 h-8 text-gray-300 mb-1 z-10" />
                   <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold z-10">Expert Recommended Device Preview</span>
                </div>

                {/* Social Proof Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-center gap-2 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Recommended by 450+ Licensed Trainers
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-2 h-2 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-600 italic">"Our rescue used to bark at every leaf. Within 2 days of using this ultrasonic method, the peace was restored. Truly humane!"</p>
                      <p className="text-[10px] font-bold mt-2">— Robert K., Certified Trainer</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1"></div>

                <div className="space-y-3">
                  <motion.button
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="pinterest-btn bg-brand-secondary text-white uppercase tracking-wider text-sm"
                    id="final-cta"
                    onClick={() => window.location.href = 'https://your-offer-url.com'}
                  >
                    Claim Expert Recommendation
                  </motion.button>
                  
                  <motion.button
                    id="share-btn"
                    whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 text-gray-500 text-sm uppercase tracking-wide"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Results
                  </motion.button>

                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Verified Solution for US Households
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
