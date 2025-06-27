export interface StatData {
  percentage: number;
  label: string;
  color: string;
}

export interface QuestionStats {
  total: number;
  correct: number;
  incorrect: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}