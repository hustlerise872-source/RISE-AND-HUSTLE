
import React from 'react';
import { UserProfile } from '../types';

const Quests: React.FC<{ user: UserProfile }> = ({ user }) => {
  const activeQuests = [
    {
      id: 'q1',
      title: 'JavaScript Master',
      steps: ['Complete 3 Coding lessons', 'Maintain 5-day streak', 'Score 100% on a quiz'],
      progress: 66,
      reward: '500 XP',
      icon: 'fa-code',
      color: 'blue'
    },
    {
      id: 'q2',
      title: 'The Polyglot',
      steps: ['Start French Basics', 'Learn 50 words', 'Listen to native audio'],
      progress: 25,
      reward: '300 XP',
      icon: 'fa-language',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold dark:text-white">Active Quests</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Complete tasks to unlock badges and massive XP boosts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeQuests.map((quest) => (
          <div key={quest.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className={`h-2 bg-${quest.color}-500 w-full`}></div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-${quest.color}-50 dark:bg-${quest.color}-500/10 rounded-2xl flex items-center justify-center text-2xl text-${quest.color}-600 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${quest.icon}`}></i>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Reward</span>
                  <p className="text-lg font-bold text-green-600">{quest.reward}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold dark:text-white mb-4">{quest.title}</h3>
              
              <div className="space-y-4 mb-8">
                {quest.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${idx === 0 ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 dark:border-slate-700'}`}>
                      {idx === 0 && <i className="fas fa-check text-[10px]"></i>}
                    </div>
                    <span className={`text-sm ${idx === 0 ? 'text-slate-400 line-through' : 'text-slate-600 dark:text-slate-300'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                  <span>Progress</span>
                  <span>{quest.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-${quest.color}-500 transition-all duration-1000`} style={{ width: `${quest.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-bold dark:text-white mb-6">Daily Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { title: 'Morning Grind', desc: 'Complete 1 lesson before 10 AM', xp: '+20', done: true },
            { title: 'Quiz Whiz', desc: 'Get 3 perfect quiz scores', xp: '+100', done: false },
            { title: 'Community Spirit', desc: 'Join a VR session today', xp: '+50', done: false },
          ].map((ch, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${ch.done ? 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30' : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-bold ${ch.done ? 'text-green-800 dark:text-green-400' : 'dark:text-white'}`}>{ch.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ch.desc}</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">{ch.xp} XP</span>
              </div>
              <button disabled={ch.done} className={`w-full mt-4 py-2 rounded-xl text-sm font-bold transition-all ${ch.done ? 'bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-500' : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500'}`}>
                {ch.done ? 'Claimed' : 'Start Now'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Quests;
