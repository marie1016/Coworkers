import { NextApiRequest } from "next";
import { TaskListTasks } from "../group/group";

interface Choice {
  message: {
    role: string;
    content: string | null;
    refusal?: string | null;
  };
  logprobs: unknown;
  finish_reason: string;
  index: number;
}

export interface Message {
  id: string;
  text: string;
  from: "user" | "chatgpt";
}

export interface ChatRequestBody {
  message: string;
  data?: TaskListTasks[];
  context?: Message[];
  contextLimit?: number;
}

export interface ChatApiRequest extends NextApiRequest {
  body: ChatRequestBody;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  service_tier?: string | null;
  system_fingerprint: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: {
      reasoning_tokens: number;
    };
  };
  choices: Choice[];
}
