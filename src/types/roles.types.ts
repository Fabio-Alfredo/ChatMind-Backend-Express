export const roles = ["admin", "user", "guest"] as const;
export type Roles = typeof roles[number];