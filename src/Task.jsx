import { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit, Check, X } from 'lucide-react';

function Task() {
    const [items, setItems] = useState([
        { id: 1, title: "Complete project documentation", category: "Work", priority: "High", completed: false },
        { id: 2, title: "Review client feedback", category: "Work", priority: "Medium", completed: false },
        { id: 3, title: "Plan weekend trip", category: "Personal", priority: "Low", completed: false },
        { id: 4, title: "Buy groceries", category: "Personal", priority: "Medium", completed: false },
        { id: 5, title: "Team meeting preparation", category: "Work", priority: "High", completed: false }
    ]);

    const [newItem, setNewItem] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const addItem = () => {
        if (newItem.trim()) {
            const newTask = {
                id: Date.now(),
                title: newItem,
                category: "Personal",
                priority: "Medium",
                completed: false
            };
            // Update items state safely with a callback function
            setItems(prevItems => [...prevItems, newTask]);
            setNewItem("");
        }
    };

    const deleteItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const toggleComplete = (id) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const startEditing = (id, title) => {
        setEditingId(id);
        setEditingText(title);
    };

    const saveEdit = () => {
        setItems(prevItems => prevItems.map(item =>
            item.id === editingId ? { ...item, title: editingText } : item
        ));
        setEditingId(null);
        setEditingText("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || item.category === filterCategory)
    );

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "text-red-600 bg-red-100";
            case "Medium": return "text-yellow-600 bg-yellow-100";
            case "Low": return "text-green-600 bg-green-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Task Manager</h2>

                {/* Add new item */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    />
                    <button
                        onClick={addItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                        >
                            <option value="All">All Categories</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No tasks found. Add some tasks to get started!
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                                item.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleComplete(item.id)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />

                                <div className="flex-1">
                                    {editingId === item.id ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                            />
                                            <button
                                                onClick={saveEdit}
                                                className="text-green-600 hover:text-green-800 p-1"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                      <span className={`text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {item.title}
                      </span>
                                            <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {editingId !== item.id && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(item.id, item.title)}
                                            className="text-blue-600 hover:text-blue-800 p-1"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Total: {items.length} tasks</span>
                    <span>Completed: {items.filter(item => item.completed).length}</span>
                    <span>Remaining: {items.filter(item => !item.completed).length}</span>
                </div>
            </div>
        </div>
    );
}

export default Task;
