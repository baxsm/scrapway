import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/add-property-to-json-task";

export const AddPropertyToJsonExecutor = async (
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
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

    const propertyValue = environment.getInput("Property value");

    if (!propertyValue) {
      environment.log.error("Property value is not defined");
      return false;
    }

    const jsonObj = JSON.parse(jsonString);

    jsonObj[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(jsonObj));

    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
