import { get, patch, post, del } from '@/utils/httpMethods';
import { IAnswer, IAnswerQueryParams } from '@/pages/answer/types';

export async function queryAnswerCreate(payload: any): Promise<any> {
  return post({ url: '/answer', data: payload });
}

export async function queryAnswerGetById(id: string): Promise<any> {
  return get({ url: `/answer/${id}` });
}

export async function queryAnswerUpdateById(payload: { answerId: string; values: IAnswer }): Promise<any> {
  return patch({ url: `/answer/${payload.answerId}`, data: payload.values });
}

export async function queryAnswerDeleteById(answerId: string): Promise<any> {
  return del({ url: `/answer/${answerId}` });
}

export async function queryAnswerSearch(payload: IAnswerQueryParams): Promise<any> {
  return post({ url: '/answer/search', data: payload });
}

export async function queryAnswerGetAll(): Promise<any> {
  return get({ url: '/answer' });
}

export async function queryAnswerGetStats(): Promise<any> {
  return get({ url: `/answer/stats` });
}
