
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Lessons from './views/Lessons';
import Quests from './views/Quests';
import VRClassroom from './components/VRClassroom';
import Leaderboard from './views/Leaderboard';
import { UserProfile, Difficulty, SkillCategory } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    id: 'u1',
    name: 'Explorer',
    email: 'explorer@skillquest.ai',
    avatar: 'https://picsum.photos/100/100',
    points: 1250,
    level: 12,
    streak: 7,
    badges: [
      { id: 'b1', name: 'First Quest', icon: 'fa-flag', unlockedAt: '2023-10-01' },
      { id: 'b2', name: 'Week Streak', icon: 'fa-fire', unlockedAt: '2023-10-07' }
    ],
    completedLessons: ['l1', 'l2']
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'lessons':
        return <Lessons user={user} />;
      case 'quests':
        return <Quests user={user} />;
      case 'classroom':
        return (
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-bold dark:text-white">Collaborative VR Studio</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Enter a virtual workspace with other learners.</p>
            </header>
            <VRClassroom />
          </div>
        );
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 transition-all">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
