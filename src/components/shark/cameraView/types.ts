export type TankStatus = "online" | "offline" | "warning";

export type Tank = {
  id: string;
  name: string;
  streamUrl: string;
  status: TankStatus;
  fishCount?: number;
  lastUpdated?: string;
};
