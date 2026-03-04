import { useState, useEffect } from 'react';
import { X, Sparkles, Zap, Gift } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Show after scrolling past hero
      if (scrollY > heroHeight * 0.5 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
      <div className="glass-card p-5 w-80 relative">
        {/* Close button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Header */}
        <h3 className="text-white font-semibold mb-4 pr-6">
          Ready to Print?
        </h3>

        {/* Features */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-cyan" />
            </div>
            <span className="text-white/70 text-sm">Upload your design</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-cyan" />
            </div>
            <span className="text-white/70 text-sm">Get instant quote</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4 text-cyan" />
            </div>
            <span className="text-white/70 text-sm">10% off first order</span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            setIsDismissed(true);
          }}
          className="btn-primary w-full text-center block"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default FloatingCTA;
