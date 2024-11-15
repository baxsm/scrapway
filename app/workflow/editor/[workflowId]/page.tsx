"use server";

import Editor from "@/components/workflow/editor/editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { FC } from "react";

interface WorkflowEditorProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowEditor: FC<WorkflowEditorProps> = async ({ params }) => {
  const { workflowId } = await params;

  if (!workflowId) {
    notFound();
  }

  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div className="">Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
};

export default WorkflowEditor;
