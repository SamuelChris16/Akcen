export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number; }
  };
}

export interface StrapiDocIdx {
  documentId: string,
  id: number
}
