import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
}

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
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

  const projects: Project[] = [
    {
      title: 'Aerospace Component Prototype',
      category: 'Engineering',
      image: '/work-1.jpg',
    },
    {
      title: 'Custom Lighting Fixture',
      category: 'Product Design',
      image: '/work-2.jpg',
    },
    {
      title: 'Architectural Scale Model',
      category: 'Architecture',
      image: '/work-3.jpg',
    },
    {
      title: 'Abstract Art Installation',
      category: 'Art & Sculpture',
      image: '/work-4.jpg',
    },
  ];

  const filters = ['All', 'Engineering', 'Product Design', 'Architecture', 'Art & Sculpture'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#010101] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <h2
              className={`font-chillax text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              Our Work
            </h2>
            <p
              className={`font-satoshi text-base text-white/60 max-w-lg transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Explore our portfolio of precision-crafted 3D printed projects
            </p>
          </div>

          {/* Filter Dropdown */}
          <div
            className={`mt-6 lg:mt-0 transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-white/5 border border-white/20 text-white px-4 py-2 rounded font-satoshi text-sm focus:outline-none focus:border-white/40 transition-colors cursor-pointer"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter} className="bg-[#010101]">
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                  {/* Category */}
                  <span className="font-satoshi text-xs text-white/60 uppercase tracking-wider mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-chillax text-lg lg:text-xl text-white mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                    {project.title}
                  </h3>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-white/80 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-satoshi text-sm">View Project</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Border on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 lg:mt-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '800ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 border border-white/30 text-white px-6 py-3 rounded font-satoshi font-medium hover:bg-white/5 hover:border-white/50 transition-all duration-300"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
