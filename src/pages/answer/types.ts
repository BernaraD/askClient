export interface IAnswer {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAnswerStats {
  totalAnswer: number;
  todayAnswer: number;
  monthAnswer: number;
  averageAnswer: number;
}

export interface IAnswerQueryParams {
  limit?: number | string;
  page?: number | string;
  answerSearchParam1?: string;
  answerSearchParam2?: string;
}
