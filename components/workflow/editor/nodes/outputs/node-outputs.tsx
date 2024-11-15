"use client";

import { FC, ReactNode } from "react";

interface NodeOutputsProps {
  children: ReactNode;
}

const NodeOutputs: FC<NodeOutputsProps> = ({ children }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export default NodeOutputs;
