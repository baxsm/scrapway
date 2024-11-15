"use client";
import { FC, useEffect, useState } from "react";
import ReactCountup from "react-countup";

interface ReactCountupWrapperProps {
  value: number;
}

const ReactCountupWrapper: FC<ReactCountupWrapperProps> = ({ value }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false)
    }
  }, []);

  if (!mounted) {
    return "-";
  }

  return <ReactCountup duration={0.5} preserveValue end={value} decimals={0} />;
};

export default ReactCountupWrapper;
