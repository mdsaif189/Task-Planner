import React from "react";
import { usePlanner } from "../store/usePlanner";



export default function Footer() {
  const { tasks} = usePlanner()
  return (
    <>
      <footer
        className="text-white bg-[linear-gradient(43deg,_#30cfd0,_#330867,_hsl(257.6,_60.43899687899015%,_42.99557245296323%))] 
      h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-6 
      animate__animated animate__fadeInUp  transition-transform duration-300 "
      >
        <h1 className=" text-xl font-bold">Total Task-{tasks.length}</h1>
        <div className="flex gap-2">
           <a 
        href="https://www.linkedin.com/in/mohd-saif-4213a9187/" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2  hover:scale-110 transition-all duration-300"
      >
       <i className="fa-brands fa-github text-2xl hover:text-gray-800 hover:opacity-75 transition-opacity"></i>
        {/* <span className="text-sm font-medium">Connect</span> */}
      
      </a>

       <a 
        href="https://www.linkedin.com/in/mohd-saif-4213a9187/" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 hover:scale-110 transition-all duration-300"
      >
       <i className="fa-brands fa-linkedin text-[#0077b5] text-2xl hover:text-[#1811e0]"></i>
        {/* <span className="text-sm font-medium">Connect</span> */}
      
      </a>
        </div>
      </footer>
    </>
  );
}




// (set)=>({
//     tasks:[],
//     addTask:(payload)=>set((state)=>({
//    tasks:[...state.tasks,payload]
//     }))
// })




//  <Card hoverable key={index}>
//                       <CardMeta
//                         title=" This is my task manager"
//                         description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
//                       />

//                       <div className="mt-4 flex justify-between item-center ">
//                         <div className=" flex gap-2">
//                           <Tag>Pending</Tag>
//                           <Tag className="!bg-rose-600 !border-rose-600 !text-white">
//                             {" "}
//                             Delete
//                           </Tag>
//                         </div>
//                         <Select size="small" placeholder="change status">
//                           <Select.Option value="pending">Pending</Select.Option>
//                           <Select.Option value="completed">
//                             completed
//                           </Select.Option>
//                           <Select.Option value="In progress">
//                             In progress
//                           </Select.Option>
//                         </Select>
//                       </div>
//                     </Card>