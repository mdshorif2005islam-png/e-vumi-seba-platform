export type Role = "owner" | "staff" | "agent" | "customer";

export interface Profile {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  address: string | null;
  district: string | null;
  territory: string | null;
  nid_number: string | null;
  agent_code: string | null;
  bio: string | null;
}

export type Stats = Record<string, number>;
