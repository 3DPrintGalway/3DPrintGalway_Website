import { useEffect, useRef, useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

const WhyChooseUs = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const problems = [
    'Slow turnaround times',
    'Limited design flexibility',
    'High setup costs',
    'Minimum order quantities',
  ];

  const solutions = [
    '24-48 hour prototype delivery',
    'Unlimited design complexity',
    'No setup fees',
    'Single prototype to full production',
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#010101] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        {/* Section Header */}
        <h2
          className={`font-chillax text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white text-center mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          Why Choose Us?
        </h2>

        {/* Split Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10">
          {/* Left Side - The Problem */}
          <div
            className={`bg-[#0a0a0a] p-8 lg:p-12 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3 className="font-chillax text-xl lg:text-2xl text-white/60 mb-2">
              Traditional manufacturing
            </h3>
            <p className="font-satoshi text-base text-white/40 mb-8">
              holding you back?
            </p>

            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full flex-shrink-0">
                    <X size={14} className="text-white/50" />
                  </div>
                  <span className="font-satoshi text-base text-white/60">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Our Solution */}
          <div
            className={`bg-[#010101] p-8 lg:p-12 relative transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Divider line with gradient */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent transition-all duration-600 ${
                isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              }`}
              style={{
                transitionDelay: '600ms',
                transformOrigin: 'center',
              }}
            />

            <h3 className="font-chillax text-xl lg:text-2xl text-white mb-2">
              Experience the
            </h3>
            <p className="font-satoshi text-base text-white/80 mb-8">
              3D printing advantage
            </p>

            <ul className="space-y-4 mb-8">
              {solutions.map((solution, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="font-satoshi text-base text-white">{solution}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: '1000ms',
                transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded font-satoshi font-medium hover:bg-[#e6e6e6] transition-all duration-300 hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
