// src/types/niche.ts

export interface NicheStats {
  totalLeads: number;
  hotLeads: number;
  totalScans: number;
}

export interface Niche {
  _id: string;
  userId: string;
  name: string;
  keywords: string[];
  location: string;
  sources: string[];
  isActive: boolean;
  stats: NicheStats;
  lastScanAt: string | null;
  createdAt: string;
  updatedAt: string;
}