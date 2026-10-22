'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/authSlice';
import { isNavLinkActive } from '@/lib/nav';
import GlobalSearch from '@/components/layout/GlobalSearch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const { bookmarkedProducts } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const bookmarkCount = bookmarkedProducts.length;

  const handleLogout = () => {
    dispatch(logout());
    toast.message('Signed out');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/islamic-corner', label: 'Islamic Corner' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
  ];

  const linkClass = (href: string) =>
    cn(
      'text-sm font-medium transition-colors',
      isNavLinkActive(pathname, href)
        ? 'text-primary'
        : 'text-foreground/80 hover:text-foreground'
    );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="text-xl font-bold text-foreground">EcomStore</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <GlobalSearch />

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <Link
                        href="/dashboard/orders"
                        className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 hover:opacity-90"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Order confirmed</p>
                          <p className="text-xs text-muted-foreground">
                            Your latest order is being processed.
                          </p>
                        </div>
                      </Link>
                      <Link
                        href="/dashboard/offers"
                        className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 hover:opacity-90"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Special offer</p>
                          <p className="text-xs text-muted-foreground">
                            Get 20% off jerseys this weekend.
                          </p>
                        </div>
                      </Link>
                      <Link
                        href="/dashboard/orders"
                        className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 hover:opacity-90"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Delivery update</p>
                          <p className="text-xs text-muted-foreground">Track status in My Orders.</p>
                        </div>
                      </Link>
                    </div>
                    <DropdownMenuSeparator className="my-3" />
                    <Link href="/dashboard/offers">
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View all offers
                      </Button>
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-transform duration-150"
                data-cart-icon
                aria-label={`Shopping cart, ${cartItemCount} items`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs text-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated && (
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative transition-transform duration-150"
                  data-wishlist-icon
                  aria-label={`Wishlist, ${bookmarkCount} items`}
                >
                  <Heart className="h-4 w-4" />
                  {bookmarkCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                      {bookmarkCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="Account menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn('text-lg font-medium transition-colors', linkClass(link.href))}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <>
                      <hr />
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Login</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
