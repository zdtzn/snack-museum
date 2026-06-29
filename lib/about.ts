// 关于页共享数据类型定义

export interface AboutStat {
  icon: string;
  num: string;
  label: string;
}

export interface AboutUsData {
  title: string;
  subtitle: string;
  content: string;
  stats: AboutStat[];
}

export interface BrandItem {
  name: string;
  desc: string;
  emoji: string;
  highlight: boolean;
}

export interface BrandsData {
  title: string;
  items: BrandItem[];
}

export interface StoreAddress {
  label: string;
  addr: string;
}

export interface StoresData {
  title: string;
  addresses: StoreAddress[];
  phones: string[];
}

export interface CooperationData {
  title: string;
  advantages: string[];
  processSteps?: string[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface TestimonialsData {
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export interface AboutData {
  aboutUs: AboutUsData;
  brands: BrandsData;
  stores: StoresData;
  cooperation: CooperationData;
  testimonials: TestimonialsData;
}

// 价格对比数据类型
export interface PriceComparisonSlide {
  label: string;
  desc: string;
  emoji: string;
}

export interface PriceComparisonData {
  title: string;
  subtitle: string;
  left: { label: string; desc: string; };
  right: { label: string; desc: string; };
  slides: PriceComparisonSlide[];
}
