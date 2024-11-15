import { ParamProps } from "@/types/custom-node";
import { FC } from "react";

const BrowserInstanceParam: FC<ParamProps> = ({ param }) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
