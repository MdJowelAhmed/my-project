import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">
          Need help with the demo store? Sign in to use the live chat simulator in your dashboard.
        </p>
      </div>

      <Card>
        <CardContent className="p-8 text-center space-y-6">
          <MessageCircle className="h-12 w-12 mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">
            Logged-in customers can open Support from the dashboard for mock chat replies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/support">
              <Button>Go to dashboard chat</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact information</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
