import { get, patch, post, del } from '@/utils/httpMethods';
import { IPractice, IPracticeQueryParams } from '@/pages/practice/types';

export async function queryPracticeCreate(payload: any): Promise<any> {
  return post({ url: '/practice', data: payload });
}

export async function queryPracticeGetById(id: string): Promise<any> {
  return get({ url: `/practice/${id}` });
}

export async function queryPracticeUpdateById(payload: { practiceId: string; values: IPractice }): Promise<any> {
  return patch({ url: `/practice/${payload.practiceId}`, data: payload.values });
}

export async function queryPracticeDeleteById(practiceId: string): Promise<any> {
  return del({ url: `/practice/${practiceId}` });
}

export async function queryPracticeSearch(payload: IPracticeQueryParams): Promise<any> {
  return post({ url: '/practice/search', data: payload });
}

export async function queryPracticeGetAll(): Promise<any> {
  return get({ url: '/practice' });
}

export async function queryPracticeGetStats(): Promise<any> {
  return get({ url: `/practice/stats` });
}
