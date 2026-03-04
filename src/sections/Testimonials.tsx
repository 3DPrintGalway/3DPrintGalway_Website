import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  company: string;
  quote: string;
  image: string;
}

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isVisible]);

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Mitchell',
      company: 'TechStart Inc.',
      quote:
        'The quality and speed of their 3D printing services exceeded our expectations. Our prototypes were delivered in 48 hours with impeccable precision.',
      image: '/client-1.jpg',
    },
    {
      name: 'David Chen',
      company: 'Design Studio Co.',
      quote:
        'Working with this team transformed our product development process. Their attention to detail and material expertise is unmatched.',
      image: '/client-2.jpg',
    },
    {
      name: 'Emma Rodriguez',
      company: 'Architecture Firm',
      quote:
        'Our architectural models have never looked better. The level of detail they can achieve is remarkable.',
      image: '/client-3.jpg',
    },
    {
      name: 'Michael Park',
      company: 'Engineering Solutions',
      quote:
        'From concept to final product, the entire experience was seamless. Highly recommend for any rapid prototyping needs.',
      image: '/client-4.jpg',
    },
  ];

  const goToPrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
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
          What Our Clients Say
        </h2>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div
            className={`flex justify-center mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
          >
            <Quote className="w-12 h-12 text-white/20" />
          </div>

          {/* Testimonial Content */}
          <div className="relative min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {/* Client Image */}
                <div className="mb-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white/20 mx-auto">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="font-satoshi text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Client Info */}
                <div>
                  <p className="font-chillax text-base lg:text-lg text-white">
                    {testimonial.name}
                  </p>
                  <p className="font-satoshi text-sm text-white/50">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {/* Prev Button */}
            <button
              onClick={goToPrev}
              className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
