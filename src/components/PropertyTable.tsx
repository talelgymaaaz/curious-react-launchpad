
/**
 * PropertyTable.tsx
 * 
 * Description (FR):
 * Ce composant affiche les propriétés immobilières sous forme de tableau.
 * Il présente les informations essentielles des propriétés de manière structurée
 * et permet des actions comme la navigation vers les détails, la modification ou la suppression.
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
  Bed, 
  Bath, 
  Square, 
  BookOpen
} from 'lucide-react';
import { PropertyData } from '@/components/PropertyCard';
import { cn } from '@/lib/utils';

/**
 * Interface pour les propriétés du composant PropertyTable
 */
interface PropertyTableProps {
  /**
   * Tableau de données des propriétés à afficher
   */
  properties: PropertyData[];
  
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
 * Composant tableau pour les propriétés
 * 
 * Affiche les propriétés avec leurs caractéristiques principales sous forme de tableau:
 * - Image et titre
 * - Adresse et type
 * - Prix et statut
 * - Caractéristiques (chambres, salles de bain, surface)
 * - Actions disponibles (voir détails, modifier, supprimer)
 */
export const PropertyTable: React.FC<PropertyTableProps> = ({
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

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">Propriété</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Prix/nuit</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Caractéristiques</TableHead>
            <TableHead>Note</TableHead>
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
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center" title="Chambres">
                      <Bed className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center" title="Salles de bain">
                      <Bath className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center" title="Surface">
                      <Square className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      {property.area} m²
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/properties/${property.id}`)}>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                    <span>{property.rating.toFixed(1)}</span>
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
