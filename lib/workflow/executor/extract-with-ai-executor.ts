import { ExecutionEnvironment } from "@/types/executor";
import { ExtractWithAiTask } from "../task/extract-with-ai-task";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAI from "openai";

export const ExtractWithAiExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractWithAiTask>
): Promise<boolean> => {
  try {
    const credentialId = environment.getInput("Credentials");

    if (!credentialId) {
      environment.log.error("Credential is not defined");
    }

    const content = environment.getInput("Content");

    if (!content) {
      environment.log.error("Content is not defined");
    }

    const prompt = environment.getInput("Prompt");

    if (!prompt) {
      environment.log.error("Prompt is not defined");
    }

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentialId,
      },
    });

    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);

    if (!plainCredentialValue) {
      environment.log.error("Unable to decrypt credential");
      return false;
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: plainCredentialValue,
    });

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON without any surrounding text.",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 600,
    });

    if (openaiResponse.usage?.prompt_tokens) {
      environment.log.info(
        `Prompt tokens: ${openaiResponse.usage?.prompt_tokens}`
      );
    }

    if (openaiResponse.usage?.completion_tokens) {
      environment.log.info(
        `Completion tokens: ${openaiResponse.usage?.completion_tokens}`
      );
    }

    const result = openaiResponse.choices[0].message?.content;

    if (!result) {
      environment.log.error("Empty response from AI");
      return false;
    }

    environment.setOutput("Extracted data", result);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
