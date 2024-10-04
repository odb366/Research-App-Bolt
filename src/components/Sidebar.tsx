import { Home, FileText, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'create', icon: FileText, label: 'Create Study' },
    { id: 'ai', icon: Brain, label: 'AI Integration' },
  ];

  return (
    <div className="w-64 bg-secondary text-secondary-foreground p-4">
      <div className="flex items-center mb-8">
        <Home className="mr-2" />
        <h1 className="text-xl font-bold">Research Hub</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start mb-2',
              activeTab === item.id && 'bg-primary/10'
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;