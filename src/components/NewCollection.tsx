import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const NewCollection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "auto";
      videoRef.current.playbackRate = 1.5; // Make video play faster
      
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.error("Video autoplay failed:", error);
        }
      };
      
      playVideo();
    }
  }, []);

  return (
    <section className="bg-[#4A0404] text-white w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-[3px] lg:divide-white">
          {/* Video section - shown at top on mobile, right side on desktop */}
          <div className="block lg:hidden mb-6"> {/* Mobile video container */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-[345px] object-cover" // Increased height by 15% (from 300px to 345px)
            >
              <source
                src="https://www.fioriforyou.com/apis/videos/newcollection.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="space-y-4 md:space-y-6 px-4 lg:px-8 py-8 md:py-15">
            <div>
              <h2 className="text-3xl md:text-4xl font-['WomanFontBold']">Nouvelle Collection</h2>
              <p className="text-sm md:text-base mt-2 text-gray-300">Découvrez nos derniers designs et notre savoir-faire exceptionnel</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2 md:space-x-4">
                <div className="h-65 md:h-80 overflow-hidden">
                  <img
                    src="NewCollection/4.png"
                    alt="Inside label"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-65 md:h-80 overflow-hidden">
                  <img
                    src="NewCollection/1.png"
                    alt="Suit gesture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex space-x-2 md:space-x-4">
                <div className="h-65 md:h-80 overflow-hidden">
                  <img
                    src="NewCollection/4.png"
                    alt="Inside label"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-65 md:h-80 overflow-hidden">
                  <img
                    src="NewCollection/1.png"
                    alt="Suit gesture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 md:mt-6">
              <Link to="/category/pret-a-porter/homme/costumes">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 py-2 bg-transparent border-white text-white hover:bg-white hover:text-[#4A0404] transition-colors font-['WomanFontBold'] text-sm md:text-base"
                >
                  DÉCOUVRIR PLUS
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block" style={{ height: '900px' }}> {/* Desktop video container */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source
                src="https://www.fioriforyou.com/apis/videos/newcollection.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;