export interface IPractice {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPracticeStats {
  totalPractice: number;
  todayPractice: number;
  monthPractice: number;
  averagePractice: number;
}

export interface IPracticeQueryParams {
  limit?: number | string;
  page?: number | string;
  practiceSearchParam1?: string;
  practiceSearchParam2?: string;
}
