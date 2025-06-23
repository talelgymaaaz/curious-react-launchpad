
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MessageSquare, ArrowLeft, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: t('error'),
        description: t('nameRequired'),
        variant: 'destructive'
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: t('error'),
        description: t('emailRequired'),
        variant: 'destructive'
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: t('error'),
        description: t('emailInvalid'),
        variant: 'destructive'
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: t('error'),
        description: t('phoneRequired'),
        variant: 'destructive'
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: t('error'),
        description: t('messageRequired'),
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://draminesaid.com/lucci/api/insert_message.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_client: formData.name,
          email_client: formData.email,
          telephone_client: formData.phone,
          message_client: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: t('success'),
          description: t('successMessage')
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('error'),
        description: t('errorMessage'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openingHours = [
    { day: 'Lundi - Vendredi', hours: '9:00 - 19:00' },
    { day: 'Samedi', hours: '9:00 - 18:00' },
    { day: 'Dimanche', hours: 'Fermé' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                {t('title')}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-600">
                Nous vous répondrons dans les plus brefs délais
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4" />
                    {t('name')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    {t('phone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  {t('message')}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t('messagePlaceholder')}
                  className="w-full min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 font-medium text-lg rounded-lg transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
            </form>
          </div>

          {/* Right Column - Map and Info */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <h3 className="text-lg font-serif font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Notre Boutique
                </h3>
                <p className="text-blue-100">
                  Venez nous rendre visite dans notre boutique
                </p>
              </div>
              <div className="h-64 sm:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1703123456789!6m8!1m7!1sCAoSLEFGMVFpcE9fVlBuR09QYnA4WjBWWlUySEZVaDFKMnN1SEo3c01IM1VhTW1U!2m2!1d36.8454422!2d10.2806219!3f90!4f0!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LUCCI BY EY Boutique"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  📍 Tunis, Tunisie - Cliquez sur la carte pour plus de détails
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-serif font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Clock className="w-5 h-5" />
                Horaires d'ouverture
              </h3>
              <div className="space-y-3">
                {openingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{schedule.day}</span>
                    <span className={`font-semibold ${schedule.hours === 'Fermé' ? 'text-red-600' : 'text-green-600'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-serif font-semibold mb-4">
                Informations de contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+216 XX XXX XXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>contact@luccibyey.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Tunis, Tunisie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
