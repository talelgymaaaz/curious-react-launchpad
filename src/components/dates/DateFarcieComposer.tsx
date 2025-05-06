
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { COMPOSITION_DATES } from '../../config/dates-composition';
import { Button } from '../ui/button';
import { AspectRatio } from '../ui/aspect-ratio';
import { Check, Phone } from 'lucide-react';
import { toast } from '../ui/use-toast';

const DateFarcieComposer = () => {
  const { t } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  
  const handleToggleDateSelection = (dateId: string) => {
    if (selectedDates.includes(dateId)) {
      setSelectedDates(selectedDates.filter(id => id !== dateId));
    } else {
      if (selectedDates.length < 8) {
        setSelectedDates([...selectedDates, dateId]);
      } else {
        toast({
          title: t('date_composer.max_selection_reached'),
          description: t('date_composer.remove_some')
        });
      }
    }
  };
  
  const handleConfirm = () => {
    if (selectedDates.length > 0) {
      setConfirmed(true);
      toast({
        title: t('date_composer.thank_you_title'),
        description: t('date_composer.thank_you_description')
      });
    } else {
      toast({
        title: t('date_composer.select_dates'),
        description: t('date_composer.select_at_least_one')
      });
    }
  };
  
  const handleReset = () => {
    setSelectedDates([]);
    setConfirmed(false);
  };

  // Get the selected date objects
  const selectedDateObjects = COMPOSITION_DATES.filter(date => 
    selectedDates.includes(date.id)
  );
  
  return (
    <div className="container mx-auto px-4 py-12">
      {!confirmed ? (
        <>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#700100] mb-4">
              {t('date_composer.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('date_composer.subtitle')}
            </p>
            <div className="mt-4 bg-amber-50 border border-amber-200 p-4 rounded-lg inline-block">
              <p className="text-amber-800">
                {t('date_composer.selection_count', { current: selectedDates.length, max: 8 })}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
            {COMPOSITION_DATES.map((date) => (
              <motion.div
                key={date.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-lg overflow-hidden shadow-md border-2 transition-colors cursor-pointer ${
                  selectedDates.includes(date.id) 
                    ? 'border-[#700100] bg-[#700100]/5' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => handleToggleDateSelection(date.id)}
              >
                <div className="relative">
                  <div className="w-full">
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={date.image} 
                        alt={t(`stuffed_dates.compositions.${date.id}`)}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </AspectRatio>
                  </div>
                  {selectedDates.includes(date.id) && (
                    <div className="absolute top-2 right-2 bg-[#700100] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{t(`stuffed_dates.compositions.${date.id}`)}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleConfirm}
              size="lg" 
              className="bg-[#700100] hover:bg-[#500100] text-white font-medium text-lg px-8 py-6"
            >
              {t('date_composer.confirm_button')}
            </Button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('date_composer.thank_you_title')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('date_composer.thank_you_message')}
            </p>

            {/* Display selected items */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#700100] mb-4">
                {t('date_composer.selected_items')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedDateObjects.map(date => (
                  <div key={date.id} className="flex items-center p-3 border rounded-lg bg-gray-50">
                    <div className="w-12 h-12 flex-shrink-0 mr-3 overflow-hidden rounded-md">
                      <img 
                        src={date.image} 
                        alt={t(`stuffed_dates.compositions.${date.id}`)}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">{t(`stuffed_dates.compositions.${date.id}`)}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="my-8 p-5 border border-amber-200 bg-amber-50 rounded-lg inline-block">
              <h3 className="text-lg font-medium text-amber-800 mb-2">
                {t('date_composer.contact_instruction')}
              </h3>
              <div className="flex items-center justify-center gap-2 text-xl font-bold text-[#700100]">
                <Phone className="h-5 w-5" />
                <span>{t('date_composer.contact_number')}</span>
              </div>
            </div>

            <Button 
              onClick={handleReset}
              variant="outline"
              className="mt-4"
            >
              {t('date_composer.start_over')}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DateFarcieComposer;
