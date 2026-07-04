import React, { useState } from 'react';
import { PlusCircle, Trash2, ListTodo } from 'lucide-react';

export default function RoutineBacklog({ tasks, onAddTask, onDeleteTask }) {
  const [input, setInput] = useState('');
  const upcomingTasks = tasks.slice(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-bubble-blush/60 max-w-md w-full space-y-4">
      <div className="flex items-center space-x-2 text-bubble-dark border-b border-bubble-blush/30 pb-3">
        <ListTodo className="w-5 h-5 text-bubble-rose" />
        <h3 className="font-semibold text-base">Routine Queue ({tasks.length})</h3>
      </div>

      {/* Quick Add Input Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a ritual bubble..."
          className="flex-1 bg-bubble-cream/60 border border-bubble-blush/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bubble-rose text-bubble-dark placeholder-bubble-dark/40"
        />
        <button
          type="submit"
          className="bg-bubble-rose hover:bg-bubble-rose/90 text-white px-4 rounded-xl flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

      {/* List of Next Items */}
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map((task, index) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-bubble-cream/40 border border-bubble-blush/30 rounded-xl px-4 py-3 text-sm animate-fade-in"
            >
              <div className="flex items-center space-x-3 truncate">
                <span className="text-xs font-bold text-bubble-rose bg-white border border-bubble-blush w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="truncate font-medium text-bubble-dark/90">{task.text}</span>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-bubble-dark/40 hover:text-bubble-magenta p-1 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-center text-bubble-dark/40 py-4 italic">
            {tasks.length === 1 ? "No items waiting in the queue." : "Queue is totally empty. Add a task above!"}
          </p>
        )}
      </div>
    </div>
  );
}