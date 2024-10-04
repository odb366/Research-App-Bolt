import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/Sidebar';
import StudyCreator from '@/components/StudyCreator';
import AIIntegration from '@/components/AIIntegration';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'create' && <StudyCreator />}
          {activeTab === 'ai' && <AIIntegration />}
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;