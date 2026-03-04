import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    'High-quality FDM & Resin printing',
    '50+ material options available',
    'Fast 24-48 hour turnaround',
    'Expert design consultation',
    'Worldwide shipping',
    'Satisfaction guaranteed',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Why Choose{' '}
              <span className="text-gradient">3DPrint Galway</span>?
            </h2>

            <p
              className={`text-white/60 text-lg mb-8 leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              With years of experience in 3D printing, we deliver exceptional quality 
              and service. From hobbyists to businesses, we help bring your creative 
              visions to life with precision and care.
            </p>

            {/* Features List */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-cyan" />
                  </div>
                  <span className="text-white/70 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right - Logo Display */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan/20 blur-3xl rounded-full" />
              <img
                src="/logo.png"
                alt="3DPrint Galway"
                className="relative w-64 h-64 lg:w-80 lg:h-80 object-contain animate-pulse-glow rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
