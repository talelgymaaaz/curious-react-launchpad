
/**
 * Documentation.tsx
 * 
 * Description (FR):
 * Cette page fournit une documentation détaillée de tous les fichiers et composants
 * du projet. Elle est destinée aux développeurs et aux utilisateurs techniques qui
 * souhaitent comprendre la structure et le fonctionnement de l'application.
 */

import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FileText, Download, Code, Layers, Database, Layout as LayoutIcon } from 'lucide-react';

const Documentation = () => {
  // Fonction pour générer un PDF de la documentation
  const handleGeneratePDF = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl print:py-2">
        <div className="flex justify-between items-center mb-6 print:mb-2">
          <h1 className="text-3xl font-bold text-primary">Documentation DARIAPP</h1>
          <Button onClick={handleGeneratePDF} className="print:hidden gap-2">
            <Download size={18} /> Télécharger PDF
          </Button>
        </div>
        
        <Tabs defaultValue="structure" className="print:block">
          <TabsList className="print:hidden mb-6">
            <TabsTrigger value="structure"><Layers className="mr-2 h-4 w-4" /> Structure</TabsTrigger>
            <TabsTrigger value="components"><LayoutIcon className="mr-2 h-4 w-4" /> Composants</TabsTrigger>
            <TabsTrigger value="pages"><FileText className="mr-2 h-4 w-4" /> Pages</TabsTrigger>
            <TabsTrigger value="api"><Database className="mr-2 h-4 w-4" /> API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structure" className="print:block">
            <div className="print:hidden">
              <h2 className="text-2xl font-semibold mb-4">Structure du Projet</h2>
              <p className="mb-4 text-muted-foreground">
                Cette section décrit l'organisation générale du projet et la fonction de chaque dossier principal.
              </p>
            </div>
            
            <div className="print:mt-8">
              <h3 className="text-xl font-semibold mb-3 print:text-2xl print:mt-4">Organisation des Dossiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/components</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient tous les composants réutilisables de l'application, comme les cartes, les tableaux, 
                    les formulaires et les éléments d'interface utilisateur.
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/pages</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient les pages principales de l'application, chaque fichier représentant 
                    une route distincte dans l'application.
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/context</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient les contextes React pour gérer l'état global, comme l'authentification 
                    et l'état de la barre latérale.
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/hooks</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient les hooks personnalisés pour la réutilisation de la logique, 
                    comme la détection des appareils mobiles et la gestion des notifications.
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/lib</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient des utilitaires et des fonctions d'aide générales utilisés dans toute l'application.
                  </p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-medium flex items-center"><Code className="mr-2 h-5 w-5" /> src/services</h4>
                  <p className="mt-2 text-muted-foreground">
                    Contient les services pour interagir avec les API externes et gérer les requêtes réseau.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="print:block print:mt-8">
            <div className="print:hidden">
              <h2 className="text-2xl font-semibold mb-4">Composants</h2>
              <p className="mb-4 text-muted-foreground">
                Cette section décrit les principaux composants réutilisables de l'application.
              </p>
            </div>
            
            <ScrollArea className="h-[600px] pr-4 print:h-auto">
              <Accordion type="single" collapsible className="print:block">
                <AccordionItem value="office-property-card" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    OfficePropertyCard
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/components/OfficePropertyCard.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Ce composant affiche une propriété de type bureau sous forme de carte. 
                        Il est spécialisé pour les espaces professionnels avec des caractéristiques
                        spécifiques comme les postes de travail, internet, salles de réunion, etc.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Affichage des informations clés de la propriété (titre, adresse, prix)</li>
                        <li>Affichage des équipements disponibles sous forme de badges</li>
                        <li>Indicateur visuel de statut (disponible, réservé, maintenance)</li>
                        <li>Interactions (clic pour voir les détails, bouton de suppression)</li>
                        <li>Animations et effets visuels au survol</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="layout" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Layout
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/components/Layout.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Ce composant définit la mise en page principale de l'application.
                        Il intègre la barre latérale (Sidebar) et organise la structure de base
                        des pages avec une gestion responsive pour différentes tailles d'écran.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Structure de base avec barre latérale et zone de contenu principal</li>
                        <li>Ajustement dynamique en fonction de l'état de la barre latérale</li>
                        <li>Design responsive pour différentes tailles d'écran</li>
                        <li>Animation de transition pour les changements de page</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="private-route" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    PrivateRoute
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/components/PrivateRoute.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Ce composant protège les routes qui nécessitent une authentification.
                        Il vérifie si l'utilisateur est authentifié, gère les redirections et vérifie les permissions d'accès.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Vérification de l'authentification de l'utilisateur</li>
                        <li>Redirection vers la page de connexion si non authentifié</li>
                        <li>Vérification des permissions d'accès basées sur le rôle</li>
                        <li>Affichage d'un indicateur de chargement pendant la vérification</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ui-components" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Composants UI
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Dossier :</strong> src/components/ui/
                      </p>
                      <p>
                        <strong>Description :</strong> Ce dossier contient tous les composants d'interface utilisateur
                        réutilisables basés sur la bibliothèque shadcn/ui.
                      </p>
                      <p>
                        <strong>Composants principaux :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>button.tsx</strong> - Boutons avec différentes variantes et tailles</li>
                        <li><strong>card.tsx</strong> - Cartes pour afficher des informations structurées</li>
                        <li><strong>toast.tsx</strong> - Notifications temporaires</li>
                        <li><strong>dialog.tsx</strong> - Fenêtres modales pour les interactions</li>
                        <li><strong>tabs.tsx</strong> - Navigation par onglets</li>
                        <li><strong>form.tsx</strong> - Composants de formulaire</li>
                        <li><strong>dropdown-menu.tsx</strong> - Menus déroulants</li>
                        <li><strong>accordion.tsx</strong> - Sections repliables</li>
                      </ul>
                      <p className="text-muted-foreground mt-2">
                        Ces composants utilisent Radix UI pour l'accessibilité et sont stylisés avec Tailwind CSS
                        pour maintenir une apparence cohérente dans toute l'application.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="pages" className="print:block print:mt-8">
            <div className="print:hidden">
              <h2 className="text-2xl font-semibold mb-4">Pages</h2>
              <p className="mb-4 text-muted-foreground">
                Cette section décrit les principales pages de l'application.
              </p>
            </div>
            
            <ScrollArea className="h-[600px] pr-4 print:h-auto">
              <Accordion type="single" collapsible className="print:block">
                <AccordionItem value="dashboard" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Dashboard
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/Dashboard.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page d'accueil principale après connexion, affichant un aperçu 
                        des principales métriques et activités de l'application.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Cartes de statistiques pour les métriques clés</li>
                        <li>Graphiques d'activité récente</li>
                        <li>Liste des dernières réservations</li>
                        <li>Aperçu des propriétés populaires</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="properties" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Properties
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/Properties.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page listant toutes les propriétés disponibles avec des options 
                        de filtrage et de recherche.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Affichage des propriétés en mode grille ou tableau</li>
                        <li>Filtres pour type de propriété, statut, etc.</li>
                        <li>Recherche par mot-clé ou adresse</li>
                        <li>Tri par différents critères</li>
                        <li>Pagination pour gérer de grandes listes</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="property-details" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    PropertyDetails
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/PropertyDetails.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page détaillée d'une propriété spécifique, affichant toutes les 
                        informations pertinentes et les options de réservation.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Galerie d'images de la propriété</li>
                        <li>Informations détaillées (superficie, équipements, prix)</li>
                        <li>Disponibilité et calendrier de réservation</li>
                        <li>Avis et évaluations des utilisateurs précédents</li>
                        <li>Informations de localisation et carte</li>
                        <li>Formulaire ou bouton de réservation</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="bookings" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Bookings
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/Bookings.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page de gestion des réservations, affichant les réservations actuelles, 
                        passées et futures.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Liste des réservations avec filtres par statut</li>
                        <li>Détails de chaque réservation</li>
                        <li>Options d'annulation ou de modification</li>
                        <li>Historique des réservations passées</li>
                        <li>Système de facturation et paiement</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="users" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Users
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/Users.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page de gestion des utilisateurs, réservée aux administrateurs, 
                        permettant de voir et de gérer tous les utilisateurs du système.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Liste complète des utilisateurs</li>
                        <li>Filtrage par rôle ou statut</li>
                        <li>Modification des informations utilisateur</li>
                        <li>Gestion des droits d'accès</li>
                        <li>Désactivation ou suppression de comptes</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="login" className="print:border-0 print:mb-4">
                  <AccordionTrigger className="text-lg print:no-underline print:hover:no-underline">
                    Login
                  </AccordionTrigger>
                  <AccordionContent className="print:block">
                    <div className="space-y-3">
                      <p>
                        <strong>Fichier :</strong> src/pages/Login.tsx
                      </p>
                      <p>
                        <strong>Description :</strong> Page d'authentification permettant aux utilisateurs de se connecter 
                        à l'application.
                      </p>
                      <p>
                        <strong>Fonctionnalités :</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Formulaire de connexion avec validation</li>
                        <li>Option "Se souvenir de moi"</li>
                        <li>Réinitialisation de mot de passe</li>
                        <li>Lien vers la création de compte</li>
                        <li>Authentification avec fournisseurs externes (si applicable)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="api" className="print:block print:mt-8">
            <div className="print:hidden">
              <h2 className="text-2xl font-semibold mb-4">API et Services</h2>
              <p className="mb-4 text-muted-foreground">
                Cette section décrit les services et APIs utilisés dans l'application.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 print:shadow-none">
              <h3 className="text-xl font-semibold mb-4">API Utilisateurs</h3>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                    <span className="font-bold">/api/users</span>
                  </div>
                  <p className="text-gray-600 mb-2">Récupère la liste de tous les utilisateurs</p>
                  <p className="text-sm text-muted-foreground">
                    Renvoie un tableau d'objets utilisateur avec leurs informations de base.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                    <span className="font-bold">/api/users/:id</span>
                  </div>
                  <p className="text-gray-600 mb-2">Récupère les informations d'un utilisateur spécifique</p>
                  <p className="text-sm text-muted-foreground">
                    Prend un ID en paramètre et renvoie les détails de cet utilisateur.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                    <span className="font-bold">/api/users/register</span>
                  </div>
                  <p className="text-gray-600 mb-2">Crée un nouvel utilisateur</p>
                  <p className="text-sm text-muted-foreground">
                    Accepte les informations d'un nouvel utilisateur et crée un compte.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                    <span className="font-bold">/api/users/login</span>
                  </div>
                  <p className="text-gray-600 mb-2">Authentifie un utilisateur</p>
                  <p className="text-sm text-muted-foreground">
                    Vérifie les identifiants et renvoie un token d'authentification.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 print:shadow-none">
              <h3 className="text-xl font-semibold mb-4">API Propriétés</h3>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                    <span className="font-bold">/api/properties</span>
                  </div>
                  <p className="text-gray-600 mb-2">Récupère la liste de toutes les propriétés</p>
                  <p className="text-sm text-muted-foreground">
                    Supporte des paramètres de filtrage comme le type, le statut, etc.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                    <span className="font-bold">/api/properties/:id</span>
                  </div>
                  <p className="text-gray-600 mb-2">Récupère les détails d'une propriété spécifique</p>
                  <p className="text-sm text-muted-foreground">
                    Renvoie toutes les informations sur une propriété, y compris les disponibilités.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                    <span className="font-bold">/api/properties</span>
                  </div>
                  <p className="text-gray-600 mb-2">Ajoute une nouvelle propriété</p>
                  <p className="text-sm text-muted-foreground">
                    Accepte les détails d'une nouvelle propriété et la crée dans le système.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono mr-2">PUT</span>
                    <span className="font-bold">/api/properties/:id</span>
                  </div>
                  <p className="text-gray-600 mb-2">Modifie une propriété existante</p>
                  <p className="text-sm text-muted-foreground">
                    Met à jour les informations d'une propriété identifiée par son ID.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md print:shadow-none">
              <h3 className="text-xl font-semibold mb-4">API Réservations</h3>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono mr-2">GET</span>
                    <span className="font-bold">/api/bookings</span>
                  </div>
                  <p className="text-gray-600 mb-2">Récupère la liste des réservations</p>
                  <p className="text-sm text-muted-foreground">
                    Filtre par utilisateur, propriété ou période.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono mr-2">POST</span>
                    <span className="font-bold">/api/bookings</span>
                  </div>
                  <p className="text-gray-600 mb-2">Crée une nouvelle réservation</p>
                  <p className="text-sm text-muted-foreground">
                    Enregistre une réservation pour une propriété sur une période donnée.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-mono mr-2">DELETE</span>
                    <span className="font-bold">/api/bookings/:id</span>
                  </div>
                  <p className="text-gray-600 mb-2">Annule une réservation</p>
                  <p className="text-sm text-muted-foreground">
                    Supprime une réservation existante du système.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t print:hidden">
          <h2 className="text-xl font-semibold mb-3">Informations Techniques</h2>
          <p className="text-muted-foreground">
            Cette application est construite avec les technologies suivantes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>React pour le développement de l'interface utilisateur</li>
            <li>TypeScript pour un typage statique</li>
            <li>Tailwind CSS pour la stylisation</li>
            <li>Shadcn/UI pour les composants d'interface utilisateur</li>
            <li>React Router pour la navigation</li>
            <li>React Query pour la gestion des données</li>
            <li>Lucide React pour les icônes</li>
            <li>Recharts pour les visualisations de données</li>
          </ul>
        </div>
        
        <div className="print:hidden text-center text-sm text-muted-foreground mt-12">
          Documentation générée le {new Date().toLocaleDateString('fr-FR')} - DARIAPP v1.0
        </div>
        
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 1.5cm;
            }
            body {
              font-size: 12pt;
              color: black;
              background: white;
            }
            h1 {
              font-size: 24pt;
            }
            h2 {
              font-size: 20pt;
            }
            h3 {
              font-size: 16pt;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Documentation;
