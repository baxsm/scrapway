import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./extract-text-from-element-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { PageToHtmlTask } from "./page-to-html-task";
import { WorkflowTask } from "@/types/workflows";
import { FillInputTask } from "./fill-input";
import { ClickElementTask } from "./click-element-task";
import { WaitForElementTask } from "./wait-for-element-task";
import { DeliverViaWebhookTask } from "./deliver-via-webhook-task";
import { ExtractWithAiTask } from "./extract-with-ai-task";
import { ReadPropertyFromJsonTask } from "./read-property-from-json-task";
import { AddPropertyToJsonTask } from "./add-property-to-json-task";
import { NavigateUrlTask } from "./navigate-url-task";
import { ScrollToElementTask } from "./scroll-to-element-task";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_WITH_AI: ExtractWithAiTask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
  NAVIGATE_URL: NavigateUrlTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
};
