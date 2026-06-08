const STORAGE_KEY = "kanban-tasks";
const COLUMNS = ["Backlog", "Desenvolvimento", "Concluído"];
let tasks = [];
let editingId = null;
let draggedTaskId = null;
let filteredTasks = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    renderTasks();
    setupSearch();
});

// Load tasks from localStorage
function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            console.error("Error loading tasks:", e);
            tasks = [];
        }
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        if (query) {
            filteredTasks = tasks.filter(t => 
                t.title.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query) ||
                t.responsible.toLowerCase().includes(query)
            );
        } else {
            filteredTasks = [];
        }
        renderTasks();
    });
}

// Open modal
function openModal(taskId = null) {
    const modal = document.getElementById("modal");
    const form = document.getElementById("taskForm");
    const title = document.getElementById("modal-title");

    form.reset();
    editingId = null;

    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            editingId = taskId;
            title.textContent = "Edit Task";
            document.getElementById("title").value = task.title;
            document.getElementById("description").value = task.description;
            document.getElementById("priority").value = task.priority;
            document.getElementById("dueDate").value = task.dueDate;
            document.getElementById("responsible").value = task.responsible;
        }
    } else {
        title.textContent = "New Task";
        document.getElementById("priority").value = "Média";
    }

    modal.classList.add("active");
}

// Close modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("active");
    editingId = null;
}

// Save task
function handleSaveTask(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    if (!title) {
        showToast("Title is required", "error");
        return;
    }

    const taskData = {
        title,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        dueDate: document.getElementById("dueDate").value,
        responsible: document.getElementById("responsible").value,
    };

    if (editingId) {
        const task = tasks.find(t => t.id === editingId);
        if (task) {
            Object.assign(task, taskData);
            showToast("Task updated successfully!", "success");
        }
    } else {
        const newTask = {
            id: Date.now().toString(),
            ...taskData,
            status: "Backlog",
        };
        tasks.push(newTask);
        showToast("Task created successfully!", "success");
    }

    saveTasks();
    renderTasks();
    closeModal();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    showToast("Task deleted!", "success");
}

// Drag and Drop
function handleDragStart(event, taskId) {
    draggedTaskId = taskId;
    event.target.classList.add("dragging");
}

function handleDragEnd(event) {
    event.target.classList.remove("dragging");
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove("drag-over");
}

function handleDrop(event, status) {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-over");

    if (draggedTaskId) {
        const task = tasks.find(t => t.id === draggedTaskId);
        if (task) {
            task.status = status;
            saveTasks();
            renderTasks();
            showToast(`Task moved to ${status}`, "success");
        }
    }
    draggedTaskId = null;
}

// Render tasks
function renderTasks() {
    const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

    COLUMNS.forEach(column => {
        const columnId = `column-${column.toLowerCase()}`;
        const countId = `count-${column.toLowerCase()}`;
        const container = document.getElementById(columnId);
        const countElement = document.getElementById(countId);

        const columnTasks = displayTasks.filter(t => t.status === column);
        countElement.textContent = columnTasks.length;

        if (columnTasks.length === 0) {
            container.innerHTML = '<div class="empty-state">No tasks yet</div>';
            return;
        }

        container.innerHTML = columnTasks.map(task => {
            const initials = task.responsible.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            return `
                <div class="task-card" draggable="true" ondragstart="handleDragStart(event, '${task.id}')" ondragend="handleDragEnd(event)">
                    <div class="task-header">
                        <div class="task-title">${escapeHtml(task.title)}</div>
                        <div class="task-actions">
                            <button class="task-btn" onclick="openModal('${task.id}')" title="Edit">✏️</button>
                            <button class="task-btn task-btn-delete" onclick="deleteTask('${task.id}')" title="Delete">🗑️</button>
                        </div>
                    </div>
                    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
                        ${task.dueDate ? `<span class="due-date ${isOverdue(task.dueDate) ? 'due-date-overdue' : 'due-date-normal'}">📅 ${formatDate(task.dueDate)}</span>` : ''}
                    </div>
                    ${task.responsible ? `
                        <div class="task-footer">
                            <div class="responsible-avatar" title="${task.responsible}">${initials}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    });
}

// Utilities
function isOverdue(dueDate) {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Toast
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
document.getElementById("modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") {
        closeModal();
    }
});
