import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/mockData';
import ProductDetailClient from '@/components/products/ProductDetailClient';



interface ProductDetailClientProps {
  product: typeof mockProducts[number];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

// Static generation function for static export
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}
