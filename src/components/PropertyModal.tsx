
/**
 * PropertyModal.tsx
 * 
 * Description (FR):
 * Ce composant affiche les détails d'une propriété dans une modal.
 * Il permet également aux propriétaires de modifier les informations de la propriété.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { propertyApi, Property } from '@/services/api';
import { 
  Check, X, MapPin, Star, Building2, 
  Monitor, Users, Wifi, ParkingCircle, 
  Coffee, CalendarClock, UtensilsCrossed, 
  PrinterIcon, BadgeCheck, AccessibilityIcon, ShieldCheck 
} from 'lucide-react';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string | null;
}

const PropertyModal = ({ isOpen, onClose, propertyId }: PropertyModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, canDelete } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updatedProperty, setUpdatedProperty] = useState<Partial<Property>>({});

  React.useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!propertyId || !isOpen) return;
      
      try {
        setLoading(true);
        const propertyData = await propertyApi.getPropertyById(propertyId);
        setProperty(propertyData);
        setUpdatedProperty({
          title: propertyData.title,
          address: propertyData.address,
          price: propertyData.price,
          status: propertyData.status,
        });
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails de la propriété",
          variant: "destructive",
        });
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId, isOpen, toast, onClose]);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!propertyId || !property || !canDelete('properties')) return;
    
    try {
      await propertyApi.deleteProperty(propertyId);
      toast({
        title: "Propriété supprimée",
        description: "La propriété a été supprimée avec succès",
      });
      handleClose();
      // Force refresh the properties page
      navigate('/properties', { replace: true });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la propriété",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpdateProperty = async () => {
    if (!propertyId || !property) return;
    
    try {
      const result = await propertyApi.updateProperty(propertyId, updatedProperty, imageFile || undefined);
      
      toast({
        title: "Mise à jour réussie",
        description: "Les informations de la propriété ont été mises à jour",
      });
      
      // Update local state with the new data
      setProperty({
        ...property,
        ...updatedProperty,
        image_url: result.image_url || property.image_url,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la propriété",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  // Configuration des styles de couleur pour les différents statuts
  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  const statusStyle = property?.status 
    ? statusColors[property.status as keyof typeof statusColors] 
    : statusColors.available;

  const isOfficeProperty = property?.property_type === 'office';
  const isOwner = user?.role === 'owner';

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3">Chargement...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!property) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Propriété non trouvée</DialogTitle>
            <DialogDescription>
              La propriété que vous recherchez n'existe pas ou a été supprimée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {isEditing ? (
            <div className="space-y-2">
              <DialogTitle>Modifier la propriété</DialogTitle>
              <DialogDescription>
                Mettez à jour les informations de cette propriété
              </DialogDescription>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">{property.title}</DialogTitle>
              <Badge className={`${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.label}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {isEditing ? (
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                value={updatedProperty.title || ''} 
                onChange={e => setUpdatedProperty({...updatedProperty, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input 
                id="address" 
                value={updatedProperty.address || ''} 
                onChange={e => setUpdatedProperty({...updatedProperty, address: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price">Prix par jour (€)</Label>
              <Input 
                id="price" 
                type="number"
                value={updatedProperty.price || ''} 
                onChange={e => setUpdatedProperty({...updatedProperty, price: Number(e.target.value)})}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <select 
                id="status" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={updatedProperty.status || 'available'}
                onChange={e => setUpdatedProperty({...updatedProperty, status: e.target.value as any})}
              >
                <option value="available">Disponible</option>
                <option value="booked">Réservé</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image (optionnel)</Label>
              <Input 
                id="image" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange} 
              />
            </div>

            {isOfficeProperty && (
              <div className="space-y-4 mt-4">
                <h4 className="text-sm font-medium">Équipements</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wifi" 
                      checked={updatedProperty.wifi ?? property.wifi}
                      onCheckedChange={checked => 
                        setUpdatedProperty({...updatedProperty, wifi: !!checked})
                      }
                    />
                    <label htmlFor="wifi" className="text-sm">WiFi</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="parking" 
                      checked={updatedProperty.parking ?? property.parking}
                      onCheckedChange={checked => 
                        setUpdatedProperty({...updatedProperty, parking: !!checked})
                      }
                    />
                    <label htmlFor="parking" className="text-sm">Parking</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="coffee" 
                      checked={updatedProperty.coffee ?? property.coffee}
                      onCheckedChange={checked => 
                        setUpdatedProperty({...updatedProperty, coffee: !!checked})
                      }
                    />
                    <label htmlFor="coffee" className="text-sm">Machine à café</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flexible_hours" 
                      checked={updatedProperty.flexible_hours ?? property.flexible_hours}
                      onCheckedChange={checked => 
                        setUpdatedProperty({...updatedProperty, flexible_hours: !!checked})
                      }
                    />
                    <label htmlFor="flexible_hours" className="text-sm">Horaires 24/7</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-slate-100 mt-2">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{property.address}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-3 border rounded-lg p-4">
                <h3 className="font-semibold">Informations de base</h3>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-medium">{property.price}€ / jour</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Note</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                <Separator />
                {isOfficeProperty ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Postes de travail</span>
                      <span className="font-medium">{property.workstations}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Salles de réunion</span>
                      <span className="font-medium">{property.meeting_rooms}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Chambres</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Salles de bain</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                  </>
                )}
              </div>

              {isOfficeProperty && (
                <div className="space-y-3 border rounded-lg p-4">
                  <h3 className="font-semibold">Équipements</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="flex items-center">
                      {property.wifi ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <Wifi className="h-4 w-4 mr-1.5" /> WiFi</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <Wifi className="h-4 w-4 mr-1.5 text-muted-foreground" /> WiFi</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.parking ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <ParkingCircle className="h-4 w-4 mr-1.5" /> Parking</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <ParkingCircle className="h-4 w-4 mr-1.5 text-muted-foreground" /> Parking</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.coffee ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <Coffee className="h-4 w-4 mr-1.5" /> Machine à café</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <Coffee className="h-4 w-4 mr-1.5 text-muted-foreground" /> Machine à café</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.kitchen ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <UtensilsCrossed className="h-4 w-4 mr-1.5" /> Cuisine</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <UtensilsCrossed className="h-4 w-4 mr-1.5 text-muted-foreground" /> Cuisine</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.printers ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <PrinterIcon className="h-4 w-4 mr-1.5" /> Imprimantes</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <PrinterIcon className="h-4 w-4 mr-1.5 text-muted-foreground" /> Imprimantes</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.secured ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <ShieldCheck className="h-4 w-4 mr-1.5" /> Sécurisé</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <ShieldCheck className="h-4 w-4 mr-1.5 text-muted-foreground" /> Sécurisé</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.reception ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <BadgeCheck className="h-4 w-4 mr-1.5" /> Réception</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <BadgeCheck className="h-4 w-4 mr-1.5 text-muted-foreground" /> Réception</>
                      )}
                    </div>
                    <div className="flex items-center">
                      {property.accessible ? (
                        <><Check className="h-5 w-5 text-green-500 mr-2" /> <AccessibilityIcon className="h-4 w-4 mr-1.5" /> Accessible PMR</>
                      ) : (
                        <><X className="h-5 w-5 text-red-500 mr-2" /> <AccessibilityIcon className="h-4 w-4 mr-1.5 text-muted-foreground" /> Accessible PMR</>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 border rounded-lg p-4">
                <h3 className="font-semibold">Disponibilité</h3>
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">Type de propriété</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {property.property_type === 'office' ? 'Espace professionnel' : 'Propriété résidentielle'}
                    </div>
                  </div>
                </div>
                <Separator />
                {isOfficeProperty && (
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">Horaires</div>
                      {property.flexible_hours ? (
                        <div className="text-sm text-green-600 flex items-center mt-1">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Accès 24h/24 et 7j/7</span>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground mt-1">
                          Lundi - Vendredi: 9h - 19h
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <DialogFooter className="mt-6 flex justify-between items-center">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
              <Button onClick={handleUpdateProperty}>Enregistrer les modifications</Button>
            </>
          ) : (
            <>
              {isOwner && (
                <div className="flex space-x-2">
                  {canDelete('properties') && (
                    <Button variant="destructive" onClick={handleDelete}>
                      Supprimer
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Modifier
                  </Button>
                </div>
              )}
              <Button onClick={handleClose}>Fermer</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
