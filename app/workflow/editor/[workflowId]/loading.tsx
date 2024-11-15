import { Loader2 } from "lucide-react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 size={30} className="stroke-primary animate-spin" />
    </div>
  );
};

export default Loading;
