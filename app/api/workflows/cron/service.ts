import { getAppUrl } from "@/lib/appUrl";

export const triggerWorkflow = (workflowId: string) => {
  const triggerApiUrl = getAppUrl(
    `/api/workflows/execute?workflowId=${workflowId}`
  );

  fetch(triggerApiUrl, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
  }).catch((error) =>
    console.error("Error triggering workflow:", workflowId, error)
  );
};
