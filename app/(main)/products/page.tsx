import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductsPageContent from './ProductsPageContent';

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-10 w-full max-w-xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
}
