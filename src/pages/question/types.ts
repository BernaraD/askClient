export interface IQuestion {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionStats {
  totalQuestion: number;
  todayQuestion: number;
  monthQuestion: number;
  averageQuestion: number;
}

export interface IQuestionQueryParams {
  limit?: number | string;
  page?: number | string;
  questionSearchParam1?: string;
  questionSearchParam2?: string;
}
