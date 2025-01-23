import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultSlides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80',
    caption: 'Beautiful Memories Together'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1522827489705-0616731a52a8?auto=format&fit=crop&q=80',
    caption: 'Special Moments'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80',
    caption: 'Celebrating You'
  }
];

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="text-white" size={24} />
      </Link>

      <div className="absolute inset-0 flex items-center justify-center">
        {defaultSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ${
              currentSlide === index 
                ? 'opacity-100 z-10 scale-100' 
                : 'opacity-0 z-0 scale-105'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <p className="text-2xl font-semibold">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {defaultSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}