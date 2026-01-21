
import React from 'react';
import { UserProfile } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 700 },
  { name: 'Wed', xp: 500 },
  { name: 'Thu', xp: 900 },
  { name: 'Fri', xp: 1200 },
  { name: 'Sat', xp: 800 },
  { name: 'Sun', xp: 1500 },
];

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Welcome back, {user.name}! 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">You're on a {user.streak} day learning streak. Keep it up!</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all font-medium">
          <i className="fas fa-file-export"></i>
          Export Report
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total XP', value: user.points, icon: 'fa-star', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
          { label: 'Level', value: user.level, icon: 'fa-bolt', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'Lessons', value: user.completedLessons.length, icon: 'fa-check-circle', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
          { label: 'Current Streak', value: `${user.streak} Days`, icon: 'fa-fire', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold dark:text-white">Learning Activity</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1 dark:text-slate-300">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-6">Latest Badges</h3>
          <div className="space-y-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 group transition-all">
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-xl text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                  <i className={`fas ${badge.icon}`}></i>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">{badge.name}</h4>
                  <p className="text-xs text-slate-500">Unlocked on {badge.unlockedAt}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
              View All Badges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
