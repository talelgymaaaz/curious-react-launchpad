
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "/lovable-uploads/270326f0-4113-41c1-8c99-3fe3d9523535.png",
  },
  {
    id: 2,
    image: "/lovable-uploads/4729d1f8-4b29-4042-8cfc-094123067c1f.png",
  },
  {
    id: 3,
    image: "/lovable-uploads/e2ab0179-7651-4901-b155-273451546398.png",
  }
];

const HeroButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full 
               bg-gradient-to-r from-[#E2B53E] via-[#D4AF37] to-[#B8860B] p-[2px] 
               transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
  >
    <span className="relative inline-flex items-center gap-2 rounded-full 
                     bg-black px-6 py-3 text-sm font-medium text-white 
                     transition-all duration-300 group-hover:bg-transparent">
      {children}
      <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </Link>
);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 7000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 70);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center z-10">
            <motion.img 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="https://i.ibb.co/JRtvDcgK/image-removebg-preview-3.png"
              alt="Logo"
              className="w-64 md:w-72 mb-16 transform hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <HeroButton to="/prod">
                Production
              </HeroButton>
              <HeroButton to="/events">
                Événementiel
              </HeroButton>
              <HeroButton to="/digital">
                Digital
              </HeroButton>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-8 z-20">
        <div className="bg-white/20 w-32 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E2B53E] to-[#B8860B]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="text-[#E2B53E] text-sm mt-2 font-medium tracking-wider">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
