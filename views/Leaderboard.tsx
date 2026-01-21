
import React from 'react';

const Leaderboard: React.FC = () => {
  const leaders = [
    { rank: 1, name: 'CyberLearner', points: 15420, avatar: 'https://picsum.photos/40/40?random=1', change: 'up' },
    { rank: 2, name: 'AI_Wizard', points: 14890, avatar: 'https://picsum.photos/40/40?random=2', change: 'down' },
    { rank: 3, name: 'SkillSeeker', points: 12100, avatar: 'https://picsum.photos/40/40?random=3', change: 'up' },
    { rank: 4, name: 'Explorer', points: 1250, avatar: 'https://picsum.photos/40/40?random=4', change: 'none', isUser: true },
    { rank: 5, name: 'DataNinja', points: 1100, avatar: 'https://picsum.photos/40/40?random=5', change: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Global Leaderboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Competing against 12,402 learners worldwide.</p>
        </div>
        <div className="flex gap-2">
          {['Weekly', 'Monthly', 'All Time'].map(filter => (
            <button key={filter} className="px-4 py-1.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-xs font-bold">
                <th className="px-8 py-6">Rank</th>
                <th className="px-6 py-6">Player</th>
                <th className="px-6 py-6">XP Points</th>
                <th className="px-6 py-6">Trend</th>
                <th className="px-6 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {leaders.map((leader) => (
                <tr 
                  key={leader.rank} 
                  className={`${leader.isUser ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors`}
                >
                  <td className="px-8 py-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      leader.rank === 1 ? 'bg-yellow-400 text-yellow-900' : 
                      leader.rank === 2 ? 'bg-slate-300 text-slate-700' :
                      leader.rank === 3 ? 'bg-orange-300 text-orange-900' :
                      'text-slate-400'
                    }`}>
                      {leader.rank}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <img src={leader.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700" />
                      <span className="font-bold dark:text-white">{leader.name} {leader.isUser && '(You)'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {leader.points.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {leader.change === 'up' && <i className="fas fa-arrow-up text-green-500"></i>}
                    {leader.change === 'down' && <i className="fas fa-arrow-down text-red-500"></i>}
                    {leader.change === 'none' && <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <i className="fas fa-user-plus"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
