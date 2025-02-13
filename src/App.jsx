import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import TimeDisplay from './components/TimeDisplay'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [newTodo, setNewTodo] = useState('')
  const [description, setDescription] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editDescription, setEditDescription] = useState('')

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Check and update dark mode based on time
  useEffect(() => {
    const checkTime = () => {
      const currentHour = new Date().getHours()
      setIsDarkMode(currentHour >= 18 || currentHour < 6)
    }
    
    checkTime() // Initial check
    const interval = setInterval(checkTime, 60000) // Check every minute
    
    return () => clearInterval(interval)
  }, [])

  const addTodo = (e) => {
    e.preventDefault()
    const trimmedTodo = newTodo.trim()
    if (!trimmedTodo) return

    const newTodoItem = {
      id: Date.now(),
      text: trimmedTodo,
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos(prevTodos => [newTodoItem, ...prevTodos]) // Add new todos at the top
    setNewTodo('')
    setDescription('')
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
    setEditDescription(todo.description || '')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditText('')
    setEditDescription('')
  }

  const saveEdit = (id) => {
    const trimmedText = editText.trim()
    if (!trimmedText) return

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: trimmedText,
              description: editDescription.trim(),
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    )
    setEditingId(null)
  }

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-900 via-gray-700 to-cyan-900' 
        : 'bg-gradient-to-br from-yellow-300 via-cyan-50 to-yellow-100'
    } flex items-center justify-center p-4 transition-colors duration-700`}>
      <div className="w-full max-w-3xl">
        <TimeDisplay isDarkMode={isDarkMode} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden ${
            isDarkMode 
              ? 'bg-slate-800/30 border-white/10' 
              : 'bg-white/10 border-white/20'
          } backdrop-blur-xl rounded-[2rem] shadow-2xl border transition-colors duration-700`}
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br 
              ${isDarkMode 
                ? 'from-cyan-800 via-pink-900 to-cyan-700'
                : 'from-cyan-500 via-pink-900 to-cyan-900'
              } transition-colors duration-700`} 
            />
          </div>

          <div className="relative p-8 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center mb-8"
            >
              <h1 className={`text-4xl sm:text-5xl font-bold ${
                isDarkMode 
                  ? 'text-white' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-800'
              } mb-3 tracking-tight`}>
                Todo List
              </h1>
              <div className={`flex items-center text-lg ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <span>Create your new tasks</span>
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
                  className={`w-full px-6 py-4 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 text-white placeholder:text-slate-400' 
                      : 'bg-white/50 text-slate-700 placeholder:text-slate-400'
                  } backdrop-blur-sm rounded-2xl border-2 border-transparent focus:border-purple-400/50 outline-none text-lg transition-all duration-300 shadow-lg`}
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
                  className={`w-full px-6 py-4 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 text-white placeholder:text-slate-400' 
                      : 'bg-white/50 text-slate-600 placeholder:text-slate-400'
                  } backdrop-blur-sm rounded-2xl border-2 border-transparent focus:border-purple-400/50 outline-none resize-none transition-all duration-300 shadow-lg`}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-2xl 
                  text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 
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
                    className={`group ${
                      isDarkMode 
                        ? 'bg-slate-700/50 hover:border-purple-500/20' 
                        : 'bg-white/50 hover:border-purple-300/20'
                    } backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent`}
                  >
                    {editingId === todo.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className={`w-full px-4 py-2 rounded-xl ${
                            isDarkMode 
                              ? 'bg-slate-600/50 text-white placeholder:text-slate-400' 
                              : 'bg-white/50 text-slate-700 placeholder:text-slate-400'
                          } backdrop-blur-sm border border-transparent focus:border-cyan-400/50 outline-none`}
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description (optional)"
                          rows="2"
                          className={`w-full px-4 py-2 rounded-xl ${
                            isDarkMode 
                              ? 'bg-slate-600/50 text-white placeholder:text-slate-400' 
                              : 'bg-white/50 text-slate-600 placeholder:text-slate-400'
                          } backdrop-blur-sm border border-transparent focus:border-cyan-400/50 outline-none resize-none`}
                        />
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => saveEdit(todo.id)}
                            className="p-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={cancelEditing}
                            className="p-2 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5 rounded-lg border-cyan-300 text-cyan-500 
                            focus:ring-cyan-500 transition-colors"
                        />
                        <div className="flex-1">
                          <h3 className={`text-lg font-medium ${
                            todo.completed 
                              ? 'text-slate-400 line-through' 
                              : isDarkMode ? 'text-white' : 'text-slate-700'
                          } transition-colors`}>
                            {todo.text}
                          </h3>
                          {todo.description && (
                            <p className={`mt-1 text-sm ${
                              todo.completed 
                                ? 'text-slate-400' 
                                : isDarkMode ? 'text-slate-300' : 'text-slate-500'
                            }`}>
                              {todo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEditing(todo)}
                            className="text-slate-400 hover:text-cyan-500 transition-colors"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTodo(todo.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    )}
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
