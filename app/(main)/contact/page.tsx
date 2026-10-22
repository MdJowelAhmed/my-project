import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contact us</h1>
        <p className="text-muted-foreground">
          Demo contact details for EcomStore. Replace with your real information when you go live.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-5 w-5 text-primary" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-5 w-5 text-primary" />
            <span>info@ecomstore.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-5 w-5 text-primary" />
            <span>123 Main St, City, Country</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
