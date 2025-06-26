
export interface OrderDetails {
  id_order: number;
  numero_commande: string;
  sous_total_order: number;
  discount_amount_order: number;
  delivery_cost_order: number;
  total_order: number;
  status_order: string;
  date_creation_order: string;
  date_livraison_souhaitee?: string;
  payment_method?: string;
  notes_order?: string;
  customer: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    code_postal: string;
    pays: string;
  };
  items: Array<{
    nom_product_snapshot: string;
    reference_product_snapshot: string;
    price_product_snapshot: number;
    size_selected?: string;
    color_selected?: string;
    quantity_ordered: number;
    discount_item: number;
    total_item: number;
  }>;
  delivery_address?: {
    nom_destinataire: string;
    prenom_destinataire: string;
    telephone_destinataire?: string;
    adresse_livraison: string;
    ville_livraison: string;
    code_postal_livraison: string;
    pays_livraison: string;
    instructions_livraison?: string;
  };
}

export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
  try {
    const response = await fetch(`/api/get_single_order.php?id=${orderId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch order details');
    }

    return result.data.order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};
