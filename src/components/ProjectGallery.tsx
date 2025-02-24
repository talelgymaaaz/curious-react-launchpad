
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogClose } from "./ui/dialog";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { MediaItem } from "../types/media";

const galleryItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_1.jpg",
    thumbnail: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_1.jpg",
    title: "On The Way",
    description: "Coming soon teaser - FBK project"
  },
  {
    id: 2,
    type: 'video',
    url: "https://player.vimeo.com/external/403619009.sd.mp4?s=51fb1fe1c5a2088f1d811e944e6e1231c1f2b21f&profile_id=164&oauth2_token_id=57447761",
    thumbnail: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_2.jpg",
    title: "Studio Session",
    description: "Behind the scenes with FBK"
  },
  {
    id: 3,
    type: 'image',
    url: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_4.jpg",
    thumbnail: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_4.jpg",
    title: "Production Setup",
    description: "Professional recording equipment"
  },
  {
    id: 4,
    type: 'image',
    url: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_5.jpg",
    thumbnail: "/Vitaprod/ON THE WAY 🔥 👀 __comingsoon _fbk _vilartprod(JPG)_5.jpg",
    title: "Studio Session",
    description: "Professional recording session"
  },
  {
    id: 5,
    type: 'image',
    url: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟1.webp",
    thumbnail: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟1.webp",
    title: "FBK Official Project",
    description: "Behind the scenes photography"
  },
  {
    id: 6,
    type: 'image',
    url: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟2.webp",
    thumbnail: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟2.webp",
    title: "Visual Production",
    description: "Creative direction and cinematography"
  },
  {
    id: 7,
    type: 'image',
    url: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟3.webp",
    thumbnail: "/Vitaprod/Some snaps from the next project featuring _f.b.k_official ✨️ _Enjoyable shoot _ loved the outcome ⚡️_Cinematography _ Edit _ _og__visuals 👽🁟3.webp",
    title: "Studio Magic",
    description: "Professional photography session"
  },
  {
    id: 8,
    type: 'image',
    url: "/Vitaprod/حين تنبض الشوارع بإيقاعات الحياة و الموسيقى 🎶_نستناوكم نهار 20 جانفي ضمن فعاليات أيام(.jpg",
    thumbnail: "/Vitaprod/حين تنبض الشوارع بإيقاعات الحياة و الموسيقى 🎶_نستناوكم نهار 20 جانفي ضمن فعاليات أيام(.jpg",
    title: "Street Rhythms",
    description: "Live music event - January 20th"
  },
  {
    id: 9,
    type: 'image',
    url: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _1.jpg",
    thumbnail: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _1.jpg",
    title: "Habib Bourguiba Avenue",
    description: "Unforgettable moments"
  },
  {
    id: 10,
    type: 'image',
    url: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _2.jpg",
    thumbnail: "/Vitaprod/شارع الحبيب بورقيبة 🥹 شكرا على اللحظات التي لا تنسى ❤️❤️_مالها إلا البداية .. ولنا _2.jpg",
    title: "Street Performance",
    description: "Live music in the heart of the city"
  }
];

const ProjectGallery = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrevious = () => {
    setSelectedItem((current) => 
      current === 0 ? galleryItems.length - 1 : current! - 1
    );
  };

  const handleNext = () => {
    setSelectedItem((current) => 
      current === galleryItems.length - 1 ? 0 : current! + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem === null) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedItem(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const renderMediaContent = (item: MediaItem) => {
    if (item.type === 'video') {
      return (
        <video
          src={item.url}
          controls
          autoPlay={isPlaying}
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      );
    }
    return (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-full object-contain"
      />
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-rich-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Notre Galerie
          </h2>
          <p className="text-xl text-white/80">
            Un aperçu de nos réalisations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-black/50 border-gold-500/20"
                )}
                onClick={() => setSelectedItem(index)}
              >
                <CardContent className="p-0 relative aspect-video">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center">
                          <Play className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-white/80 text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog 
        open={selectedItem !== null} 
        onOpenChange={() => {
          setSelectedItem(null);
          setIsPlaying(false);
        }}
      >
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-none">
          <DialogClose className="absolute right-4 top-4 z-50">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
          
          {selectedItem !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-4 z-50 text-white hover:text-white/80"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedItem}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center p-4 md:p-8"
                >
                  {renderMediaContent(galleryItems[selectedItem])}
                </motion.div>
              </AnimatePresence>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-4 z-50 text-white hover:text-white/80"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {galleryItems[selectedItem].title}
                </h2>
                <p className="text-white/80 mt-2">
                  {galleryItems[selectedItem].description}
                </p>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectGallery;
