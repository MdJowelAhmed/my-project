'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import PersistLoadingSkeleton from '@/components/layout/PersistLoadingSkeleton';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoadingSkeleton />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}