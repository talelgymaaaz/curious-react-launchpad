
/**
 * OfficePropertyTable.tsx
 * 
 * Description (FR):
 * Ce composant affiche les propriétés de type bureau sous forme de tableau.
 * Il est spécialisé pour les espaces professionnels avec des colonnes adaptées
 * comme les postes de travail, les salles de réunion et les équipements.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Edit, 
  Trash, 
  Star, 
  MapPin, 
  Building, 
  Users, 
  Monitor,
  Wifi,
  ParkingCircle,
  Coffee,
  CalendarClock,
  Check,
  X
} from 'lucide-react';
import { OfficePropertyData } from './OfficePropertyCard';
import { cn } from '@/lib/utils';

/**
 * Interface pour les propriétés du composant OfficePropertyTable
 */
interface OfficePropertyTableProps {
  /**
   * Tableau de données des propriétés de bureau à afficher
   */
  properties: OfficePropertyData[];
  
  /**
   * Fonction de rappel pour gérer la suppression d'une propriété
   * @param id Identifiant de la propriété à supprimer
   */
  onDelete?: (id: string) => void;
  
  /**
   * Fonction de rappel pour gérer la modification d'une propriété
   * @param id Identifiant de la propriété à modifier
   */
  onEdit?: (id: string) => void;
  
  /**
   * Détermine si les actions (édition, suppression) sont affichées
   */
  showActions?: boolean;
}

/**
 * Composant tableau pour les propriétés de type bureau
 * 
 * Affiche les propriétés avec leurs caractéristiques spécifiques aux bureaux:
 * - Nombre de postes de travail
 * - Salles de réunion
 * - Surface
 * - Équipements (WiFi, parking, café)
 * - Horaires flexibles
 */
export const OfficePropertyTable: React.FC<OfficePropertyTableProps> = ({
  properties,
  onDelete,
  onEdit,
  showActions = true
}) => {
  const navigate = useNavigate();

  // Configuration des styles de couleur pour les différents statuts
  const statusColors = {
    available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponible' },
    booked: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Réservé' },
    maintenance: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Maintenance' }
  };

  // Génération de la liste des équipements pour l'infobulle
  const getAmenitiesList = (amenities: OfficePropertyData['amenities']) => {
    const list = [];
    if (amenities.wifi) list.push('WiFi haut débit');
    if (amenities.parking) list.push('Parking');
    if (amenities.coffee) list.push('Machine à café');
    if (amenities.reception) list.push('Réception');
    if (amenities.secured) list.push('Accès sécurisé');
    if (amenities.accessible) list.push('Accessibilité PMR');
    if (amenities.printers) list.push('Imprimantes/scanners');
    if (amenities.kitchen) list.push('Cuisine équipée');
    return list.join(', ');
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">Espace de Travail</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix/jour</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Capacité</TableHead>
            <TableHead>Équipements</TableHead>
            <TableHead>Horaires</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => {
            const statusStyle = statusColors[property.status];
            
            return (
              <TableRow key={property.id} className="cursor-pointer hover:bg-slate-50">
                <TableCell className="font-medium" onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                      <img 
                        src={property.imageUrl} 
                        alt={property.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{property.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[200px]">{property.address}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    {property.type}
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="font-medium">{property.price} €</div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <Badge className={cn("font-normal", statusStyle.bg, statusStyle.text)}>
                    {statusStyle.label}
                  </Badge>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm" title="Postes de travail">
                      <Monitor className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {property.workstations} postes
                    </div>
                    <div className="flex items-center text-sm" title="Salles de réunion">
                      <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {property.meetingRooms} salles
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex items-center space-x-2" title={getAmenitiesList(property.amenities)}>
                    {property.amenities.wifi && (
                      <Wifi className="h-4 w-4 text-green-500" />
                    )}
                    {property.amenities.parking && (
                      <ParkingCircle className="h-4 w-4 text-green-500" />
                    )}
                    {property.amenities.coffee && (
                      <Coffee className="h-4 w-4 text-green-500" />
                    )}
                    {Object.values(property.amenities).filter(v => v).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{Object.values(property.amenities).filter(v => v).length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    {property.flexibleHours ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="h-3.5 w-3.5 mr-0.5" /> 24/7
                      </span>
                    ) : (
                      <span className="text-slate-600 flex items-center">
                        <X className="h-3.5 w-3.5 mr-0.5" /> Standard
                      </span>
                    )}
                  </div>
                </TableCell>
                {showActions && (
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/properties/${property.id}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(property.id);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(property.id);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
