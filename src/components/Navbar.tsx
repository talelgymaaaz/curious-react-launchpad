
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-rich-black py-4 fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-off-white">
          <img 
            src="https://i.ibb.co/JRtvDcgK/image-removebg-preview-3.png"
            alt="Vilart Logo" 
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gold-500 transition-colors">
            Accueil
          </Link>
          <Link to="/prod" className="hover:text-gold-500 transition-colors">
            Production
          </Link>
          <Link to="/digital" className="hover:text-gold-500 transition-colors">
            Digital
          </Link>
          <Link to="/events" className="hover:text-gold-500 transition-colors">
            Évènementiel
          </Link>
          <Link to="/about" className="hover:text-gold-500 transition-colors">
            À Propos
          </Link>
          <Link to="/contact" className="hover:text-gold-500 transition-colors">
            Contact
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-off-white focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute top-full left-0 w-full bg-rich-black z-30 ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 py-6 flex flex-col space-y-4">
          <Link to="/" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            Accueil
          </Link>
          <Link to="/prod" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            Production
          </Link>
          <Link to="/digital" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            Digital
          </Link>
          <Link to="/events" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            Évènementiel
          </Link>
          <Link to="/about" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            À Propos
          </Link>
          <Link to="/contact" className="hover:text-gold-500 transition-colors block py-2" onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
