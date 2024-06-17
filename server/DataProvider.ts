import { GnzContext } from "@genezio/types";

// Generic interface for response
export type DataProviderResponse<T> = {
  data: T | T[] | undefined;
  total?: number;
}

// Type for the list parameters
export type DataProviderListParams = {
  pagination: {
    page: number;
    perPage: number;
  };
  sort: {
    field: string;
    order: string;
  };
  filter: {
    field?: string;
    operator?: string;
    value?: string;
    q?: string;
  };
};

// Generic interface for the data provider service
export interface IDataProviderService<T> {
  getList(context: GnzContext, params: DataProviderListParams): Promise<DataProviderResponse<T>>;
  getOne(context: GnzContext, id: any): Promise<DataProviderResponse<T>>;
  create(context: GnzContext, params: Record<string, any>): Promise<DataProviderResponse<T>>;
  update(context: GnzContext, params: Record<string, any>): Promise<DataProviderResponse<T>>;
  deleteOne(context: GnzContext, id: any): Promise<DataProviderResponse<T>>;
  deleteMany(context: GnzContext, id: any[]): Promise<DataProviderResponse<any>>;
}
