import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Trash2, Edit, Check, X, Calendar, ArrowUpDown } from 'lucide-react';

function Task() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('taskItems');
        return savedItems ? JSON.parse(savedItems) : [
            { id: 1, title: "Complete project documentation", category: "Work", priority: "High", completed: false, dueDate: "2023-12-31" },
            { id: 2, title: "Review client feedback", category: "Work", priority: "Medium", completed: true, dueDate: "2023-12-15" },
            { id: 3, title: "Plan weekend trip", category: "Personal", priority: "Low", completed: false, dueDate: "2023-12-20" },
            { id: 4, title: "Buy groceries", category: "Personal", priority: "Medium", completed: false, dueDate: "2023-12-10" },
            { id: 5, title: "Team meeting preparation", category: "Work", priority: "High", completed: false, dueDate: "2023-12-05" }
        ];
    });

    const [newItem, setNewItem] = useState("");
    const [newItemDueDate, setNewItemDueDate] = useState("");
    const [newItemCategory, setNewItemCategory] = useState("Personal");
    const [newItemPriority, setNewItemPriority] = useState("Medium");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterPriority, setFilterPriority] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [editingCategory, setEditingCategory] = useState("");
    const [editingPriority, setEditingPriority] = useState("");
    const [editingDueDate, setEditingDueDate] = useState("");
    const [sortField, setSortField] = useState("dueDate");
    const [sortDirection, setSortDirection] = useState("asc");

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('taskItems', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (newItem.trim()) {
            const newTask = {
                id: Date.now(),
                title: newItem,
                category: newItemCategory,
                priority: newItemPriority,
                completed: false,
                dueDate: newItemDueDate || new Date().toISOString().split('T')[0]
            };
            setItems([...items, newTask]);
            setNewItem("");
            setNewItemDueDate("");
            // Keep the category and priority as is for convenience when adding multiple tasks
        }
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const toggleComplete = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const startEditing = (id, item) => {
        setEditingId(id);
        setEditingText(item.title);
        setEditingCategory(item.category);
        setEditingPriority(item.priority);
        setEditingDueDate(item.dueDate || "");
    };

    const saveEdit = () => {
        setItems(items.map(item =>
            item.id === editingId ? { 
                ...item, 
                title: editingText,
                category: editingCategory,
                priority: editingPriority,
                dueDate: editingDueDate
            } : item
        ));
        resetEditingState();
    };

    const cancelEdit = () => {
        resetEditingState();
    };

    const resetEditingState = () => {
        setEditingId(null);
        setEditingText("");
        setEditingCategory("");
        setEditingPriority("");
        setEditingDueDate("");
    };

    // Sort items
    const sortItems = (items) => {
        return [...items].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Handle special cases for sorting
            if (sortField === 'dueDate') {
                aValue = aValue ? new Date(aValue) : new Date(9999, 11, 31);
                bValue = bValue ? new Date(bValue) : new Date(9999, 11, 31);
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    };

    // Filter items
    const filteredItems = sortItems(items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || item.category === filterCategory) &&
        (filterPriority === "All" || item.priority === filterPriority) &&
        (filterStatus === "All" || 
         (filterStatus === "Completed" && item.completed) || 
         (filterStatus === "Active" && !item.completed))
    ));

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
                <div className="flex flex-col gap-4 mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">Add New Task</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Task title..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={newItemCategory}
                                onChange={(e) => setNewItemCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Study">Study</option>
                                <option value="Health">Health</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={newItemPriority}
                                onChange={(e) => setNewItemPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date"
                                value={newItemDueDate}
                                onChange={(e) => setNewItemDueDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        onClick={addItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Task
                    </button>
                </div>

                {/* Search, Filter and Sort */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
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
                        <div className="flex gap-2">
                            <button 
                                onClick={() => {
                                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-1"
                            >
                                <ArrowUpDown size={16} />
                                {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                <option value="All">All Categories</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Study">Study</option>
                                <option value="Health">Health</option>
                            </select>
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                            <option value="category">Category</option>
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
                                        <div className="flex flex-col gap-3 w-full">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                            />
                                            <div className="grid grid-cols-3 gap-2">
                                                <select
                                                    value={editingCategory}
                                                    onChange={(e) => setEditingCategory(e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="Work">Work</option>
                                                    <option value="Personal">Personal</option>
                                                    <option value="Study">Study</option>
                                                    <option value="Health">Health</option>
                                                </select>
                                                <select
                                                    value={editingPriority}
                                                    onChange={(e) => setEditingPriority(e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                                <input
                                                    type="date"
                                                    value={editingDueDate}
                                                    onChange={(e) => setEditingDueDate(e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="flex justify-end gap-2 mt-1">
                                                <button
                                                    onClick={saveEdit}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                {item.title}
                                            </span>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                                    {item.priority}
                                                </span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                    {item.category}
                                                </span>
                                                {item.dueDate && (
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {new Date(item.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {editingId !== item.id && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(item.id, item)}
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
