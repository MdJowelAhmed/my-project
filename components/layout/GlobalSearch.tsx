'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockProducts } from '@/data/mockData';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const quickLinks = [
  { href: '/products', label: 'All products' },
  { href: '/cart', label: 'Shopping cart' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/dashboard/orders', label: 'My orders' },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search products and pages (Ctrl+K)"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search products or jump to a page..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {mockProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={`${product.name} ${product.category}`}
                onSelect={() => go(`/products/${product.id}`)}
              >
                <span className="truncate">{product.name}</span>
                <span className="ml-auto text-xs text-muted-foreground capitalize">
                  {product.category}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages">
            {quickLinks.map((link) => (
              <CommandItem key={link.href} onSelect={() => go(link.href)}>
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
