'use client';

import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  // Use the native, reliable properties provided by the standard SDK hook
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat',
  });

  const isThinking = status === 'submitted' || status === 'streaming';

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-slate-900 text-slate-100 font-sans p-4">
      {/* Header */}
      <header className="w-full max-w-2xl py-4 border-b border-slate-800 text-center">
        <h1 className="text-2xl font-bold text-teal-400">Gemini AI Assistant</h1>
        <p className="text-xs text-slate-400 mt-1">Powered by Next.js & Google AI</p>
      </header>

      {/* Chat Messages Space */}
      <section className="flex-1 w-full max-w-2xl overflow-y-auto my-4 space-y-4 p-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 pt-20">
            <div className="text-4xl mb-2">🤖</div>
            <p className="text-sm">Say hello to get your conversation started!</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[10px] text-slate-500 mb-1 px-1 capitalize">
                {m.role}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-md whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-teal-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}
        {isThinking && (
          <div className="text-xs text-teal-400 animate-pulse px-1">
            Gemini is thinking...
          </div>
        )}
      </section>

      {/* Input Message Form */}
      <footer className="w-full max-w-2xl pb-4">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            value={input}
            placeholder="Type a message..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold text-sm px-5 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </footer>
    </main>
  );
}
