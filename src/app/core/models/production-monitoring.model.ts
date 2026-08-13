export interface ShiftCardData {
  total: number;
  username: string | null;
  color: 'red' | 'orange' | 'blue';
  datetime_start: string | null;
  datetime_end: string | null;
}

export interface ShiftCards {
  Pagi: ShiftCardData;
  Siang: ShiftCardData;
  Malam: ShiftCardData;
}

export interface ScanDetailRow {
  date_time: string;
  original_barcode: string;
  brand: string;
  model: string;
  color: string;
  size: string;
  quantity: number;
  username: string;
  description: string;
  scan_no: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Shape of the existing 'dashboard:update' event emitted by scan-backend
// on every scan insert (see routes/receiving.routes.js). We only use it
// as a "something changed, refetch" signal here.
export interface DashboardUpdateEvent {
  type: 'RECEIVING' | 'SHIPPING' | string;
  barcode?: string;
  model?: string;
  color?: string;
  size?: string;
  item?: string;
  quantity?: number;
  username?: string;
  timestamp?: string;
}