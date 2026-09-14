export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Mono summary text, e.g. "Cycles 1–14". */
  summary?: string;
  className?: string;
}
