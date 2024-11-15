import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/wait-for-element-task";

export const WaitForElementExecutor = async (
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }

    const visibility = environment.getInput("Visibility");

    if (!visibility) {
      environment.log.error("Visibility is not defined");
      return false;
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`Element ${selector} became: ${visibility}`)

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
