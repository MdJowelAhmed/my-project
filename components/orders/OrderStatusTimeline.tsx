import { Order } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const flow: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrderStatusTimeline({ status }: { status: Order['status'] }) {
  if (status === 'cancelled') {
    return (
      <p className="text-sm text-destructive font-medium">This order was cancelled.</p>
    );
  }

  const activeIndex = flow.indexOf(status);

  return (
    <ol className="space-y-0">
      {flow.map((step, index) => {
        const complete = index <= activeIndex;
        const isLast = index === flow.length - 1;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold capitalize',
                  complete
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted text-muted-foreground'
                )}
              >
                {complete ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {!isLast && (
                <div
                  className={cn('w-0.5 flex-1 min-h-[24px]', complete ? 'bg-primary' : 'bg-muted')}
                />
              )}
            </div>
            <div className="pb-6 pt-1">
              <p className={cn('text-sm font-medium capitalize', complete && 'text-foreground')}>
                {step}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
