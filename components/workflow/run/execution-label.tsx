import { LucideIcon } from "lucide-react";
import { FC, ReactNode } from "react";

interface ExecutionLabelProps {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}

const ExecutionLabel: FC<ExecutionLabelProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
};

export default ExecutionLabel;
