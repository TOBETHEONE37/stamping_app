import type { StampIssueHistory, User } from "@/types/stamp";
import apiClient from "../client";

export const findUserByLast4Digits = async (digits: string): Promise<User> => {
  const res = await apiClient.get(`/user/last4digits?digits=${digits}`);
  return res.data;
};

export const issueStamp = async (userId: number, count: number) => {
  await apiClient.post(`/stamp/issue`, { userId, count });
};

export const getTodayIssues = async (): Promise<StampIssueHistory[]> => {
  const res = await apiClient.get(`/stamp/today-issues`);
  return res.data;
};
