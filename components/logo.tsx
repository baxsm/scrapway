import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  fontSize?: string;
  iconSize?: number;
}

const Logo: FC<LogoProps> = ({ fontSize = "text-2xl", iconSize = 20 }) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
        <SquareDashedMousePointer size={iconSize} className="text-white" />
      </div>
      <div className="">
        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Scrap
        </span>
        <span className="text-stone-700 dark:text-stone-300">way</span>
      </div>
    </Link>
  );
};

export default Logo;
