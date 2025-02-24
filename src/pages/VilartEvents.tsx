import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ArrowRight, X, Calendar, MapPin, Ticket } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import { MediaItem } from '../types/media';
import { useNavigate } from 'react-router-dom';

const upcomingEvents = [
  {
    id: 1,
    title: "Festival International de Jazz",
    date: "15-17 Juillet 2024",
    location: "Tunis, Tunisie",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    description: "Trois jours de jazz avec des artistes internationaux",
    price: "À partir de 80 DT"
  },
  {
    id: 2,
    title: "Soirée Corporate Excellence",
    date: "25 Août 2024",
    location: "Hôtel Four Seasons, Gammarth",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    description: "Une soirée exclusive dédiée aux leaders d'entreprise",
    price: "Sur invitation"
  },
  {
    id: 3,
    title: "Festival Électro Beach",
    date: "10 Septembre 2024",
    location: "Hammamet, Tunisie",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    description: "Le plus grand événement électro de l'année",
    price: "À partir de 120 DT"
  }
];

const services = [
  {
    title: 'Planification d\'Événements',
    description: 'Services complets de planification et de gestion d\'événements pour des expériences inoubliables.',
    features: [
      'Développement de concept',
      'Sélection du lieu',
      'Coordination des fournisseurs',
      'Gestion du planning',
      'Coordination sur site'
    ]
  },
  {
    title: 'Production de Concerts',
    description: 'Organisation complète de concerts et festivals avec son et éclairage professionnels.',
    features: [
      'Réservation d\'artistes',
      'Conception de scène',
      'Ingénierie sonore',
      'Conception d\'éclairage',
      'Production technique'
    ]
  }
];

const portfolio: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: "https://player.vimeo.com/external/403619009.sd.mp4?s=51fb1fe1c5a2088f1d811e944e6e1231c1f2b21f&profile_id=164&oauth2_token_id=57447761",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Festival d'Été",
    description: "Une expérience festival d'été incroyable",
    category: "Festival"
  },
  {
    id: 2,
    type: 'image',
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    title: "Événement Corporate",
    description: "Production d'événements professionnels",
    category: "Corporate"
  },
  {
    id: 3,
    type: 'video',
    url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    title: "Concert Privé",
    description: "Événement concert exclusif",
    category: "Concert"
  }
];

const testimonials = [
  {
    name: "David Wilson",
    role: "Organisateur d'Événements",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    quote: "Vilart Events a transformé notre rassemblement d'entreprise en une expérience inoubliable. Leur attention aux détails était impressionnante."
  },
  {
    name: "Lisa Thompson",
    role: "Directrice de Festival",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote: "Travailler avec Vilart Events a fait de notre festival un grand succès. Leur expertise technique et leur organisation étaient remarquables."
  },
  {
    name: "James Rodriguez",
    role: "Client Corporate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    quote: "Le professionnalisme et la créativité de l'équipe ont dépassé nos attentes. Ils ont livré un événement d'entreprise parfait."
  }
];

const VilartEvents = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const navigate = useNavigate();

  return (
    <div className="pt-16">
      <VideoBackground
        videoUrl="https://player.vimeo.com/external/451776276.sd.mp4?s=2e4be06fb91c7a572aa2b74b26c72bfed800c583&profile_id=165&oauth2_token_id=57447761"
        overlay="bg-gradient-to-b from-gold-900/80 via-black/70 to-black/95"
      >
        <div className="relative z-10 h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
            style={{ 
              backgroundImage: `url(https://im.runware.ai/image/ws/0.5/ii/0482fe5d-711d-4978-a688-af60086fe579.webp)`,
              backgroundColor: 'rgba(249, 115, 22, 0.1)'
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-70" />
          
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full"
                 style={{
                   backgroundImage: `
                     radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                     radial-gradient(circle at 80% 40%, rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                     radial-gradient(circle at 40% 60%, rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                     radial-gradient(circle at 60% 80%, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
                   `,
                   backgroundSize: '100px 100px'
                 }}
            />
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white">
                  Évènementiel
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                  Créateurs d'expériences uniques et mémorables
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <a
                    href="#upcoming"
                    className="px-8 py-4 bg-gold-600 text-black font-semibold rounded-lg hover:bg-gold-500 transition-all duration-300"
                  >
                    Événements à venir
                  </a>
                  <a
                    href="#contact"
                    className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Nous contacter
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </VideoBackground>

      <section id="upcoming" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Événements à Venir
            </h2>
            <p className="text-xl text-white/80">
              Découvrez nos prochains événements exclusifs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-rich-black rounded-xl overflow-hidden border border-gold-600/20 group hover:border-gold-600/40 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gold-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gold-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gold-400">
                      <Ticket className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.price}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{event.description}</p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => navigate(`/events/${event.id}`)} 
                      className="w-full py-2 bg-gold-600/20 text-gold-400 rounded hover:bg-gold-600/30 transition-colors duration-300"
                    >
                      En savoir plus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Nos Services
            </h2>
            <p className="text-xl text-white/80">
              Des solutions événementielles complètes pour toute occasion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="luxury-card p-8 rounded-xl h-full"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <ArrowRight className="h-4 w-4 text-gold-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-rich-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Portfolio d'Événements
            </h2>
            <p className="text-xl text-white/80">
              Les moments forts de nos événements passés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedMedia(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center mb-4">
                      {item.type === 'video' ? (
                        <Play className="w-8 h-8 text-black" />
                      ) : (
                        <ArrowRight className="w-8 h-8 text-black" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className="text-sm text-gold-400">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-rich-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Prêt à Planifier Votre Événement ?
            </h2>
            <p className="text-xl text-white/80">
              Laissez-nous vous aider à créer une expérience inoubliable. Contactez-nous pour commencer à planifier votre prochain événement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-gold-600 text-black font-semibold rounded-lg hover:bg-gold-500 transition-all duration-300 transform hover:scale-105"
              >
                Commencer
              </a>
              <a
                href="#services"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                En Savoir Plus
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center text-white hover:text-gold-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VilartEvents;
