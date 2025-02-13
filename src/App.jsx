import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline'
import TimeDisplay from './components/TimeDisplay'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [description, setDescription] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    setTodos([...todos, { 
      id: Date.now(), 
      text: newTodo, 
      description: description,
      completed: false 
    }])
    setNewTodo('')
    setDescription('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 px-4 md:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <TimeDisplay />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl 
            border border-white/20"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600 
                via-transparent to-transparent rounded-full"
            />
          </div>

          <div className="relative p-8 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center mb-8"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-purple-600 to-pink-600 mb-3 tracking-tight">
                Task Manager
              </h1>
              <div className="flex items-center gap-2 text-slate-600">
                <SparklesIcon className="w-5 h-5" />
                <span>Create and manage your daily tasks</span>
              </div>
            </motion.div>

            <form onSubmit={addTodo} className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What's your next task?"
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 
                    border-transparent focus:border-purple-400/50 outline-none text-lg text-slate-700 
                    placeholder:text-slate-400 transition-all duration-300 shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details... (optional)"
                  rows="3"
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 
                    border-transparent focus:border-purple-400/50 outline-none text-slate-600 
                    placeholder:text-slate-400 resize-none transition-all duration-300 shadow-lg"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl 
                  text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 
                  transition-shadow flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-6 h-6" />
                <span>Add Task</span>
              </motion.button>
            </form>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {todos.map(todo => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg 
                      hover:shadow-xl transition-all duration-300 border-2 border-transparent 
                      hover:border-purple-300/20"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded-lg border-purple-300 text-purple-500 
                          focus:ring-purple-500 transition-colors"
                      />
                      <div className="flex-1">
                        <h3 className={`text-lg font-medium ${
                          todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                        } transition-colors`}>
                          {todo.text}
                        </h3>
                        {todo.description && (
                          <p className={`mt-1 text-sm ${
                            todo.completed ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {todo.description}
                          </p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                          transition-all duration-200"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {todos.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-slate-500 mb-1">No tasks yet</p>
                  <p className="text-sm text-slate-400">Add your first task above</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
