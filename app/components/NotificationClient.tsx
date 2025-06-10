// 'use client';

// import { useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import { FaBell } from "react-icons/fa";

// type Inquiry = {
//   name?: string;
//   email: string;
//   address?: string;
//   mobileNo?: string;
//   message?: string;
//   createdAt?: string;
// };

// export default function AdminNotifications() {
//   const [notifications, setNotifications] = useState<Inquiry[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const socket: Socket = io("http://localhost:4000");

//     socket.on("connect", () => {
//       console.log("Connected to socket!", socket.id);
//     });

//     socket.on("new-inquiry", (inquiry: Inquiry) => {
//       setNotifications(prev => [inquiry, ...prev]);
//       setUnreadCount(count => count + 1);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Close the dropdown if clicked outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }
//     if (open) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [open]);

//   function handleIconClick() {
//     setOpen((prev) => !prev);
//     setUnreadCount(0);
//   }

//   return (
//     <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
//       <button
//         onClick={handleIconClick}
//         style={{
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           position: "relative",
//           fontSize: "1.7rem"
//         }}
//         aria-label="Notifications"
//       >
//         <FaBell color={unreadCount > 0 ? "#ff9800" : "#888"} />
//         {unreadCount > 0 && (
//           <span style={{
//             position: "absolute",
//             top: "-6px",
//             right: "-6px",
//             background: "#ff3d00",
//             color: "#fff",
//             borderRadius: "50%",
//             padding: "2px 7px",
//             fontSize: "0.7rem",
//             fontWeight: "bold"
//           }}>
//             {unreadCount}
//           </span>
//         )}
//       </button>
//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             right: 0,
//             top: "2.5rem",
//             width: "350px",
//             maxHeight: "400px",
//             overflowY: "auto",
//             background: "#fff",
//             border: "1px solid #ccc",
//             boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//             borderRadius: "8px",
//             zIndex: 1000,
//           }}
//         >
//           <h4 style={{ margin: "12px", fontWeight: 600 }}>Notifications</h4>
//           {notifications.length === 0 ? (
//             <div style={{ padding: "16px", color: "#888" }}>No notifications yet.</div>
//           ) : (
//             <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
//               {notifications.map((notif, idx) => (
//                 <li key={idx} style={{ borderBottom: "1px solid #eee", padding: "12px" }}>
//                   <strong>{notif.name || "Anonymous"}</strong>: {notif.message} <br />
//                   <small>{notif.email}</small>
//                   <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>
//                     {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ""}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

// {notifications.length === 0 ? (
//   <p>No notifications yet.</p>
// ) : (<ul>
//   {notifications.map((notif, idx) => (
//     <li key={idx}>
//       <strong>{notif.name || "Anonymous"}</strong>: {notif.message} <br />
//       <small>{notif.email}</small>
//     </li>
//   ))}
// </ul>
// )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { FaBell, FaBook, FaEnvelope } from "react-icons/fa";

// Notification type for inquiries and bookings
type Notification = {
  type: "inquiry" | "booking";
  // Inquiry fields
  name?: string;
  email?: string;
  address?: string;
  mobileNo?: string;
  message?: string;
  createdAt?: string;
  // Booking fields
  title?: string;
  phone?: string;
  date?: string;
};

function getIconForType(type: string) {
  if (type === "booking") return <FaBook color="#4caf50" style={{ marginRight: 4 }} />;
  if (type === "inquiry") return <FaEnvelope color="#ff9800" style={{ marginRight: 4 }} />;
  return <FaBell color="#888" style={{ marginRight: 4 }} />;
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket: Socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to socket!", socket.id);
    });

    socket.on("new-notification", (notif: Notification) => {
      setNotifications(prev => [notif, ...prev]);
      setUnreadCount(count => count + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  function handleIconClick() {
    setOpen((prev) => !prev);
    setUnreadCount(0);
  }

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
        <button
          onClick={handleIconClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
            fontSize: "1.7rem"
          }}
          aria-label="Notifications"
        >
          <FaBell color={unreadCount > 0 ? "#ff9800" : "#888"} />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#ff3d00",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 7px",
              fontSize: "0.7rem",
              fontWeight: "bold"
            }}>
              {unreadCount}
            </span>
          )}
        </button>
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "2.5rem",
              width: "375px",
              maxHeight: "400px",
              overflowY: "auto",
              background: "#fff",
              border: "1px solid #ccc",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              borderRadius: "8px",
              zIndex: 1000,
            }}
          >
            <h4 style={{ margin: "12px", fontWeight: 600 }}>Notifications</h4>
            {notifications.length === 0 ? (
              <div style={{ padding: "16px", color: "#888" }}>No notifications yet.</div>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {notifications.map((notif, idx) => (
                  <li key={idx} style={{ borderBottom: "1px solid #eee", padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                      {getIconForType(notif.type)}
                      <strong>
                        {notif.type === "booking" ? "New Booking" : "Inquiry"}
                      </strong>
                    </div>
                    {notif.type === "booking" ? (
                      <div style={{ marginBottom: 6 }}>
                        <div><b>Title:</b> {notif.title}</div>
                        <div><b>Name:</b> {notif.name}</div>
                        <div><b>Email:</b> {notif.email}</div>
                        <div><b>Phone:</b> {notif.phone}</div>
                        <div><b>Date:</b> {notif.date}</div>
                        {notif.message && <div><b>Message:</b> {notif.message}</div>}
                      </div>
                    ) : (
                      <div style={{ marginBottom: 6 }}>
                        <div><b>Name:</b> {notif.name}</div>
                        <div><b>Email:</b> {notif.email}</div>
                        {notif.address && <div><b>Address:</b> {notif.address}</div>}
                        {notif.mobileNo && <div><b>Mobile No:</b> {notif.mobileNo}</div>}
                        {notif.message && <div><b>Message:</b> {notif.message}</div>}
                      </div>
                    )}
                    <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>
                      {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ""}
                    </div>
                  </li>
                ))}
              </ul>
            )}

          </div>
        )}
      </div>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (<ul>
        {notifications.map((notif, idx) => (
          <li key={idx}>
            <strong>{notif.name || "Anonymous"}</strong>: {notif.message} <br />
            <small>{notif.email}</small>
          </li>
        ))}
      </ul>
      )}
    </>
  );
}