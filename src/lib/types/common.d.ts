declare type searchParams = { [key: string]: string | string[] | undefined };

declare type RouteProps = {
    params: { locale: "en" | "ar" };
    searchParams: searchParams;
};

declare type LayoutProps = {
    children: React.ReactNode
} & Pick<RouteProps , "params" >