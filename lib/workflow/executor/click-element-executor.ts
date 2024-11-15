import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/click-element-task";

export const ClickElementExecutor = async (
  environment: ExecutionEnvironment<typeof ClickElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }

    await environment.getPage()!.click(selector);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
