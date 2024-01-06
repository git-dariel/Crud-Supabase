"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/Table";
import { supabase } from "@/lib/SupabaseClient";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const [task, setTask] = useState("");
  const [views, setViews] = useState<any[]>([]);

  //Create new Task
  const handleAddSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (task === "") {
      toast.error("Please add a task");
      return;
    }

    const { data, error } = await supabase
      .from("views")
      .insert([{ tasks: task }]);

    if (error) {
      console.log(error);
      return;
    } else {
      toast.success("Tasks added successfully");
      console.log(data);
    }

    setTask("");
    fetchViews();
  };

  useEffect(() => {
    fetchViews();
  }, []);

  //Display the created Tasks
  const fetchViews = async () => {
    try {
      const { data, error } = await supabase.from("views").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setViews(data);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  //Delete the created Tasks
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      try {
        await supabase.from("views").delete().eq("id", id);
        toast.success("Task deleted successfully");
        fetchViews();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete task");
      }
    }
  };

  //Delete All the created Tasks
  const handleDeleteAll = async () => {
    const confirmDelete = confirm("Are you sure you want to delete all tasks?");

    if (confirmDelete) {
      try {
        await supabase
          .from("views")
          .delete()
          .not("tasks", "eq", "Do not delete me");
        toast.success("All Task are deleted successfully");
        fetchViews();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete task");
      }
    }
  };

  return (
    <div className="pt-20 px-10">
      <h1 className="text-2xl text-center mb-10">To Do App with Supabase</h1>

      <div className="flex flex-row items-center justify-center gap-5">
        <Input
          type="text"
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant={"secondary"} onClick={handleAddSubmit}>
          Add
        </Button>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="flex flex-col items-center justify-center">
        {views.length === 0 ? (
          <Image
            src="/empty.svg"
            alt="No data"
            width={500}
            height={500}
            priority={true}
            className="mt-28 sm:mt-20"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Table>
              <TableHead>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Tasks</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
              </TableHead>

              <TableBody>
                {views.map((view) => (
                  <TableRow key={view.id}>
                    <TableCell>{view.id}</TableCell>
                    <TableCell>{view.tasks}</TableCell>
                    <TableCell>
                      <button
                        className=" hover:text-red-700"
                        onClick={() => handleDelete(view.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant={"secondary"}
              onClick={handleDeleteAll}
              className="mt-10"
            >
              Clear Tasks
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
