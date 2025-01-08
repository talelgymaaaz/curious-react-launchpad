export const getAvailableStockForSize = (product: any, size: string): number => {
  const sizeMapping: { [key: string]: string } = {
    'S': 's_size',
    'M': 'm_size',
    'L': 'l_size',
    'XL': 'xl_size',
    'XXL': 'xxl_size',
    'XXL2': 'xxl2_size'
  };

  const sizeKey = sizeMapping[size];
  return sizeKey ? parseInt(product[sizeKey] || '0') : 0;
};

export const getTotalStock = (product: any): number => {
  return parseInt(product.qnty_product || '0');
};