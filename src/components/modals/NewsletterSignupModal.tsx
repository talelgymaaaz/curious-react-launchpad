import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterSignupModal = ({ isOpen, onClose }: NewsletterSignupModalProps) => {
  const { t } = useTranslation('newsletter');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    day: '',
    month: '',
    year: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }

    if (!formData.firstName) {
      newErrors.firstName = t('firstNameRequired');
    }

    if (!formData.lastName) {
      newErrors.lastName = t('lastNameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = () => {
    if (formData.day && formData.month && formData.year) {
      const birthDate = new Date(parseInt(formData.year), parseInt(formData.month) - 1, parseInt(formData.day));
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age > 0 ? age : null;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const age = calculateAge();
      
      const response = await fetch('/api/insert_newsletter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          nom: formData.lastName,
          prenom: formData.firstName,
          age: age,
          source: 'popup'
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: t('success'),
          description: t('success'),
        });
        onClose();
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          day: '',
          month: '',
          year: ''
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: t('error'),
        description: t('error'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  };

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full mx-auto bg-white p-0 border-none shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="p-8">
          {/* Header Section */}
          <DialogHeader className="text-center space-y-4 mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/04272c72-7979-4c68-9c37-efc9954ca58f.png" 
                alt="Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-wide text-gray-900">
              {t('title')}
            </h2>
            <p className="text-base text-gray-600">
              {t('subtitle')}
            </p>
          </DialogHeader>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <Input
                  type="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-12 text-base border-0 border-b-2 border-gray-300 rounded-none px-0 pb-2 focus:border-gray-900 focus:ring-0 bg-transparent"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* First and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t('firstName')}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full h-12 text-base border-0 border-b-2 border-gray-300 rounded-none px-0 pb-2 focus:border-gray-900 focus:ring-0 bg-transparent"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder={t('lastName')}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full h-12 text-base border-0 border-b-2 border-gray-300 rounded-none px-0 pb-2 focus:border-gray-900 focus:ring-0 bg-transparent"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Birth Date */}
              <div className="space-y-3">
                <Label className="text-sm text-gray-600">{t('birthDate')}</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Select value={formData.day} onValueChange={(value) => handleInputChange('day', value)}>
                    <SelectTrigger className="h-12 border-0 border-b-2 border-gray-300 rounded-none focus:border-gray-900 text-base bg-transparent">
                      <SelectValue placeholder={t('day')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {generateDays().map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={formData.month} onValueChange={(value) => handleInputChange('month', value)}>
                    <SelectTrigger className="h-12 border-0 border-b-2 border-gray-300 rounded-none focus:border-gray-900 text-base bg-transparent">
                      <SelectValue placeholder={t('month')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {generateMonths().map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="h-12 border-0 border-b-2 border-gray-300 rounded-none focus:border-gray-900 text-base bg-transparent">
                      <SelectValue placeholder={t('year')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {generateYears().map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>

            {/* Right Side - Buttons and Privacy */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-14 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-colors text-base"
                >
                  {isLoading ? 'Loading...' : t('subscribeNow')}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-14 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-50 transition-colors text-base"
                >
                  {t('decline')}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                {t('privacyText')} <span className="underline cursor-pointer">{t('privacyPolicy')}</span>.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterSignupModal;
