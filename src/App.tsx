import React, { useState } from 'react';
import type { ViewId } from '@/types/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { FoundationDashboard } from '@/views/FoundationDashboard';
import { DesignSystemShowcase } from '@/views/DesignSystemShowcase';
import { PlaceholderView } from '@/views/PlaceholderView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewId>('dashboard');

  return (
    <AppShell currentView={currentView} onSelectView={setCurrentView}>
      {currentView === 'dashboard' ? (
        <FoundationDashboard onNavigate={setCurrentView} />
      ) : currentView === 'design-system' ? (
        <DesignSystemShowcase />
      ) : (
        <PlaceholderView viewId={currentView} onNavigate={setCurrentView} />
      )}
    </AppShell>
  );
};

export default App;
