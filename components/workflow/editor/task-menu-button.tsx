"use client";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { DragEvent, FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

interface TaskMenuButtonProps {
  taskType: TaskType;
}

const TaskMenuButton: FC<TaskMenuButtonProps> = ({ taskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: DragEvent<HTMLButtonElement>, type: TaskType) => {
    const dataTransfer = event.dataTransfer;

    if (dataTransfer) {
      dataTransfer.setData("application/reactflow", type);
      dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <div className="flex items-center gap-2 w-full">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge className="gap-2 flex items-center" variant="outline">
        <Coins size={16} />
        {task.credits}
      </Badge>
    </Button>
  );
};

export default TaskMenuButton;
