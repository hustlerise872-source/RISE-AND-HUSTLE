
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'lessons', icon: 'fa-book-open', label: 'Lessons' },
    { id: 'quests', icon: 'fa-shield-halved', label: 'Quests' },
    { id: 'classroom', icon: 'fa-vr-cardboard', label: 'VR Class' },
    { id: 'leaderboard', icon: 'fa-trophy', label: 'Ranking' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/30">
          <i className="fas fa-bolt"></i>
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight dark:text-white">SkillQuest</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button 
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-4 p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg w-6`}></i>
          <span className="hidden md:block font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="hidden md:flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <img src="https://picsum.photos/40/40" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate dark:text-white">Player One</p>
            <p className="text-xs text-slate-500 truncate">Lv. 12 Master</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
