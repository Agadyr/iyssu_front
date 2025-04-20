'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, CheckIcon } from 'lucide-react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newItem: TodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, newItem]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Список задач</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Добавить новую задачу"
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          <PlusIcon size={20} />
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={`flex items-center justify-between p-3 border rounded-md ${
              todo.completed ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 mr-3 rounded-full border flex items-center justify-center ${
                  todo.completed ? 'bg-green-500 text-white border-green-500' : 'border-gray-400'
                }`}
              >
                {todo.completed && <CheckIcon size={14} />}
              </button>
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon size={18} />
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="text-center text-gray-500 my-4">Нет задач в списке</p>
      )}
      
      {todos.length > 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Всего задач: {todos.length}, выполнено: {todos.filter(t => t.completed).length}
        </p>
      )}
    </div>
  );
} 