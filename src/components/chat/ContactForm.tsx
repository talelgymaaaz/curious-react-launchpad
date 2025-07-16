import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

interface ContactFormProps {
  formData: ContactFormData;
  onFormChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
  isSubmitting = false
}) => {
  const { t } = useTranslation('chat');
  const isValid = formData.name && formData.email && formData.phone;

  return (
    <div className="p-3 sm:p-4 border-t border-border bg-gradient-to-r from-background to-muted/30 backdrop-blur-sm">
      <div className="space-y-2 sm:space-y-3">
        <div>
          <Label htmlFor="contact-name" className="text-xs font-medium text-foreground/80">
            {t('form.fullName')}
          </Label>
          <Input
            id="contact-name"
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            placeholder={t('form.fullNamePlaceholder')}
            className="mt-1 h-8 sm:h-9 text-xs sm:text-sm border-border/50 focus:border-primary transition-colors"
            autoComplete="off"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="contact-email" className="text-xs font-medium text-foreground/80">
            {t('form.email')}
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            placeholder={t('form.emailPlaceholder')}
            className="mt-1 h-8 sm:h-9 text-xs sm:text-sm border-border/50 focus:border-primary transition-colors"
            autoComplete="off"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="contact-phone" className="text-xs font-medium text-foreground/80">
            {t('form.phone')}
          </Label>
          <Input
            id="contact-phone"
            value={formData.phone}
            onChange={(e) => onFormChange('phone', e.target.value)}
            placeholder={t('form.phonePlaceholder')}
            className="mt-1 h-8 sm:h-9 text-xs sm:text-sm border-border/50 focus:border-primary transition-colors"
            autoComplete="off"
            disabled={isSubmitting}
          />
        </div>
        <Button 
          onClick={onSubmit} 
          className="w-full h-8 sm:h-9 text-xs sm:text-sm bg-gradient-to-r from-primary via-accent to-primary hover:scale-[1.02] transition-all duration-300 shadow-lg"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Envoi...' : t('form.send')}
        </Button>
      </div>
    </div>
  );
};