export interface DashboardResponse {
  status: boolean;
  code: number;
  payload: DashboardPayload;
}

export interface DashboardPayload {
  summary: DashboardSummary;
  categories: Category[];
  orderStatus: OrderStatus;
  revenue: Revenue;
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

export interface DashboardSummary {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  currency: string;
}

export interface Category {
  id: string;
  title: string;
  productCount: number;
}

export interface OrderStatus {
  completed: OrderStatusItem;
  inProgress: OrderStatusItem;
  canceled: OrderStatusItem;
  totalOrders: number;
}

export interface OrderStatusItem {
  count: number;
  percent: number;
}

export interface Revenue {
  period: string;
  points: RevenuePoint[];
}

export interface RevenuePoint {
  period: string;
  label: string;
  revenue: number;
}

export interface TopSellingProduct {
  productId: string;
  title: string;
  unitPrice: number;
  totalSales: number;
}

export interface LowStockProduct {
  id: string;
  title: string;
  stock: number;
}
