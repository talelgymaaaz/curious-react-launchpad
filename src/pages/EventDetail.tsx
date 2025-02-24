
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

// Define the Event type
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number];
  price: string;
  description: string;
  image: string;
  ticketTypes: {
    type: string;
    price: number;
    available: number;
  }[];
}

// Static event data (this would normally come from an API)
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Festival d'été",
    date: "15 Août 2024",
    time: "18:00",
    location: "Parc des Expositions, Tunis",
    coordinates: [10.1815, 36.8065], // Tunis coordinates
    price: "À partir de 50 DT",
    description: "Un festival exceptionnel qui réunit les meilleurs artistes de la scène musicale tunisienne. Une expérience immersive unique avec des performances live, des installations artistiques et une ambiance festive garantie.",
    image: "/images/event1.jpg",
    ticketTypes: [
      { type: "Standard", price: 50, available: 200 },
      { type: "VIP", price: 120, available: 50 },
      { type: "Premium", price: 200, available: 20 }
    ]
  },
  // ... Add more events as needed
];

const EventDetail = () => {
  const { id } = useParams();
  const event = upcomingEvents.find((e: Event) => e.id === Number(id));
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !event) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: event.coordinates,
      zoom: 14,
    });

    // Add marker
    new mapboxgl.Marker({ color: '#E2B53E' })
      .setLngLat(event.coordinates)
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Événement non trouvé</h1>
          <Link to="/events" className="inline-flex items-center text-gold-400 mt-4 hover:text-gold-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="relative h-[60vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${event.image})`,
            filter: 'brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux événements
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {event.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="bg-rich-black rounded-xl p-8 border border-gold-600/20">
              <h2 className="text-2xl font-bold mb-6">À propos de l'événement</h2>
              <p className="text-white/80 leading-relaxed">{event.description}</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gold-400">Points forts</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Expérience unique et immersive</li>
                    <li>• Performances live exceptionnelles</li>
                    <li>• Ambiance festive garantie</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gold-400">Services inclus</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Accès à toutes les zones</li>
                    <li>• Service de restauration</li>
                    <li>• Parking sécurisé</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-rich-black rounded-xl overflow-hidden border border-gold-600/20">
              <h3 className="text-xl font-semibold p-6 border-b border-gold-600/20">
                Localisation de l'événement
              </h3>
              <div ref={mapContainer} className="h-[300px] w-full" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-xl font-semibold mb-4">Détails de l'événement</h3>
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <Calendar className="w-5 h-5 mr-3 text-gold-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Clock className="w-5 h-5 mr-3 text-gold-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <MapPin className="w-5 h-5 mr-3 text-gold-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-rich-black rounded-xl p-6 border border-gold-600/20">
              <h3 className="text-xl font-semibold mb-4">Types de billets</h3>
              <div className="space-y-4">
                {event.ticketTypes.map((ticket, index) => (
                  <div key={index} className="p-4 border border-gold-600/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gold-400">{ticket.type}</span>
                      <span className="text-white/80">{ticket.price} DT</span>
                    </div>
                    <div className="text-sm text-white/60">
                      {ticket.available} billets disponibles
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-400 transition-all duration-300 transform hover:scale-105">
              Réserver maintenant
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
