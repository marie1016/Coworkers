import { ChatRequestBody, ChatResponse } from "@/core/dtos/gpt/chatApi";
import axios, { AxiosError, AxiosResponse } from "axios";

export default async function postChat(chatRequestBody: ChatRequestBody) {
  const response: AxiosResponse<ChatResponse> = await axios
    .post("/api/chat", chatRequestBody)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return response.data;
}
