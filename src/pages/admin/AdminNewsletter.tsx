
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Download,
  Mail,
  Send,
  Users,
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';

const AdminNewsletter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Mock data - will be replaced with real API calls
  const mockSubscribers = [
    {
      id: 1,
      email: 'jean.dupont@email.com',
      date_inscription: '2024-01-15T10:30:00Z',
      status: 'active',
      source: 'website'
    },
    {
      id: 2,
      email: 'marie.martin@email.com',
      date_inscription: '2024-01-10T09:15:00Z',
      status: 'active',
      source: 'checkout'
    },
    {
      id: 3,
      email: 'pierre.dubois@email.com',
      date_inscription: '2023-12-20T16:45:00Z',
      status: 'unsubscribed',
      source: 'website'
    },
    {
      id: 4,
      email: 'sophie.bernard@email.com',
      date_inscription: '2024-01-18T14:20:00Z',
      status: 'active',
      source: 'social'
    }
  ];

  const filteredSubscribers = mockSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'Actif', variant: 'default' as const },
      unsubscribed: { label: 'Désabonné', variant: 'destructive' as const },
      bounced: { label: 'Rebond', variant: 'secondary' as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getSourceBadge = (source: string) => {
    const sourceMap = {
      website: { label: 'Site Web', variant: 'outline' as const },
      checkout: { label: 'Commande', variant: 'secondary' as const },
      social: { label: 'Réseaux', variant: 'outline' as const }
    };
    
    const sourceInfo = sourceMap[source as keyof typeof sourceMap] || { label: source, variant: 'outline' as const };
    return <Badge variant={sourceInfo.variant}>{sourceInfo.label}</Badge>;
  };

  const activeSubscribers = mockSubscribers.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">
                Newsletter
              </h1>
              <p className="text-gray-600 mt-1">
                Gestion des abonnés et campagnes email
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800">
                <Send className="mr-2 h-4 w-4" />
                Nouvelle Campagne
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Total Abonnés
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockSubscribers.length}</div>
              <p className="text-xs text-blue-600">
                +18% ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">
                Abonnés Actifs
              </CardTitle>
              <Mail className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{activeSubscribers}</div>
              <p className="text-xs text-green-600">
                {Math.round((activeSubscribers / mockSubscribers.length) * 100)}% du total
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">
                Nouveaux ce Mois
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">12</div>
              <p className="text-xs text-purple-600">
                +25% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                Taux d'Ouverture
              </CardTitle>
              <Send className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">68%</div>
              <p className="text-xs text-orange-600">
                Dernière campagne
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Composition */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-playfair text-gray-900">
              Composer une Newsletter
            </CardTitle>
            <CardDescription>
              Créez et envoyez une nouvelle campagne email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Objet de l'email
                </label>
                <Input placeholder="Ex: Nouvelle Collection Automne/Hiver" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Expéditeur
                </label>
                <Input placeholder="LUCCI BY E.Y <contact@lucci.com>" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Message
              </label>
              <Textarea 
                placeholder="Rédigez votre newsletter ici..."
                className="h-32"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                Prévisualiser
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800">
                <Send className="mr-2 h-4 w-4" />
                Envoyer à {activeSubscribers} abonnés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Subscriber */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-playfair text-gray-900">
              Ajouter un Abonné
            </CardTitle>
            <CardDescription>
              Ajouter manuellement une adresse email à la liste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="email@exemple.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-gray-900 hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="font-playfair text-gray-900">
                  Liste des Abonnés
                </CardTitle>
                <CardDescription>
                  Gérez votre base d'abonnés newsletter
                </CardDescription>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Date d'Inscription</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">
                        {subscriber.email}
                      </TableCell>
                      <TableCell>
                        {new Date(subscriber.date_inscription).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        {getSourceBadge(subscriber.source)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(subscriber.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminNewsletter;
