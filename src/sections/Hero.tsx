import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="3D Printing Workshop"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-dark/60" />
      </div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto pt-20">
        {/* Logo Animation */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <img 
            src="/logo.png" 
            alt="3DPrint Galway" 
            className="h-24 w-24 lg:h-32 lg:w-32 mx-auto object-contain animate-pulse-glow rounded-full"
          />
        </div>

        {/* Main Headline */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Bring Your Ideas to{' '}
          <span className="text-gradient">Life</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl lg:text-2xl text-white/60 mb-10 max-w-2xl mx-auto transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Custom 3D printing services for prototypes, models, and unique creations
        </p>

        {/* CTA Input Bar - Tripo3D Style */}
        <div
          className={`max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="glass-card p-2 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Describe what you want to print..."
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none py-3 px-2"
              readOnly
            />
            <button 
              onClick={scrollToGallery}
              className="btn-primary flex items-center gap-2 flex-shrink-0"
            >
              <span className="hidden sm:inline">Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-8 lg:gap-16 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {[
            { value: '500+', label: 'Projects Done' },
            { value: '50+', label: 'Materials' },
            { value: '24h', label: 'Fast Turnaround' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-cyan rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
