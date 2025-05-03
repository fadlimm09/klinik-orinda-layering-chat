// "use client";

// import { useState } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { useSendMessage } from "@/app/utils/useGetMessages";

// type Message = {
//   sender: string;
//   text: string;
// };

// export default function Chat() {

//   const { mutate: sendMessage } = useSendMessage();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-center mb-4">Chat with Doctor</h2>

//         <div className="flex flex-col space-y-2 mb-4 overflow-y-auto max-h-64">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-2 rounded-md ${
//                 msg.sender === "Bot"
//                   ? "bg-gray-200 text-left self-start"
//                   : "bg-green-50 text-right self-end"
//               }`}
//             >
//               <strong>{msg.sender}:</strong> {msg.text}
//             </div>
//           ))}
//         </div>

//         <div className="flex space-x-2">
//           <Input
//             placeholder="Type your message..."
//             className="flex-1"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <Button onClick={handleSend} className="btn-primary">
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
