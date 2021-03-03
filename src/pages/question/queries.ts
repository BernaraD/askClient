import { get, patch, post, del } from '@/utils/httpMethods';
import { IQuestion, IQuestionQueryParams } from '@/pages/question/types';

export async function queryQuestionCreate(payload: any): Promise<any> {
  return post({ url: '/question', data: payload });
}

export async function queryQuestionGetById(id: string): Promise<any> {
  return get({ url: `/question/${id}` });
}

export async function queryQuestionUpdateById(payload: { questionId: string; values: IQuestion }): Promise<any> {
  return patch({ url: `/question/${payload.questionId}`, data: payload.values });
}

export async function queryQuestionDeleteById(questionId: string): Promise<any> {
  return del({ url: `/question/${questionId}` });
}

export async function queryQuestionSearch(payload: IQuestionQueryParams): Promise<any> {
  return post({ url: '/question/search', data: payload });
}

export async function queryQuestionGetAll(): Promise<any> {
  return get({ url: '/question' });
}

export async function queryQuestionGetStats(): Promise<any> {
  return get({ url: `/question/stats` });
}
