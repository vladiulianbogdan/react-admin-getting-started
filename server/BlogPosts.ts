import { GenezioDeploy, GenezioAuth, GnzContext } from "@genezio/types";
import {IDataProviderService, DataProviderListParams, DataProviderResponse} from "./DataProvider";

import data from "./data.json";

type Category = {
  id?: number;
  title: string;
}

type BlogPost = {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
  status: string;
  createdAt: string;
}

let bd: BlogPost[] = data.blogPosts;
let cd: Category[] = data.categories;

@GenezioDeploy()
export class BlogPosts implements IDataProviderService<BlogPost>{
  constructor() {}

  async getList(context: GnzContext, {pagination, sort, filter} : DataProviderListParams) {
    let r:DataProviderResponse<any> = {data: [] as Record<string, any>, total: 0};
    bd.forEach((item:any) => {
      const cat = cd.find((c) => c.id == item.categoryId);
      if (cat) {
          item.category = cat;
      }
      r.data.push(item);
    });
    r.total = r.data.length;

    const {page, perPage} = pagination;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    r.data = r.data.slice(startIndex, endIndex);
    return r;
  }
  
  async getOne(context: GnzContext, id: number) {
    let r = {data: bd.find((item) => item.id == id), total: 1};
    return r;
  }
  
  //@GenezioAuth()
  async create(context: GnzContext, bp: BlogPost) {
    const maxId = bd.length > 0 ? Math.max(...bd.map(item => item.id!)) : 0;
    bp.id = maxId + 1;
    bd.push(bp);
    return {data: bp};
  }
  
  //@GenezioAuth()
  async update(context: GnzContext, bp: BlogPost) {
      const index = bd.findIndex((item) => item.id == bp.id);
      if (index === -1) throw new Error("Not found");
      bd[index] = bp;
      return {data: bd[index]};
    }
  
  //@GenezioAuth()
  async deleteOne(context: GnzContext, id: number) {
    const index = bd.findIndex((item) => item.id == id);
    if (index === -1) throw new Error("Not found");
    const deletedItem = bd[index];
    bd.splice(index, 1);
    return {data: deletedItem};
  }

  //@GenezioAuth()
  async deleteMany(context: GnzContext, ids: number[]) {
    console.log("User: ", context.user?.email, " deleted a few blog posts");
    let deletedIds: number[] = [];

    ids.forEach((id) => {
      const index = bd.findIndex((item) => item.id == id);
      if (index !== -1) {
        bd.splice(index, 1);
        deletedIds.push(id)
      }
    });

    return {data: deletedIds};
  }
}