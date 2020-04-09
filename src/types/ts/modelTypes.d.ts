export type TCategory = undefined | "study" | "daily" | "game";

export interface UnifiedModel {
  _id: any;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface PostModel {
  title: string;
  description: String;
  contents: string;
  views: number;
  category: TCategory;
  postedBy: string;
}
