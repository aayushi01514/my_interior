// "use client";
// import { useState } from "react";

// export default function TaskForm() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     type: "Design",
//     assignee: "John",
//   });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     await fetch("/api/tasks", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });
//     alert("Task created");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow space-y-4">
//       <h2 className="text-xl font-bold">Task Form</h2>
//       <input type="text" placeholder="Title" className="input" value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })} />
//       <textarea placeholder="Description" className="input h-24"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })} />
//       <input type="datetime-local" className="input"
//         value={form.dueDate}
//         onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
//       <select className="input" value={form.type}
//         onChange={(e) => setForm({ ...form, type: e.target.value })}>
//         <option>Design</option>
//         <option>Meeting</option>
//         <option>Site Visit</option>
//       </select>
//       <select className="input" value={form.assignee}
//         onChange={(e) => setForm({ ...form, assignee: e.target.value })}>
//         <option>John</option>
//         <option>Jane</option>
//       </select>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Task</button>
//     </form>
//   );
// }
"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    type: "Design",
    assignee: "John",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Simple validation
    if (!form.title || !form.description || !form.dueDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("✅ Task created successfully!");
        setForm({
          title: "",
          description: "",
          dueDate: "",
          type: "Design",
          assignee: "John",
        });
      } else {
        toast.error("❌ Failed to create task.");
      }
    } catch (err) {
      toast.error("❌ Server error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6 border"
    >
      <h2 className="text-2xl font-bold text-blue-700">Create New Task</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Title *</label>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Description *</label>
          <textarea
            placeholder="Task Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Due Date *</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Design</option>
              <option>Meeting</option>
              <option>Site Visit</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">Assignee</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            >
              <option>John</option>
              <option>Jane</option>
              <option>Michael</option>
              <option>Sara</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>

      <Toaster position="top-right" />
    </motion.form>
  );
}
