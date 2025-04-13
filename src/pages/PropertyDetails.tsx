
/**
 * PropertyDetails.tsx
 * 
 * Description (FR):
 * Page de détails d'une propriété, affichant toutes les informations
 * relatives à un espace de travail spécifique.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Building2, 
  Wifi, 
  ParkingCircle, 
  Coffee, 
  Users, 
  Monitor, 
  Check, 
  X,
  Briefcase,
  CalendarClock,
  UtensilsCrossed,
  PrinterIcon,
  BadgeCheck,
  AccessibilityIcon,
  ShieldCheck,
  Share2,
  Download,
  BookmarkPlus,
  Phone
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { propertyApi, Property } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { canDelete } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log("Fetching property with ID:", id);
        const propertyData = await propertyApi.getPropertyById(id);
        console.log("Fetched property:", propertyData);
        setProperty(propertyData);
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails de la propriété",
          variant: "destructive",
        });
        // Redirect back to properties list on error
        navigate('/properties');
      } finally {
        // Use a small timeout to prevent layout shift
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    // Pre-load image to prevent flickering
    if (id && !loading && property?.image_url) {
      const img = new Image();
      img.src = property.image_url;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImgError(true);
    }

    fetchProperty();
  }, [id, toast, navigate]);

  const handleDelete = async () => {
    if (!id || !property || !canDelete('properties')) return;
    
    try {
      await propertyApi.deleteProperty(id);
      toast({
        title: "Propriété supprimée",
        description: "La propriété a été supprimée avec succès",
      });
      navigate('/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la propriété",
        variant: "destructive",
      });
    }
  };

  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-10 w-64" />
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-background shadow-md border border-border/30">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[300px] rounded-lg shadow-sm" />
            <Skeleton className="h-[300px] rounded-lg shadow-sm" />
            <Skeleton className="h-[300px] rounded-lg shadow-sm" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="text-center py-16 bg-background rounded-lg shadow-sm border border-border/20 animate-fade-in">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground/50" />
          <h2 className="text-2xl font-bold mt-4">Propriété non trouvée</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">La propriété que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button className="mt-6" onClick={() => navigate('/properties')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux Propriétés
          </Button>
        </div>
      </Layout>
    );
  }

  const statusStyle = statusColors[property.status as keyof typeof statusColors] || statusColors.available;
  const isOfficeProperty = property.property_type === 'office';

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header with back button, title and actions */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-background p-4 rounded-lg shadow-sm border border-border/20">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="shrink-0" onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span className="text-sm md:text-base">{property.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 self-start md:self-auto">
            <Badge className={cn("px-3 py-1.5 rounded-md font-medium", statusStyle.bg, statusStyle.text)}>
              {statusStyle.label}
            </Badge>
            {canDelete('properties') && (
              <Button variant="destructive" size="sm" className="h-9" onClick={handleDelete}>
                Supprimer
              </Button>
            )}
          </div>
        </div>

        {/* Property image with gradient overlay */}
        <div className="relative overflow-hidden rounded-xl bg-background shadow-md border border-border/30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
          
          {/* Image container with aspect ratio */}
          <AspectRatio ratio={16/9} className="bg-muted">
            {!imageLoaded && !imgError && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-xl" />
            )}
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Building2 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Image non disponible</span>
              </div>
            ) : (
              <img
                src={property.image_url}
                alt={property.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImgError(true)}
              />
            )}
          </AspectRatio>
          
          {/* Price badge overlaid on image */}
          <div className="absolute bottom-4 right-4 z-20">
            <Badge className="px-3 py-2 text-lg font-semibold bg-primary/90 text-primary-foreground rounded-md shadow-lg">
              {property.price}€ <span className="text-sm font-normal opacity-90">/ jour</span>
            </Badge>
          </div>
          
          {/* Action buttons overlaid on image */}
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
            <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full w-9 h-9">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full w-9 h-9">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Property details cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Information Card */}
          <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary" />
                Informations de Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline" className="font-medium">{property.type}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Prix</span>
                <span className="font-medium text-lg text-primary">{property.price}€ / jour</span>
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
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Surface</span>
                <span className="font-medium">{property.area} m²</span>
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
            </CardContent>
          </Card>

          {/* Amenities Card */}
          {isOfficeProperty && (
            <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2 text-primary" />
                  Équipements
                </CardTitle>
                <CardDescription>Équipements disponibles pour cet espace</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                  <div className="flex items-center">
                    {property.wifi ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <Wifi className="h-4 w-4 mr-1.5" /> 
                          <span>WiFi</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <Wifi className="h-4 w-4 mr-1.5" /> 
                          <span>WiFi</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.parking ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <ParkingCircle className="h-4 w-4 mr-1.5" /> 
                          <span>Parking</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <ParkingCircle className="h-4 w-4 mr-1.5" /> 
                          <span>Parking</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.coffee ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <Coffee className="h-4 w-4 mr-1.5" /> 
                          <span>Machine à café</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <Coffee className="h-4 w-4 mr-1.5" /> 
                          <span>Machine à café</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.kitchen ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <UtensilsCrossed className="h-4 w-4 mr-1.5" /> 
                          <span>Cuisine</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <UtensilsCrossed className="h-4 w-4 mr-1.5" /> 
                          <span>Cuisine</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.printers ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <PrinterIcon className="h-4 w-4 mr-1.5" /> 
                          <span>Imprimantes</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <PrinterIcon className="h-4 w-4 mr-1.5" /> 
                          <span>Imprimantes</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.secured ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-1.5" /> 
                          <span>Sécurisé</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-1.5" /> 
                          <span>Sécurisé</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.reception ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-1.5" /> 
                          <span>Réception</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-1.5" /> 
                          <span>Réception</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {property.accessible ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <AccessibilityIcon className="h-4 w-4 mr-1.5" /> 
                          <span>Accessible PMR</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="rounded-full bg-muted p-1">
                          <X className="h-4 w-4" />
                        </div>
                        <div className="flex items-center">
                          <AccessibilityIcon className="h-4 w-4 mr-1.5" /> 
                          <span>Accessible PMR</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking and Availability Card */}
          <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-2 text-primary" />
                Réservation
              </CardTitle>
              <CardDescription>Horaires et disponibilité de l'espace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <div className="font-medium">Horaires</div>
                  {isOfficeProperty && property.flexible_hours ? (
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      <CalendarClock className="h-4 w-4 mr-1.5" />
                      <span>Accès 24h/24 et 7j/7</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">
                      Lundi - Vendredi: 9h - 19h<br />
                      Samedi: 10h - 17h<br />
                      Dimanche: Fermé
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <div className="font-medium">Statut actuel</div>
                  <div className="text-sm mt-1">
                    <Badge className={cn("mt-1 font-medium", statusStyle.bg, statusStyle.text)}>
                      {statusStyle.label}
                    </Badge>
                    <p className="mt-2 text-muted-foreground">
                      {statusStyle.label === 'Disponible' 
                        ? "Cet espace est prêt à être réservé." 
                        : statusStyle.label === 'Réservé' 
                          ? "Cet espace est actuellement réservé."
                          : "Cet espace est en maintenance."}
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 mt-1 text-primary shrink-0" />
                <div>
                  <div className="font-medium">Type de propriété</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {property.property_type === 'office' ? 'Espace professionnel' : 'Propriété résidentielle'}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Réserver cet espace
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Contacter le propriétaire
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Description card */}
        <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="bg-muted/30">
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              {property.description || 
                `Cet espace ${property.type} est situé à ${property.address} et offre une surface de ${property.area} m². 
                Il est équipé de ${property.workstations} postes de travail et ${property.meeting_rooms} salles de réunion.
                L'espace est idéal pour les professionnels cherchant un environnement de travail ${property.wifi ? 'connecté' : ''} 
                ${property.coffee ? 'et convivial' : ''}.`
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PropertyDetails;
