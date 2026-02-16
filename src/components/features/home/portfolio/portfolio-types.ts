export type PortfolioMetric = {
  label: string;
  value: string;
};

export type PortfolioImage = {
  src: string;
  className: string;
};

export type PortfolioItem = {
  name: string;
  badge: string;
  description: string;
  visualType: "mobile" | "web";
  images: PortfolioImage[];
  metrics: PortfolioMetric[];
};
