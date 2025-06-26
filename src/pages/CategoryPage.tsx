import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { trackVisitor } from '@/utils/visitorTracking';
import CategoryBreadcrumb from '@/components/category/CategoryBreadcrumb';
import CategoryProducts from '@/components/category/CategoryProducts';
import CategoryPagination from '@/components/category/CategoryPagination';

const CategoryPage = () => {
  const { t } = useTranslation(['products']);
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  
  const itemsPerPage = 8;

  // Extract itemgroup from subcategory (e.g., "homme-blazers" -> "blazers")
  const getItemGroup = (subcategory: string | undefined): string | undefined => {
    if (!subcategory) return undefined;
    
    // Handle the pattern "gender-itemtype" by extracting just the itemtype
    const parts = subcategory.split('-');
    if (parts.length === 2 && (parts[0] === 'homme' || parts[0] === 'femme')) {
      return parts[1]; // Return just the item type (e.g., "blazers")
    }
    
    // For other patterns, return as is
    return subcategory;
  };

  useEffect(() => {
    trackVisitor(`Category: ${category}/${subcategory || 'all'}`);
    fetchProducts();
  }, [category, subcategory, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * itemsPerPage;
      
      // Build API URL with proper parameters
      const apiUrl = new URL('https://draminesaid.com/lucci/api/get_products_by_category.php');
      if (category) apiUrl.searchParams.set('category', category);
      
      // Extract the actual itemgroup from subcategory
      const itemGroup = getItemGroup(subcategory);
      if (itemGroup) {
        apiUrl.searchParams.set('subcategory', itemGroup);
      }
      
      apiUrl.searchParams.set('limit', itemsPerPage.toString());
      apiUrl.searchParams.set('offset', offset.toString());
      
      console.log('Fetching products from:', apiUrl.toString());
      console.log('Original subcategory:', subcategory, 'Extracted itemgroup:', itemGroup);
      
      const response = await fetch(apiUrl.toString());
      const result = await response.json();
      
      console.log('API response:', result);
      
      if (result.success) {
        setProducts(result.data);
        setTotal(result.total);
      } else {
        console.error('API error:', result.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const getCategoryTitle = () => {
    if (!category) return '';
    
    if (subcategory) {
      // First try direct subcategory translation
      const subcategoryKey = `${category}-${subcategory}`;
      const directTranslation = t(`products:${subcategoryKey}`, { defaultValue: null });
      if (directTranslation) {
        return directTranslation;
      }
      
      // Fallback to nested translation
      return t(`products:${category}.${subcategory}`, { 
        defaultValue: t(`products:categories.${category}`) 
      });
    }
    
    return t(`products:categories.${category}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <CategoryBreadcrumb category={category} subcategory={subcategory} />
          
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6 tracking-wide">
              {getCategoryTitle()}
            </h1>
            <div className="w-12 md:w-16 h-px bg-slate-900 mx-auto mb-8"></div>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
              {t('products:categoryDescription', { 
                category: getCategoryTitle(),
                count: total 
              })}
            </p>
          </div>

          {/* Products Grid */}
          <CategoryProducts 
            products={products}
            loading={loading}
            likedProducts={likedProducts}
            onToggleLike={toggleLike}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <CategoryPagination 
              currentPage={page}
              totalPages={totalPages}
              category={category}
              subcategory={subcategory}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
