import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/custom-node";
import { FC, useEffect, useId, useState } from "react";

const StringParam: FC<ParamProps> = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}) => {
  const id = useId();

  const [internalValue, setInternalValue] = useState(value ?? "");

  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);

  let Component: typeof Input | typeof Textarea = Input;

  if (param.variant === "textarea") {
    Component = Textarea;
  }

  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
        placeholder="Enter value here"
        className="text-xs"
        disabled={disabled}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
