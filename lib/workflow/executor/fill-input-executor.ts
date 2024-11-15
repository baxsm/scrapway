import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/fill-input";

export const FillInputExecutor = async (
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("input->selector is not defined");
    }

    const value = environment.getInput("Value");

    if (!selector) {
      environment.log.error("input->value is not defined");
    }

    await environment.getPage()!.type(selector, value);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
