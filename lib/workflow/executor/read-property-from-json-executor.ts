import { ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJsonTask } from "../task/read-property-from-json-task";

export const ReadPropertyFromJsonExecutor = async (
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> => {
  try {
    const jsonString = environment.getInput("JSON");

    if (!jsonString) {
      environment.log.error("JSON is not defined");
      return false;
    }

    const propertyName = environment.getInput("Property name");

    if (!propertyName) {
      environment.log.error("Property name is not defined");
      return false;
    }

    const jsonObj = JSON.parse(jsonString);

    const propertyValue = jsonObj[propertyName];

    if (propertyValue === undefined) {
      environment.log.error("Property not found");
      return false;
    }

    environment.setOutput("Property value", propertyValue);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
