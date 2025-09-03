"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockOffers } from '@/data/mockData';
import { Gift, Copy, Calendar } from 'lucide-react';

export default function OffersPage() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Offers</h1>
        <p className="text-muted-foreground">Available discount codes and special offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOffers.map((offer) => (
          <Card key={offer.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <span>{offer.name}</span>
                </CardTitle>
                <Badge variant="secondary">
                  {offer.type === 'percentage' ? `${offer.discount}%` : `$${offer.discount}`} OFF
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{offer.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-mono font-bold text-lg">{offer.code}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Valid: {offer.validFrom} to {offer.validUntil}</span>
                </div>
              </div>

              <Button className="w-full">
                Apply to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockOffers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center space-y-4">
            <Gift className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Offers Available</h3>
            <p className="text-muted-foreground">
              Check back soon for exciting deals and discount codes!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}