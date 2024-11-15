import { ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser-task";

export const LaunchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch({
      headless: true,
    });

    environment.setBrowser(browser);

    environment.log.info("Browser started successfully")

    const page = await browser.newPage();
    await page.goto(websiteUrl);

    environment.log.info(`Opened page at: ${websiteUrl}`)

    environment.setPage(page);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
