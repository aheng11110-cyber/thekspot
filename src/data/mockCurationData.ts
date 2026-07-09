import { Language } from '../contexts/LanguageContext';

export type LocationData = {
  id: string;
  name: string;
  city: string;
  province: string;
  type: 'restaurant' | 'cafe' | 'popup' | 'concert' | 'culture' | 'healing';
  description: string;
  imageUrl: string;
  links?: {
    instagram?: string;
    blog?: string;
  };
  schedule?: {
    startDate: string;
    endDate: string;
    time?: string;
  };
  lat?: number;
  lng?: number;
  tags: string[];
  groupSizes: string[];
};

export const MOCK_LOCATIONS: Record<Language, LocationData[]> = {
  EN: [
    {
      id: "1", name: "Seongsu Popup Store", city: "Seoul", province: "Seoul", type: "popup",
      description: "A limited-edition exhibition with unique spatial design.",
      imageUrl: "/images/39.jpg", links: { instagram: "https://instagram.com" },
      schedule: { startDate: "2026-07-15", endDate: "2026-08-15" },
      tags: ["Popup Store", "K-Culture"], groupSizes: ["Solo", "2-3 People", "4-5 People"],
    },
    {
      id: "2", name: "Samcheong-dong Hanok Cafe", city: "Seoul", province: "Seoul", type: "cafe",
      description: "Enjoy a relaxing tea time in a traditional Korean Hanok.",
      imageUrl: "/images/29.jpg", links: { instagram: "https://instagram.com", blog: "https://blog.naver.com" },
      tags: ["Healing/Relax", "Culture"], groupSizes: ["Solo", "2-3 People"],
    },
    {
      id: "3", name: "K-POP Master Concert", city: "Busan", province: "Busan", type: "concert",
      description: "A massive beach concert featuring top K-POP artists.",
      imageUrl: "/images/33.jpg", schedule: { startDate: "2026-08-20", endDate: "2026-08-21", time: "18:00" },
      tags: ["Concert", "K-Culture"], groupSizes: ["2-3 People", "4-5 People"],
    },
    {
      id: "5", name: "Premium K-BBQ Dining", city: "Seoul", province: "Seoul", type: "restaurant",
      description: "Modern Korean BBQ that foreigners can easily enjoy.",
      imageUrl: "/images/11.jpg", links: { instagram: "https://instagram.com" },
      tags: ["K-Food"], groupSizes: ["2-3 People", "4-5 People"],
    }
  ],
  KO: [
    {
      id: "1", name: "성수동 팝업스토어", city: "서울", province: "서울특별시", type: "popup",
      description: "독특한 공간 디자인과 함께하는 한정판 전시",
      imageUrl: "/images/39.jpg", links: { instagram: "https://instagram.com" },
      schedule: { startDate: "2026-07-15", endDate: "2026-08-15" },
      tags: ["팝업스토어", "K-컬쳐"], groupSizes: ["혼자", "2-3명", "4-5명"],
    },
    {
      id: "2", name: "삼청동 한옥 카페", city: "서울", province: "서울특별시", type: "cafe",
      description: "전통 한옥에서 즐기는 차분하고 여유로운 티타임",
      imageUrl: "/images/29.jpg", links: { instagram: "https://instagram.com", blog: "https://blog.naver.com" },
      tags: ["힐링/여유", "문화체험"], groupSizes: ["혼자", "2-3명"],
    },
    {
      id: "3", name: "K-POP 글로벌 마스터 콘서트", city: "부산", province: "부산광역시", type: "concert",
      description: "최정상 K-POP 아티스트들이 총출동하는 해변 콘서트",
      imageUrl: "/images/33.jpg", schedule: { startDate: "2026-08-20", endDate: "2026-08-21", time: "18:00" },
      tags: ["콘서트", "K-컬쳐"], groupSizes: ["2-3명", "4-5명"],
    },
    {
      id: "5", name: "프리미엄 K-BBQ 다이닝", city: "서울", province: "서울특별시", type: "restaurant",
      description: "외국인도 쉽게 즐길 수 있는 모던한 한식 고기구이",
      imageUrl: "/images/11.jpg", links: { instagram: "https://instagram.com" },
      tags: ["한국음식"], groupSizes: ["2-3명", "4-5명"],
    }
  ],
  JP: [
    {
      id: "1", name: "聖水洞 ポップアップストア", city: "ソウル", province: "ソウル", type: "popup",
      description: "ユニークな空間デザインが楽しめる限定展示",
      imageUrl: "/images/39.jpg", links: { instagram: "https://instagram.com" },
      schedule: { startDate: "2026-07-15", endDate: "2026-08-15" },
      tags: ["ポップアップ", "K-カルチャー"], groupSizes: ["1人", "2-3人", "4-5人"],
    },
    {
      id: "2", name: "三清洞 韓屋カフェ", city: "ソウル", province: "ソウル", type: "cafe",
      description: "伝統的な韓屋で楽しむ落ち着いたティータイム",
      imageUrl: "/images/29.jpg", links: { instagram: "https://instagram.com", blog: "https://blog.naver.com" },
      tags: ["ヒーリング", "文化体験"], groupSizes: ["1人", "2-3人"],
    },
    {
      id: "3", name: "K-POP マスターコンサート", city: "釜山", province: "釜山", type: "concert",
      description: "トップK-POPアーティストが出演するビーチコンサート",
      imageUrl: "/images/33.jpg", schedule: { startDate: "2026-08-20", endDate: "2026-08-21", time: "18:00" },
      tags: ["コンサート", "K-カルチャー"], groupSizes: ["2-3人", "4-5人"],
    },
    {
      id: "5", name: "プレミアム K-BBQ ダイニング", city: "ソウル", province: "ソウル", type: "restaurant",
      description: "外国人も気軽に楽しめるモダンな韓国焼肉",
      imageUrl: "/images/11.jpg", links: { instagram: "https://instagram.com" },
      tags: ["韓国料理"], groupSizes: ["2-3人", "4-5人"],
    }
  ],
  CN: [
    {
      id: "1", name: "圣水洞 快闪店", city: "首尔", province: "首尔", type: "popup",
      description: "独特空间设计的限量展览",
      imageUrl: "/images/39.jpg", links: { instagram: "https://instagram.com" },
      schedule: { startDate: "2026-07-15", endDate: "2026-08-15" },
      tags: ["快闪店", "K-文化"], groupSizes: ["单人", "2-3人", "4-5人"],
    },
    {
      id: "2", name: "三清洞 韩屋咖啡馆", city: "首尔", province: "首尔", type: "cafe",
      description: "在传统韩屋中享受宁静的下午茶",
      imageUrl: "/images/29.jpg", links: { instagram: "https://instagram.com", blog: "https://blog.naver.com" },
      tags: ["放松", "文化体验"], groupSizes: ["单人", "2-3人"],
    },
    {
      id: "3", name: "K-POP 大师演唱会", city: "釜山", province: "釜山", type: "concert",
      description: "顶级K-POP艺人云集的海滩演唱会",
      imageUrl: "/images/33.jpg", schedule: { startDate: "2026-08-20", endDate: "2026-08-21", time: "18:00" },
      tags: ["演唱会", "K-文化"], groupSizes: ["2-3人", "4-5人"],
    },
    {
      id: "5", name: "高级 K-BBQ 烤肉", city: "首尔", province: "首尔", type: "restaurant",
      description: "外国人也能轻松享受的现代韩国烤肉",
      imageUrl: "/images/11.jpg", links: { instagram: "https://instagram.com" },
      tags: ["韩国美食"], groupSizes: ["2-3人", "4-5人"],
    }
  ],
  VN: [
    {
      id: "1", name: "Cửa Hàng Pop-up Seongsu", city: "Seoul", province: "Seoul", type: "popup",
      description: "Triển lãm phiên bản giới hạn với thiết kế không gian độc đáo.",
      imageUrl: "/images/39.jpg", links: { instagram: "https://instagram.com" },
      schedule: { startDate: "2026-07-15", endDate: "2026-08-15" },
      tags: ["Cửa hàng Pop-up", "Văn hóa K"], groupSizes: ["Cá nhân", "2-3 Người", "4-5 Người"],
    },
    {
      id: "2", name: "Quán Cà Phê Hanok Samcheong-dong", city: "Seoul", province: "Seoul", type: "cafe",
      description: "Tận hưởng thời gian uống trà thư giãn trong một ngôi nhà Hanok truyền thống.",
      imageUrl: "/images/29.jpg", links: { instagram: "https://instagram.com", blog: "https://blog.naver.com" },
      tags: ["Chữa lành", "Văn hóa"], groupSizes: ["Cá nhân", "2-3 Người"],
    },
    {
      id: "3", name: "Concert K-POP Master", city: "Busan", province: "Busan", type: "concert",
      description: "Buổi hòa nhạc trên bãi biển hoành tráng với các nghệ sĩ K-POP hàng đầu.",
      imageUrl: "/images/33.jpg", schedule: { startDate: "2026-08-20", endDate: "2026-08-21", time: "18:00" },
      tags: ["Concert", "Văn hóa K"], groupSizes: ["2-3 Người", "4-5 Người"],
    },
    {
      id: "5", name: "Nhà hàng K-BBQ Cao Cấp", city: "Seoul", province: "Seoul", type: "restaurant",
      description: "BBQ Hàn Quốc hiện đại mà người nước ngoài có thể dễ dàng thưởng thức.",
      imageUrl: "/images/11.jpg", links: { instagram: "https://instagram.com" },
      tags: ["Ẩm thực K"], groupSizes: ["2-3 Người", "4-5 Người"],
    }
  ]
};
