import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../task/page-to-html-task";

export const PageToHtmlExecutor = async (
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> => {
  try {
    const html = await environment.getPage()!.content();

    environment.setOutput("Html", html);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};