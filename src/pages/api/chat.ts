import type { NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { ChatApiRequest } from "@/core/dtos/gpt/chatApi";

export default async function handler(
  req: ChatApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { message, data, context, contextLimit } = req.body;
    const limitedContext =
      context && contextLimit
        ? context.slice(context.length - contextLimit)
        : [];
    const content = `${data ? `할 일 목록: ${data}` : ""} ${limitedContext.length ? `지금까지 나눈 대화: ${JSON.stringify(limitedContext)}` : ""} ${message}`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      res.status(200).json(response.data);
    } catch (error) {
      const e = error as AxiosError;
      res.status(e.status ?? 500).json(e.response);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
