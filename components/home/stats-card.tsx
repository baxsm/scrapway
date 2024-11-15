import { LucideIcon } from "lucide-react";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactCountupWrapper from "../react-countup-wrapper";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const StatsCard: FC<StatsCardProps> = ({ icon: Icon, title, value }) => {
  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountupWrapper value={Number(value)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
