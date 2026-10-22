import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does not exist or was moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Products</Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline">Cart</Button>
        </Link>
        <Link href="/support">
          <Button variant="outline">Support</Button>
        </Link>
      </div>
    </div>
  );
}
