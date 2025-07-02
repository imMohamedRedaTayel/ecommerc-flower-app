declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type RouteProps = {
  params: { locale: "en" | "ar" };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type Category = {
  _id: string;
  name: string;
  image: string;
  productsCount: number;
};


declare type CategoriesResponse = {
  message: string;
  metadata: Metadata;
  categories: Category[];
};