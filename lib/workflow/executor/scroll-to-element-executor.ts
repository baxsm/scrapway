import { ExecutionEnvironment } from "@/types/executor";
import { ScrollToElementTask } from "../task/scroll-to-element-task";

export const ScrollToElementExecutor = async (
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }

    await environment.getPage()!.evaluate((e) => {
      const element = document.querySelector(e);
      if (!element) {
        throw new Error("Element not found");
      }

      const posY = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: posY, behavior: "instant" });
    }, selector);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
