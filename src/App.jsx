import React, { useState, useEffect } from "react";
import "animate.css";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { Plus, Trash } from "lucide-react";
import CardMeta from "antd/es/card/CardMeta";
import Footer from "./assets/Footer";
import { usePlanner } from "./store/usePlanner";
import moment from "moment";

export default function App() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { tasks, addTask,deleteTask,updateStatus,deleteAllTask } = usePlanner();
  const highestTask = tasks.filter((item) => item.priority === "highest");
  const mediumTask = tasks.filter((item) => item.priority === "medium");
  const lowestTask = tasks.filter((item) => item.priority === "lowest");

  const createTask = (value) => {
    value.status = "pending";
    value.id = Date.now();
    value.createdAt=new Date()
    addTask(value);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="bg-gray-300 h-screen overflow-hidden">
        <nav
          className="text-white bg-[linear-gradient(234deg,_#30cfd0,_#330867,_hsl(246.4,_74.97644634353749%,_53.181027905804235%))]
      h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8 sm:flex gap-3  animate__animated animate__fadeInDown  transition-transform duration-300 "
        >
          <div className="flex item-center">
            <button
              className="h-10 w-10 rounded-full font-bold text-white bg-[radial-gradient(circle_at_center,_#30cfd0_0%,_#330867_50%,_hsl(258.1,_61.72285178523239%,_52.62118511425717%)_100%)]
        "
            >
              PL
            </button>
            <h1 className="text-2xl font-bold ml-px
           bg-[conic-gradient(from_5deg,_#a1c4fd_0%_50%,_#c2e9fb_50%_100%)] bg-clip-text text-transparent"
            >anner</h1>
          </div>

          <div className="flex gap-5 items-center ">
            <h1 className="text-2xl font-bold lg:block hidden
             bg-[conic-gradient(from_66deg,_#a1c4fd_0%_50%,_#c2e9fb_50%_100%)] bg-clip-text text-transparent">{time}</h1>
            <DatePicker
              size=""
              className=" !py-1.5 hover:cursor-pointer hover:!bg-green-50"
            />

            <button
              onClick={() => setOpen(true)}
              className=" flex  px-3 py-2 text-sm  rounded-xl items-center text-white 
              focus:shadow-2xl hover:scale-103 transition-transform duration-300 cursor-pointer 
               bg-[linear-gradient(45deg,_#00c6ff,_#0072ff,_hsl(228.4,_78.25720028383995%,_41.079564566897226%))] 
              hover:bg-[linear-gradient(239deg,_#fbc2eb,_#a6c1ee,_hsl(172.2,_83.62332220715885%,_59.76924544777433%))] hover:text-black"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>

              <Popconfirm title="Do you really want to delete your all tasks" onConfirm={()=>deleteAllTask()}>
                 <button
            
              className=" flex gap-1 px-3 py-2 text-sm  rounded-xl items-center text-white 
              focus:shadow-2xl hover:scale-103 transition-transform duration-300 cursor-pointer 
            bg-red-500
              hover:bg-red-600 hover:text-black"
            >
              <Trash className="w-4 h-4" />
              Delete All task
            </button>
              </Popconfirm>
          </div>
        </nav>

        <section className=" fixed top-[60px] left-0 h-[calc(100%-120px)] grid lg:grid-cols-3 gap-8 p-8 w-full overflow-x-auto overflow-y-visible">
          <div className="lg:min-h-0 lg:h-full h-[400px]">
            <Badge.Ribbon
              text="Highest"
              className=" font-semibold z-[3000] bg-[linear-gradient(176deg,_#fccb90,_#d57eeb,_hsl(3.1,_71.53321178759037%,_51.554162202642544%))]"
            />
            <div className="bg-gray-50  rounded-2xl h-full overflow-auto min-h-0  p-6 ">
              <div className="flex flex-col gap-8 mt-6">
                {highestTask.length === 0 && (
                  <>
                   <div className=" mt-[80px] space-y-7">
                     <Empty description="Add your task here !" />
                    <button
                      onClick={() => setOpen(true)}
                      className=" w-fit mx-auto flex  px-3 py-2 text-sm  rounded-xl items-center text-white 
              focus:shadow-2xl hover:scale-103 transition-transform duration-300 cursor-pointer 
               bg-[linear-gradient(45deg,_#00c6ff,_#0072ff,_hsl(228.4,_78.25720028383995%,_41.079564566897226%))] 
              hover:bg-[linear-gradient(239deg,_#fbc2eb,_#a6c1ee,_hsl(172.2,_83.62332220715885%,_59.76924544777433%))] hover:text-black"
                    >
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                   </div>
                  </>
                )}
                {highestTask.map((item, index) => (
                  <Card hoverable key={index}>
                    <CardMeta
                      title={
                        <label className="capitalize-first">{item.title}</label>
                      }
                      description={
                        <label className="capitalize-first">
                          {item.description}
                        </label>
                      }
                    />

                    <div className="mt-4 flex justify-between item-center ">
                      <div className=" flex gap-2">
                        <Tag className="capatalize">{item.status}</Tag>
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white hover:scale-101 bg-rose-700 border-rose-800 transition-transform duration-300 " onClick={()=>deleteTask(item.id)}>
                          Delete
                        </Tag>
                      </div>
                      <Select className="hover:scale-102 transition-transform duration-300  hover:!bg-green-50" size="small" placeholder="change status" onChange={(status)=>updateStatus(item.id,status)} >
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="completed">
                          completed
                        </Select.Option>
                        <Select.Option value="In progress">
                          In progress
                        </Select.Option>
                      </Select>
                    </div>
                    <label className="text-slate-400 text-xs flex mt-3" >{moment(item.createdAt).format("DD MMM YYYY hh:mm A")}</label>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:min-h-0 lg:h-full h-[400px] ">
            <Badge.Ribbon
              text="Medium"
              className=" font-semibold z-[3000] bg-[linear-gradient(337deg,_#30cfd0,_#330867,_hsl(291.5,_83.25553236418475%,_46.91286645479472%))]"
            />
            <div className="bg-gray-50  rounded-2xl h-full overflow-auto min-h-0  p-6 ">
              <div className="flex flex-col gap-8 mt-6">
                {mediumTask.length === 0 && (
                  <>
                   <div className=" mt-[80px] space-y-7">
                     <Empty description="Add your task here !" />
                    <button
                      onClick={() => setOpen(true)}
                      className=" w-fit mx-auto flex  px-3 py-2 text-sm  rounded-xl items-center text-white 
              focus:shadow-2xl hover:scale-103 transition-transform duration-300 cursor-pointer 
               bg-[linear-gradient(45deg,_#00c6ff,_#0072ff,_hsl(228.4,_78.25720028383995%,_41.079564566897226%))] 
              hover:bg-[linear-gradient(239deg,_#fbc2eb,_#a6c1ee,_hsl(172.2,_83.62332220715885%,_59.76924544777433%))] hover:text-black"
                    >
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                   </div>
                  </>
                )}
                {mediumTask.map((item, index) => (
                  <Card hoverable key={index}>
                    <CardMeta
                      title={
                        <label className="capitalize-first">{item.title}</label>
                      }
                      description={
                        <label className="capitalize-first">
                          {item.description}
                        </label>
                      }
                    />

                    <div className="mt-4 flex justify-between item-center ">
                      <div className=" flex gap-2">
                        <Tag className="capatalize">{item.status}</Tag>
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white hover:scale-101 bg-rose-700 border-rose-800 " onClick={()=>deleteTask(item.id)}>
                          
                          Delete
                        </Tag>
                      </div>
                      <Select className="hover:scale-102 transition-transform duration-300  hover:!bg-green-50" size="small" placeholder="change status" onChange={(status)=>updateStatus(item.id,status)}>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="completed">
                          completed
                        </Select.Option>
                        <Select.Option value="In progress">
                          In progress
                        </Select.Option>
                      </Select>
                    </div>
                       <label className="text-slate-400 text-xs flex mt-3" >{moment(item.createdAt).format("DD MMM YYYY hh:mm A")}</label>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:min-h-0 lg:h-full h-[400px]">
            <Badge.Ribbon
              text="Lowest"
              className=" font-semibold z-[3000] bg-[linear-gradient(2deg,_#00c6ff,_#0072ff)]"
            />
            <div className="bg-gray-50 rounded-2xl h-full overflow-auto min-h-0  p-6 ">
              <div className="flex flex-col gap-8 mt-6">
                {lowestTask.length === 0 && (
                  <>
                   <div className=" mt-[80px] space-y-7">
                     <Empty description=" Add your task here !" />
                    <button
                      onClick={() => setOpen(true)}
                      className=" w-fit mx-auto flex  px-3 py-2 text-sm  rounded-xl items-center text-white 
              focus:shadow-2xl hover:scale-103 transition-transform duration-300 cursor-pointer 
               bg-[linear-gradient(45deg,_#00c6ff,_#0072ff,_hsl(228.4,_78.25720028383995%,_41.079564566897226%))] 
              hover:bg-[linear-gradient(239deg,_#fbc2eb,_#a6c1ee,_hsl(172.2,_83.62332220715885%,_59.76924544777433%))] hover:text-black"
                    >
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                   </div>
                  </>
                )}
                {lowestTask.map((item, index) => (
                  <Card hoverable key={index}>
                    <CardMeta
                      title={
                        <label className="capitalize-first">{item.title}</label>
                      }
                      description={
                        <label className="capitalize-first">
                          {item.description}
                        </label>
                      }
                    />

                    <div className="mt-4 flex justify-between item-center ">
                      <div className=" flex gap-2">
                        <Tag className="capatalize">{item.status}</Tag>
                        <Tag className="!bg-rose-600 !border-rose-600 !text-white hover:scale-101 bg-rose-700 border-rose-800 " onClick={()=>deleteTask(item.id)}>
                          Delete
                        </Tag>
                      </div>
                      <Select className="hover:scale-102 transition-transform duration-300  hover:!bg-green-50" size="small" placeholder="change status" onChange={(status)=>updateStatus(item.id,status)}>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="completed">
                          completed
                        </Select.Option>
                        <Select.Option value="In progress">
                          In progress
                        </Select.Option>
                      </Select>
                    </div>
                      <label className="text-slate-400 text-xs flex mt-3" >{moment(item.createdAt).format("DD MMM YYYY hh:mm A")}</label>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Model Start */}

        <Modal
          open={open}
          footer={null}
          onCancel={handleClose}
          maskClosable={false}
        >
          <h1 className="text-lg font-medium mb-3"> New Task</h1>
          <Form onFinish={createTask} form={form}>
            <Form.Item name="title" rules={[{ required: true }]}>
              <Input placeholder="Task name" size="large" />
            </Form.Item>

            <Form.Item name="description" rules={[{ required: true }]}>
              <Input.TextArea placeholder="Add your description" rows={5} />
            </Form.Item>

            <Form.Item name="priority" rules={[{ required: true }]}>
              <Select size="large" placeholder="choose your priority">
                <Select.Option value="highest">Highest</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="lowest">Lowest</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" size="large">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Model End */}
      </div>
    </>
  );
}
