'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Enter your email address.');
      return;
    }
    toast.success('Subscribed (demo)', {
      description: `We would send updates to ${email.trim()} in a live store.`,
    });
    setEmail('');
  };

  return (
    <form onSubmit={handleSubscribe} className="space-y-2">
      <h4 className="text-sm font-medium">Newsletter</h4>
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          className="text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Newsletter email"
        />
        <Button type="submit" size="sm">
          Subscribe
        </Button>
      </div>
    </form>
  );
}
