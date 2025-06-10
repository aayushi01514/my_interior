"use client";
import { useState } from "react";

export default function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    type: "Design",
    assignee: "John",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Task created");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow space-y-4">
      <h2 className="text-xl font-bold">Task Form</h2>
      <input type="text" placeholder="Title" className="input" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" className="input h-24"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input type="datetime-local" className="input"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
      <select className="input" value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Design</option>
        <option>Meeting</option>
        <option>Site Visit</option>
      </select>
      <select className="input" value={form.assignee}
        onChange={(e) => setForm({ ...form, assignee: e.target.value })}>
        <option>John</option>
        <option>Jane</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Task</button>
    </form>
  );
}
