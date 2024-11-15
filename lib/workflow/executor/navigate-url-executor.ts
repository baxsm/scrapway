import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/navigate-url-task";

export const NavigateUrlExecutor = async (
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> => {
  try {
    const url = environment.getInput("URL");

    if (!url) {
      environment.log.error("Url is not defined");
      return false;
    }

    await environment.getPage()!.goto(url);

    environment.log.info(`Visited ${url}`);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
