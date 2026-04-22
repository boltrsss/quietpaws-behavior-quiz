/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  VolumeX, 
  Dog, 
  HeartPulse, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Twitter,
  Share2
} from 'lucide-react';

// Types
type Question = {
  id: number;
  title: string;
  subtitle: string;
  options: { label: string; value: string }[];
  type: 'select' | 'scale';
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "About Your Companion",
    subtitle: "What is your dog's breed and physical size?",
    type: 'select',
    options: [
      { label: "Toy (Under 10 lbs)", value: "toy" },
      { label: "Small (10-25 lbs)", value: "small" },
      { label: "Medium (25-50 lbs)", value: "medium" },
      { label: "Large (50+ lbs)", value: "large" },
    ]
  },
  {
    id: 2,
    title: "Barking Triggers",
    subtitle: "In which scenarios does your dog bark most frequently?",
    type: 'select',
    options: [
      { label: "Strangers / Doorbell", value: "strangers" },
      { label: "Nighttime / Noises", value: "night" },
      { label: "Separation Anxiety", value: "separation" },
      { label: "Excitement / Play", value: "excitement" },
    ]
  },
  {
    id: 3,
    title: "Training Journey",
    subtitle: "Which methods have you attempted so far?",
    type: 'select',
    options: [
      { label: "Verbal Commands Only", value: "verbal" },
      { label: "Training Collars", value: "collars" },
      { label: "Professional Trainer", value: "pro" },
      { label: "No formal training yet", value: "none" },
    ]
  },
  {
    id: 4,
    title: "Daily Impact",
    subtitle: "How much is the barking impacting your peace of mind? (1-10)",
    type: 'scale',
    options: [] // Managed by slider UI
  },
  {
    id: 5,
    title: "Preferred Solution",
    subtitle: "What is your preferred approach to correcting this behavior?",
    type: 'select',
    options: [
      { label: "Humane Ultrasonic Sound", value: "ultrasonic" },
      { label: "Soft Vibration Prompt", value: "vibration" },
      { label: "Humanely Tone Warning", value: "tone" },
      { label: "I'm open to expert advice", value: "expert" },
    ]
  }
];

