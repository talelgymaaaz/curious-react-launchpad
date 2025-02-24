
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react';

const FloatingSocials = () => {
  const socials = [
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/vilartprod/', label: 'Suivez-nous sur Instagram' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/vilart.prod/', label: 'Rejoignez-nous sur Facebook' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', label: 'Regardez nos vidéos' },
    { icon: <Music2 className="h-5 w-5" />, href: '#', label: 'Écoutez nos productions' },
  ];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2"
    >
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: -5, scale: 1.1 }}
          className="group relative w-10 h-10 bg-rich-black/80 backdrop-blur-sm hover:bg-gold-600/20 flex items-center justify-center rounded-l-lg text-gold-400 border border-gold-500/20 transition-all duration-300"
        >
          {social.icon}
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1 bg-rich-black/90 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {social.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingSocials;
