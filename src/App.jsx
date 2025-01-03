import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
    setNewTodo('')
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 sm:mb-10 md:mb-12 text-center">
            Todo List
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={addTodo} className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl rounded-2xl border border-purple-100 
                  bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 
                  focus:border-transparent placeholder:text-gray-400 text-gray-600"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 
                  rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-shadow
                  flex items-center justify-center sm:w-auto w-full"
              >
                <PlusIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              </motion.button>
            </form>

            <div className="space-y-3 sm:space-y-4">
              <AnimatePresence mode="popLayout">
                {todos.map(todo => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="group bg-white rounded-2xl shadow-sm p-4 sm:p-6 hover:shadow-md 
                      transition-shadow border border-purple-50 flex items-center gap-3 sm:gap-4"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-xl border-purple-300 text-purple-500 
                        focus:ring-purple-500 transition-colors"
                    />
                    <span className={`flex-1 text-lg sm:text-xl ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-700'
                    } transition-colors`}>
                      {todo.text}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200"
                    >
                      <TrashIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {todos.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 sm:py-16"
                >
                  <p className="text-xl sm:text-2xl text-gray-500 mb-2 sm:mb-3">Your todo list is empty</p>
                  <p className="text-base sm:text-lg text-gray-400">Add a new task to get started</p>
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
