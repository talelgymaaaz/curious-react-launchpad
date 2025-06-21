
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - will be replaced with real API calls
  const mockClients = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@email.com',
      telephone: '+33123456789',
      adresse: '123 Rue de la Paix',
      ville: 'Paris',
      code_postal: '75001',
      pays: 'France',
      date_creation: '2024-01-15T10:30:00Z',
      total_orders: 3,
      total_spent: 2850.00,
      last_order: '2024-01-20T14:20:00Z'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@email.com',
      telephone: '+33987654321',
      adresse: '456 Avenue des Champs',
      ville: 'Lyon',
      code_postal: '69001',
      pays: 'France',
      date_creation: '2024-01-10T09:15:00Z',
      total_orders: 1,
      total_spent: 430.00,
      last_order: '2024-01-16T14:20:00Z'
    },
    {
      id: 3,
      nom: 'Dubois',
      prenom: 'Pierre',
      email: 'pierre.dubois@email.com',
      telephone: '+33123987654',
      adresse: '789 Boulevard Saint-Germain',
      ville: 'Marseille',
      code_postal: '13001',
      pays: 'France',
      date_creation: '2023-12-20T16:45:00Z',
      total_orders: 7,
      total_spent: 5620.00,
      last_order: '2024-01-18T11:30:00Z'
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientStatus = (totalOrders: number) => {
    if (totalOrders >= 5) return { label: 'VIP', variant: 'default' as const };
    if (totalOrders >= 2) return { label: 'Fidèle', variant: 'secondary' as const };
    return { label: 'Nouveau', variant: 'outline' as const };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">
                Gestion des Clients
              </h1>
              <p className="text-gray-600 mt-1">
                Base de données clients et informations de contact
              </p>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Total Clients
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockClients.length}</div>
              <p className="text-xs text-blue-600">
                +12% ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">
                Clients VIP
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {mockClients.filter(c => c.total_orders >= 5).length}
              </div>
              <p className="text-xs text-green-600">
                Clients premium
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
              <div className="text-2xl font-bold text-purple-900">8</div>
              <p className="text-xs text-purple-600">
                +33% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                Panier Moyen
              </CardTitle>
              <Mail className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">€157</div>
              <p className="text-xs text-orange-600">
                Par client
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="font-playfair text-gray-900">
                  Liste des Clients
                </CardTitle>
                <CardDescription>
                  Informations de contact et historique des achats
                </CardDescription>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un client..."
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
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead>Total Dépensé</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière Commande</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => {
                    const status = getClientStatus(client.total_orders);
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {client.prenom} {client.nom}
                            </div>
                            <div className="text-sm text-gray-500">
                              Client depuis {new Date(client.date_creation).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="mr-2 h-3 w-3 text-gray-400" />
                              {client.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-2 h-3 w-3 text-gray-400" />
                              {client.telephone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start text-sm">
                            <MapPin className="mr-2 h-3 w-3 text-gray-400 mt-1" />
                            <div>
                              <div>{client.adresse}</div>
                              <div className="text-gray-500">
                                {client.code_postal} {client.ville}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {client.total_orders}
                        </TableCell>
                        <TableCell className="font-semibold">
                          €{client.total_spent.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(client.last_order).toLocaleDateString('fr-FR')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminClients;
