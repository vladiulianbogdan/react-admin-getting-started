import { GenezioDeploy, GenezioAuth, GnzContext } from "@genezio/types";
import {IDataProviderService, DataProviderListParams} from "./DataProvider";
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
export class Categories implements IDataProviderService<Category>{
  constructor() {}

  async getList(_context: GnzContext, {pagination, sort, filter} : DataProviderListParams) {
    const {page, perPage} = pagination;
  
    // Filter the data
    let filteredData = cd;

    if (filter.field === "title" && filter.operator === "contains" && filter.value) {
      filteredData = filteredData.filter((item: any) =>
        item.title.toLowerCase().includes(filter.value?.toLowerCase())
      );
    }

    if (filter.q != undefined) {
      filteredData = filteredData.filter((item: any) =>
        item.title.toLowerCase().includes(filter.q?.toLowerCase())
      );
    }
  
    // Sort the data
    const { field, order } = sort;

    filteredData = filteredData.sort((a: any, b: any) => {
      if (order.toLowerCase() === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  
    let paginatedData;
    if (page && perPage) {
      // Apply pagination to the filtered and sorted data
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      paginatedData = filteredData.slice(startIndex, endIndex);
    } else {
      paginatedData = filteredData;
    }
  
    return {data: paginatedData, total: filteredData.length};
  }
  
  async getOne(context: GnzContext, id: number) {
    return {data: cd.find((item) => item.id == id), total: 1};
  }
  
  async getMany(context: GnzContext, ids: number[]) {
    const data = cd.filter((item: any) => ids.includes(item.id));
    return { data, total: data.length };
  }
  
  //@GenezioAuth()
  async create(context: GnzContext, c: Category) {
    console.log("User: ", context.user?.email, " created a category");
    const maxId = cd.length > 0 ? Math.max(...cd.map(item => item.id!)) : 0;
    c.id = maxId + 1;
    cd.push(c);
    return {data: cd.find((item) => item.id == c.id)};
  }

  //@GenezioAuth()
  async update(context: GnzContext, c: Category) {
    console.log("User: ", context.user?.email, " updated a category");
    const index = cd.findIndex((item) => item.id == c.id);
    if (index === -1) throw new Error("Not found");
    console.log(c);
    cd[index].title = c.title;
    return {data: cd[index]};
  }

  //@GenezioAuth()
  async deleteOne(context: GnzContext, id: number) {
    const index = cd.findIndex((item) => item.id == id);
    if (index === -1) throw new Error("Not found");

    const blogIndex = bd.findIndex((item) => item.categoryId == id);
    if (blogIndex !== -1) throw new Error("Category is in use");

    const deletedItem = cd[index];
    cd.splice(index, 1);
    console.log("User: ", context.user?.email, " deleted a category");
    return {data: deletedItem};
  }

  //@GenezioAuth()
  async deleteMany(context: GnzContext, ids: number[]) {
    console.log("User: ", context.user?.email, " deleted a few categories");
    let deletedIds: number[] = [];

    ids.forEach((id) => {
      const index = cd.findIndex((item) => item.id == id);
      if (index !== -1) {
        const blogIndex = bd.findIndex((item) => item.categoryId == id);
        if (blogIndex === -1) { // Only delete if no blog post uses this category
          cd.splice(index, 1);
          deletedIds.push(id);
        } else {
          console.log(`Category with id ${id} is in use and cannot be deleted`);
        }
      }
    });

    return {data: deletedIds};
  }
}
