
import React, { useState } from 'react';
import { SkillCategory, Difficulty, UserProfile } from '../types';
import { generateLesson, getTutorAnswer } from '../services/geminiService';

const Lessons: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<SkillCategory>(SkillCategory.CODING);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.BEGINNER);
  const [lesson, setLesson] = useState<any>(null);
  const [question, setQuestion] = useState('');
  const [tutorAnswer, setTutorAnswer] = useState('');
  const [asking, setAsking] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateLesson(topic, category, difficulty);
      setLesson(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAskTutor = async () => {
    if (!question || !lesson) return;
    setAsking(true);
    try {
      const answer = await getTutorAnswer(question, lesson.content);
      setTutorAnswer(answer);
    } catch (error) {
      console.error(error);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          AI Personalized Tutor
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">What would you like to master today?</p>
      </header>

      {!lesson ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Learning Path</label>
              <div className="flex gap-2">
                {[SkillCategory.CODING, SkillCategory.LANGUAGES, SkillCategory.ARTS].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      category === cat 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Level</label>
              <div className="flex gap-2">
                {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      difficulty === diff 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {diff.charAt(0) + diff.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Specify Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. React Hooks, French Past Tense, Oil Painting basics..."
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
            Create Personalized Lesson
          </button>
        </div>
      ) : (
        <div className="space-y-8 pb-20">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl prose dark:prose-invert max-w-none">
            <div className="flex justify-between items-start mb-6 not-prose">
              <button 
                onClick={() => setLesson(null)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to generator
              </button>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold tracking-wider uppercase">
                {difficulty}
              </span>
            </div>
            <h1 className="mb-8">{lesson.title}</h1>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              {lesson.content.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* AI Tutor Chat */}
          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-indigo-900 dark:text-indigo-300 font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-robot"></i>
              Ask your AI Tutor
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything about this lesson..."
                className="flex-1 p-3 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-900/50 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
              <button
                onClick={handleAskTutor}
                disabled={asking || !question}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold transition-all hover:bg-indigo-500 disabled:opacity-50"
              >
                {asking ? <i className="fas fa-spinner fa-spin"></i> : 'Ask'}
              </button>
            </div>
            {tutorAnswer && (
              <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-top-2">
                <p className="font-semibold text-xs text-indigo-500 mb-1 uppercase tracking-wider">AI Answer</p>
                {tutorAnswer}
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-2xl font-bold dark:text-white mb-6">Checkpoint Quiz</h3>
            <div className="space-y-8">
              {lesson.quiz.map((q: any, i: number) => (
                <div key={i} className="space-y-4">
                  <p className="font-semibold dark:text-white">{i + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt: string, optIdx: number) => (
                      <button
                        key={optIdx}
                        className="p-4 text-left rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all dark:text-slate-300"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-500 transition-all">
              Submit Quiz & Earn 50 XP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
