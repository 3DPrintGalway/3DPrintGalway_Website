import { useEffect, useRef, useState } from 'react';
import { Heart, Filter, ExternalLink } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  likes: number;
}

const Gallery = () => {
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

  const filters = [
    'All',
    'Characters',
    'Mechanical',
    'Functional',
    'Decorative',
    'Prototypes',
    'Architecture',
  ];

  const galleryItems: GalleryItem[] = [
    { id: 1, title: 'Articulated Dragon', category: 'Characters', image: '/gallery-1.jpg', likes: 127 },
    { id: 2, title: 'Gear Assembly', category: 'Mechanical', image: '/gallery-2.jpg', likes: 89 },
    { id: 3, title: 'Phone Stand', category: 'Functional', image: '/gallery-3.jpg', likes: 234 },
    { id: 4, title: 'Robot Figure', category: 'Characters', image: '/gallery-4.jpg', likes: 156 },
    { id: 5, title: 'Voronoi Lamp', category: 'Decorative', image: '/gallery-5.jpg', likes: 312 },
    { id: 6, title: 'Building Model', category: 'Architecture', image: '/gallery-6.jpg', likes: 78 },
    { id: 7, title: 'Rainbow Octopus', category: 'Characters', image: '/gallery-7.jpg', likes: 445 },
    { id: 8, title: 'Fantasy Sword', category: 'Decorative', image: '/gallery-8.jpg', likes: 201 },
    { id: 9, title: 'Cassette Organizer', category: 'Functional', image: '/gallery-9.jpg', likes: 167 },
    { id: 10, title: 'Cute Cat Figurine', category: 'Characters', image: '/gallery-10.jpg', likes: 389 },
    { id: 11, title: 'Gear Fidget Toy', category: 'Mechanical', image: '/gallery-11.jpg', likes: 278 },
    { id: 12, title: 'Spaceship Model', category: 'Prototypes', image: '/gallery-12.jpg', likes: 134 },
  ];

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-dark"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
          <div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Gallery
            </h2>
            <p
              className={`text-white/50 text-lg transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Explore our collection of 3D printed creations
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className={`flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 flex-shrink-0">
            <Filter className="w-4 h-4 text-white/50" />
            <span className="text-sm text-white/70">Filter</span>
          </div>
          <div className="w-px h-6 bg-white/10 flex-shrink-0" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn flex-shrink-0 ${
                activeFilter === filter ? 'filter-btn-active' : 'filter-btn-inactive'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-square rounded-2xl overflow-hidden bg-dark-card border border-dark-border cursor-pointer transition-all duration-500 hover:border-cyan/50 hover:shadow-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${300 + index * 50}ms`,
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">{item.category}</span>
                  <div className="flex items-center gap-1 text-cyan">
                    <Heart className="w-3 h-3 fill-current" />
                    <span className="text-xs">{item.likes}</span>
                  </div>
                </div>
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ExternalLink className="w-4 h-4 text-dark" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div
          className={`text-center mt-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <button className="btn-secondary">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
