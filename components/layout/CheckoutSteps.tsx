import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const steps = [
  { id: 'cart', label: 'Cart' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'done', label: 'Confirmation' },
] as const;

export type CheckoutStepId = (typeof steps)[number]['id'];

export default function CheckoutSteps({ current }: { current: CheckoutStepId }) {
  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Checkout progress" className="w-full max-w-lg mx-auto">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && !done && 'border-primary text-primary',
                  !done && !active && 'border-muted-foreground/30 text-muted-foreground'
                )}
              >
                {done ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
