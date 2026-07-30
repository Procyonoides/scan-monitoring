export interface ShiftSummaryRow {
  username: string;
  datetime_start: string;
  datetime_end: string;
  total_quantity: number;
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