export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [scaleValue, setScaleValue] = useState(7);
  const [successRate, setSuccessRate] = useState("94.3");

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleNext = (value: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('loading');
    }
  };

  useEffect(() => {
    if (step === 'loading') {
      // Generate a random success rate between 90.0% and 98.9%
      const rate = (Math.random() * (98.9 - 90.0) + 90.0).toFixed(1);
      setSuccessRate(rate);

      const timer = setTimeout(() => {
        setStep('result');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen font-sans text-ink bg-paper overflow-x-hidden selection:bg-sage/20">
      <header className="relative z-10 w-full max-w-lg mx-auto pt-12 pb-6 px-6 flex flex-col items-center border-b border-divider">
        <div className="flex flex-col items-center group">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-white shadow-lg shadow-sage/20">
                <Dog size={20} strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sage-dark border-2 border-paper flex items-center justify-center">
                <Sparkles size={8} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-[0.15em] text-ink uppercase leading-none">QuietPaws</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-sage uppercase mt-0.5 ml-0.5">Laboratory</span>
            </div>
          </div>
        </div>
        <div className="text-[9px] uppercase font-bold tracking-[0.05em] opacity-40 mt-2">Certified Canine Behavior Assessment</div>
      </header>

      <main className="relative z-10 w-full max-w-lg mx-auto px-6 py-8 pb-20">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="aspect-[4/3] rounded-[32px] bg-stone-200 overflow-hidden relative group border border-divider shadow-sm">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                 <img 
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
                    alt="Happy dog"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-serif italic text-xl leading-snug">"Barking isn't a problem, it's communication that needs a better outlet."</p>
                    <p className="text-white/80 text-xs mt-2 font-bold tracking-tight">— Dr. Elias Sterling</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sage/80 mb-2">
                  <Dog size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">2026 Behavior Study</span>
                </div>
                <h1 className="text-3xl font-serif leading-[1.2] text-ink">
                  Restore serenity to your home today.
                </h1>
                <p className="text-ink/70 leading-relaxed text-[15px]">
                  Answer 5 expert-curated questions to receive your custom behavior adjustment plan and equipment recommendation.
                </p>
              </div>

              <button
                onClick={() => setStep('quiz')}
                id="start-quiz-btn"
                className="w-full bg-sage text-white py-5 rounded-[20px] font-bold text-base flex items-center justify-center gap-2 hover:bg-sage-dark transition-all shadow-lg active:scale-95"
              >
                Begin Assessment
                <ChevronRight size={18} />
              </button>
              
              <div className="flex items-center justify-center gap-8 pt-4 text-ink/40">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={20} />
                  <span className="text-[9px] uppercase font-bold tracking-[0.1em]">Safe</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <VolumeX size={20} />
                  <span className="text-[9px] uppercase font-bold tracking-[0.1em]">Humane</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <HeartPulse size={20} />
                  <span className="text-[9px] uppercase font-bold tracking-[0.1em]">Expert</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key={`q-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sage/60">
                  <Dog size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Bark Behavior Analysis</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Step {currentQuestionIndex + 1} of 5</span>
                    <span className="text-xs font-serif italic opacity-60">{currentQuestion.title}</span>
                  </div>
                  <div className="h-1 w-full bg-divider rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-sage"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-serif leading-[1.3] text-ink">
                {currentQuestion.subtitle}
              </h2>

              <div className="space-y-3">
                {currentQuestion.type === 'select' ? (
                  currentQuestion.options.map((opt, i) => (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => handleNext(opt.value)}
                      className="w-full text-left p-5 rounded-2xl border border-divider bg-white hover:border-sage hover:bg-[#f0f2f0] transition-all group flex items-center justify-between shadow-sm"
                    >
                      <span className="font-semibold text-ink/90">{opt.label}</span>
                      <ChevronRight size={18} className="opacity-20 group-hover:opacity-60 transition-opacity" />
                    </motion.button>
                  ))
                ) : (
                  <div className="space-y-12 py-6">
                    <div className="flex justify-between text-4xl font-serif opacity-20">
                      <span>1</span>
                      <span className="text-sage opacity-100">{scaleValue}</span>
                      <span>10</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="1"
                      value={scaleValue}
                      onChange={(e) => setScaleValue(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-divider rounded-lg appearance-none cursor-pointer accent-sage"
                    />
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                      <span>Minor Nuisance</span>
                      <span>Major Stress</span>
                    </div>
                    <button
                      onClick={() => handleNext(scaleValue)}
                      className="w-full bg-sage text-white py-5 rounded-[20px] font-bold shadow-lg hover:bg-sage-dark transition-all active:scale-95"
                    >
                      Next Step
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              <div className="relative">
                <motion.div 
                  className="w-20 h-20 rounded-full border-2 border-sage/20 border-t-sage"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center text-sage"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles size={28} />
                </motion.div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-serif">Analyzing Dog Data...</h3>
                <p className="text-ink/60 text-sm font-medium">Generating custom behavior report</p>
                <div className="pt-6 flex flex-col gap-3 text-ink/50 text-[11px] font-bold uppercase tracking-wider">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>✓ Breed Correlation Complete</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>✓ Sound Sensitivity Mapped</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>✓ Recommendation Locked</motion.p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="bg-white border border-divider p-8 rounded-[40px] space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-4">
                  <div className="inline-block py-1.5 px-3 bg-[#E8EBE9] text-sage-dark text-[10px] font-bold uppercase tracking-wider rounded-md">
                    Expert Recommendation
                  </div>
                  <h3 className="text-3xl font-serif leading-tight">Your Serenity Plan is Ready</h3>
                </div>

                <div className="space-y-4 text-ink/80 text-[15px] leading-relaxed">
                  <p>Based on your <strong className="text-sage-dark">{answers[1]} dog's</strong> response to <strong className="text-sage-dark">{answers[2]}</strong>, we have identified a high cognitive sensitivity to auditory cues.</p>
                  <p>Expert recommendation: An automated, non-invasive correction system using <strong className="text-sage-dark">variable frequency ultrasonic waves</strong> will be most effective. This signals "calm" to the canine brain without causing distress or pain.</p>
                </div>

                <div className="pt-6 border-t border-divider">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-paper rounded-2xl flex items-center justify-center p-3 border border-divider">
                      <VolumeX size={36} className="text-sage" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Device Recommended</p>
                      <a 
                        href="https://go.wisecombo.com/click" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-serif italic text-xl text-ink hover:text-sage transition-colors border-b border-sage/30 hover:border-sage"
                      >
                        Nobark Ultra
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 
            PERSISTENT SECTION: 
            This exists in the DOM from Page Load to satisfy tracking scripts.
            Visibility is toggled via CSS classes (hidden/block) rather than 
            React conditional rendering.
        */}
        <div className={step === 'result' ? 'block mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700' : 'hidden'}>
          {/* Results Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-divider flex flex-col gap-1.5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-tight opacity-40">Success Rate</p>
              <p className="text-3xl font-serif">{successRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-divider flex flex-col gap-1.5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-tight opacity-40">US Approved</p>
              <p className="text-3xl font-serif">Humane</p>
            </div>
          </div>

          <div className="space-y-4 text-center">
             {/* THE PERSISTENT CTA - Must have #cta-button and be native <a> */}
             <a 
              href="https://go.wisecombo.com/click"
              id="cta-button"
              className="w-full bg-sage text-white py-6 rounded-full font-bold text-lg shadow-xl shadow-sage/20 flex items-center justify-center gap-2 animate-pulse-editorial hover:bg-sage-dark transition-colors"
             >
              GET YOUR RECOMMENDATION 
              <ArrowRight size={20} />
             </a>
             
             <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
              60-Day Money Back Guarantee • No Questions Asked
             </p>
          </div>

          {/* Social Sharing */}
          <div className="pt-6 text-center space-y-4 border-t border-divider border-dashed">
            <p className="text-xs font-serif italic text-ink/60">Share your results with other pet parents:</p>
            <div className="flex justify-center gap-3">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://go.wisecombo.com/click')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center text-ink/40 hover:text-sage hover:border-sage transition-all shadow-sm"
                title="Share on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://go.wisecombo.com/click')}&text=${encodeURIComponent("I just found a humane solution for my dog's barking! Check out QuietHome AI.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center text-ink/40 hover:text-sage hover:border-sage transition-all shadow-sm"
                title="Share on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent('https://go.wisecombo.com/click')}&media=${encodeURIComponent('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200&h=630')}&description=${encodeURIComponent("Find the most humane and effective barking solution for your dog.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-divider flex items-center justify-center text-ink/40 hover:text-sage hover:border-sage transition-all shadow-sm"
                title="Pin on Pinterest"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-8 border-t border-divider space-y-5">
            <p className="text-center font-serif italic text-ink/50">Trusted by over 12,000 households nationwide</p>
            <div className="flex justify-center -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-11 h-11 rounded-full border-2 border-paper bg-stone-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-11 h-11 rounded-full border-2 border-paper bg-sage-dark flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                +12k
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-lg mx-auto py-12 px-6 text-center space-y-6 opacity-40 border-t border-divider mt-10">
        <div className="flex justify-center gap-4 text-[9px] uppercase font-bold tracking-widest">
          <a href="https://go.wisecombo.com/click" target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="https://go.wisecombo.com/click" target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="https://go.wisecombo.com/click" target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">Disclaimer</a>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-bold">© 2026 QuietHome AI Behavior Systems</p>
          <p className="text-[9px] leading-relaxed max-w-xs mx-auto text-center font-medium">This assessment is for educational purposes. Consult a professional behaviorist for individualized medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
