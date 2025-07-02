declare type Statistics = {
  statistics: {
    overall: {
      totalProducts: number;
      totalOrders: number;
      totalCategories: number;
      totalRevenue: number;
    };
    products: {
      productsByCategory: Array<{
        _id: string;
        count: number;
        category: string;
        products: Array<{
          title: string;
          price: number;
          imgCover: string;
          quantity: number;
          sold: number;
        }>;
      }>;
      topSellingProducts: Array<{
        _id: string;
        title: string;
        imgCover: string;
        price: number;
        sold: number;
        id: string;
      }>;
      lowStockProducts: Array<{
        _id: string;
        title: string;
        imgCover: string;
        price: number;
        quantity: number;
        id: string;
      }>;
    };
    orders: {
      ordersByStatus: Array<{
        _id: string | null;
        count: number;
      }>;
      dailyRevenue: Array<{
        _id: string;
        revenue: number;
        count: number;
      }>;
      monthlyRevenue: Array<{
        _id: string;
        revenue: number;
        count: number;
      }>;
    };
    categories: Array<{
      _id: string;
      name: string;
      totalProducts: number;
      totalRevenue: number;
    }>;
  };
};
