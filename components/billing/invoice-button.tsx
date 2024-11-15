"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { downloadInvoice } from "@/actions/billing";
import { toast } from "sonner";

interface InvoiceButtonProps {
  id: string;
}

const InvoiceButton: FC<InvoiceButtonProps> = ({ id }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: downloadInvoice,
    onSuccess: (data) => {
      window.location.href = data || "";
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm text-muted-foreground flex gap-2 px-1"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      Invoice
    </Button>
  );
};

export default InvoiceButton;
