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
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-primary/20">
      {/* Live Social Proof Bubble (Desktop only or floating) */}
      <AnimatePresence>
        {currentStep < 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            key={liveProof.name}
            className="fixed bottom-6 left-6 z-50 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3 max-w-[280px] pointer-events-none hidden md:flex"
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-slate-800 leading-tight">{liveProof.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter font-semibold">Completed Assessment • {liveProof.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl mx-auto min-h-screen flex flex-col px-4 md:px-8 py-8 md:py-12 transition-all duration-500">
        {/* Header - Larger font as requested */}
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-8 mb-8 opacity-40 grayscale contrast-125 overflow-hidden whitespace-nowrap">
            <span className="text-xs font-black tracking-tighter uppercase italic">VET-TECH PREMIUM</span>
            <span className="text-xs font-black tracking-tighter uppercase italic">CANINE DAILY</span>
            <span className="text-xs font-black tracking-tighter uppercase italic">SHARP PAW</span>
          </div>
          <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4">
            <Dog className="w-8 h-8 text-brand-primary" />
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-brand-primary font-bold mb-2">
            Certified Canine Behaviorist Assessment
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-800 text-center leading-tight max-w-2xl px-4">
            Is Your Dog's Barking Disrupting Your Peace?
          </h1>

          <div className="w-full max-w-md loader-bar mt-10 relative">
            <motion.div 
              className="loader-progress relative" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
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

        <main className="flex-1 w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Question Text */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 leading-tight">
                    {QUESTIONS[currentQuestion].text}
                  </h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-4">
                  {QUESTIONS[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.01, backgroundColor: "#ffffff", borderColor: "#7A9D96", boxShadow: "0 10px 20px -10px rgba(122, 157, 150, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      id={`option-${option.value}`}
                      className="option-card group flex items-center justify-between p-6 md:p-8"
                    >
                      <span className="text-lg md:text-xl font-medium text-slate-700 transition-colors">
                        {option.label}
                      </span>
                      <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-brand-primary" />
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
                className="h-[400px] flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin"></div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold text-slate-800 italic">Analyzing Canine Data...</h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto font-light">
                    Generating your Home Serenity Plan based on behavior expert algorithms
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12 pb-12"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-1.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">Your Serenity Plan is Ready</h2>
                </div>
                
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 relative">
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed italic">
                    "Based on your dog's triggers, we recommend a <span className="font-extrabold text-black text-[16px] bg-yellow-300 px-2 py-0.5 rounded-md shadow-md ring-1 ring-yellow-400/50">Passive Ultrasonic Intervention</span>. This method communicates in their language without stress, reducing bark incidents by up to 94%."
                  </p>
                </div>

                <div className="w-full h-48 md:h-64 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('./s4-prod.webp?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                   <Dog className="w-12 h-12 text-slate-300 mb-2 z-10" />
                   <span className="text-xs text-gray-400 uppercase tracking-widest font-bold z-10 text-center px-6">Expert Recommended Device Preview</span>
                </div>

                {/* SWAPPED: CTA FIRST */}
                <div className="space-y-6 max-w-lg mx-auto w-full">
                  <motion.button
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="pinterest-btn bg-brand-secondary text-white py-6 text-lg tracking-widest shadow-2xl"
                    id="final-cta"
                    onClick={() => window.location.href = 'https://go.wisecombo.com/click'}
                  >
                    CLAIM EXPERT RECOMMENDATION
                  </motion.button>
                  
                  <motion.button
                    id="share-btn"
                    whileHover={{ backgroundColor: "#ffffff", scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-slate-200 text-slate-500 bg-white shadow-sm hover:shadow-md"
                  >
                    <Share2 className="w-5 h-5" />
                    SHARE ASSESSMENT
                  </motion.button>

                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    Verified Solution for US Households
                  </p>
                </div>

                {/* SWAPPED: SOCIAL PROOF SECOND */}
                <div className="space-y-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-3 text-brand-primary text-sm font-bold uppercase tracking-widest bg-brand-primary/5 py-3 rounded-xl">
                    <Award className="w-5 h-5" />
                    Recommended by 450+ Licensed Trainers
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl text-left border border-slate-100 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-base text-slate-600 italic">"Our rescue used to bark at every leaf. Within 2 days of using this ultrasonic method, the peace was restored. Truly humane!"</p>
                      <p className="text-xs font-bold mt-4 uppercase tracking-tighter text-slate-400">— Robert K., Certified Trainer</p>
                    </div>
                    {/* Additional Social Proof */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl text-left border border-slate-100 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-base text-slate-600 italic">"I was skeptical but desperate. This assessment pointed me to exactly what I needed. No more neighbor complaints at 2 AM!"</p>
                      <p className="text-xs font-bold mt-4 uppercase tracking-tighter text-slate-400">— Sarah J., Labrador Owner</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer - New Legal Section with larger font */}
        <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm md:text-base font-bold text-slate-500 tracking-[0.1em] uppercase">
            <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Safety Disclaimer</a>
          </div>
          
          <div className="text-center max-w-2xl">
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light px-4">
              Disclaimer: Results may vary based on dog breed, behavior history, and environment. This assessment is not a substitute for professional veterinary advice.
            </p>
            <p className="text-xs md:text-sm text-slate-300 mt-8 font-black tracking-[0.2em] uppercase">
              © 2026 QuietPaws Behavioral Research • All Rights Reserved
            </p>
          </div>
          <div className="pb-8"></div>
        </footer>
      </div>
    </div>
  );
}
