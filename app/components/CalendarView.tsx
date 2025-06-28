// "use client";
// import { useEffect, useState } from "react";
// import {
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   format,
//   isSameDay,
//   parseISO,
//   isSameMonth,
//   addMonths,
//   subMonths,
// } from "date-fns";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   type: string;
//   assignee: string;
// }

// export default function CalendarView() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const res = await fetch("/api/tasks");
//       const data = await res.json();
//       setTasks(data);
//     };
//     fetchTasks();
//   }, []);

//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(currentDate);
//   const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

//   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
//   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <div className="p-4 border rounded bg-white shadow space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={prevMonth} className="text-lg font-bold px-2 py-1 rounded bg-gray-200">
//           ←
//         </button>
//         <h2 className="text-xl font-bold">
//           {format(currentDate, "MMMM yyyy")}
//         </h2>
//         <button onClick={nextMonth} className="text-lg font-bold px-2 py-1 rounded bg-gray-200">
//           →
//         </button>
//       </div>

//       {/* Weekday labels */}
//       <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700">
//         {weekdays.map((day) => (
//           <div key={day}>{day}</div>
//         ))}
//       </div>

//       {/* Calendar grid */}
//       <div className="grid grid-cols-7 gap-2 text-xs">
//         {Array.from({ length: monthStart.getDay() }).map((_, i) => (
//           <div key={`empty-${i}`} className="border h-24 p-1 rounded bg-gray-50"></div>
//         ))}

//         {days.map((day) => {
//           const dayTasks = tasks.filter((task) =>
//             isSameDay(parseISO(task.dueDate), day)
//           );

//           return (
//             <div
//               key={day.toISOString()}
//               className={`border h-24 p-1 rounded text-left relative overflow-hidden ${
//                 isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-100"
//               }`}
//             >
//               <div className="text-gray-800 font-semibold">
//                 {format(day, "d")}
//               </div>
//               {dayTasks.map((task) => (
//                 <div
//                   key={task._id}
//                   className="mt-1 bg-blue-500 text-white rounded px-1 py-[1px] text-xs truncate"
//                   title={`${task.title} - ${task.assignee}`}
//                 >
//                   {task.title}
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  assignee: string;
}

export default function CalendarView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border rounded-xl bg-white shadow space-y-6"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={prevMonth}
          className="text-lg font-bold px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold text-blue-700">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="text-lg font-bold px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-600">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2 text-xs">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="border h-28 p-1 rounded bg-gray-50"
            ></div>
          ))}

          {days.map((day) => {
            const dayTasks = tasks.filter((task) =>
              isSameDay(parseISO(task.dueDate), day)
            );

            return (
              <div
                key={day.toISOString()}
                className={`border h-28 p-2 rounded-lg flex flex-col justify-start relative overflow-hidden group transition ${
                  isSameMonth(day, currentDate)
                    ? "bg-white"
                    : "bg-gray-100 opacity-80"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 font-semibold">
                    {format(day, "d")}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-[1px] rounded-full">
                      {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto">
                  {dayTasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-blue-500 text-white rounded px-2 py-[2px] text-xs truncate shadow hover:scale-105 transition"
                      title={`${task.title} - ${task.assignee}`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
