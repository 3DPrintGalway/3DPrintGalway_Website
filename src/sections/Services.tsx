import { useEffect, useRef, useState } from 'react';
import { Box, Zap, Layers, Palette, Ruler, Truck } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: <Box className="w-8 h-8" />,
      title: 'Custom Printing',
      description: 'Bring your designs to life with high-quality FDM and resin printing.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Rapid Prototyping',
      description: 'Fast turnaround for iterative design and testing.',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Batch Production',
      description: 'Scale your production with consistent quality prints.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Post-Processing',
      description: 'Sanding, painting, and finishing for professional results.',
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: 'Design Consultation',
      description: 'Expert advice on printability and material selection.',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Shipping',
      description: 'Careful packaging and worldwide delivery options.',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-dark-secondary"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Services
          </h2>
          <p
            className={`text-white/50 text-lg max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Everything you need to turn your ideas into physical reality
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group glass-card p-6 lg:p-8 transition-all duration-500 hover:border-cyan/30 hover:shadow-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-5 group-hover:bg-cyan group-hover:text-dark transition-all duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
