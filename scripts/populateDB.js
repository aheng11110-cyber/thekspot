import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseLocations = [
  {
    id: "1",
    en: { name: "Nudake Seongsu", desc: "A trendy art dessert cafe known for its unique volcano matcha cake." },
    ko: { name: "누데이크 성수", desc: "독특한 화산 모양의 말차 케이크로 유명한 트렌디한 아트 디저트 카페." },
    jp: { name: "ヌデイク聖水", desc: "ユニークな火山抹茶ケーキで有名なトレンディなアートデザートカフェ。" },
    cn: { name: "Nudake 圣水", desc: "以独特的火山抹茶蛋糕闻名的时尚艺术甜品咖啡馆。" },
    vn: { name: "Nudake Seongsu", desc: "Một quán cà phê tráng miệng nghệ thuật sành điệu nổi tiếng với bánh matcha núi lửa độc đáo." },
    city: "Seoul", province: "Seoul", type: "cafe",
    imageUrl: "/images/29.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Trending", "AI Pick"],
    groupSizes: ["Solo", "2-3 People"]
  },
  {
    id: "2",
    en: { name: "Tamburins Flagship Store", desc: "An immersive cosmetic popup store featuring signature scents and art installations." },
    ko: { name: "탬버린즈 플래그십 스토어", desc: "시그니처 향수와 설치 미술이 결합된 몰입형 코스메틱 팝업 스토어." },
    jp: { name: "タンバリンズ旗艦店", desc: "シグネチャーの香りとインスタレーションアートが融合した没入型コスメティックポップアップ。" },
    cn: { name: "Tamburins 旗舰店", desc: "结合标志性香水和装置艺术的沉浸式美妆快闪店。" },
    vn: { name: "Cửa hàng Tamburins Flagship", desc: "Cửa hàng mỹ phẩm pop-up đắm chìm trưng bày các mùi hương đặc trưng và tác phẩm nghệ thuật sắp đặt." },
    city: "Seoul", province: "Seoul", type: "popup",
    imageUrl: "/images/39.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Popup Store", "Trending"],
    groupSizes: ["Solo"]
  },
  {
    id: "3",
    en: { name: "Gyeongbokgung Hanbok Tour", desc: "Rent a beautiful Hanok and take photos at the historical Gyeongbokgung Palace." },
    ko: { name: "경복궁 한복 투어", desc: "아름다운 한복을 빌려 입고 전통적인 경복궁에서 인생샷을 남겨보세요." },
    jp: { name: "景福宮 韓服ツアー", desc: "美しい韓服をレンタルして、歴史的な景福宮で写真を撮りましょう。" },
    cn: { name: "景福宫韩服游", desc: "租借美丽的韩服，在历史悠久的景福宫拍照留念。" },
    vn: { name: "Tour Hanbok Gyeongbokgung", desc: "Thuê Hanbok tuyệt đẹp và chụp ảnh tại Cung điện Gyeongbokgung lịch sử." },
    city: "Seoul", province: "Seoul", type: "concert",
    imageUrl: "/page_images/10.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Culture", "Healing/Relax"],
    groupSizes: ["2-3 People", "4-5 People"]
  },
  {
    id: "4",
    en: { name: "London Bagel Museum Dosan", desc: "The most famous bagel shop in Korea. Prepare for a waiting line!" },
    ko: { name: "런던 베이글 뮤지엄 도산", desc: "현재 한국에서 가장 인기 있는 베이글 맛집. 오픈런 필수!" },
    jp: { name: "ロンドンベーグルミュージアム島山", desc: "現在韓国で最も人気のあるベーグルショップ。オープンラン必須！" },
    cn: { name: "伦敦贝果博物馆 岛山", desc: "目前韩国最受欢迎的贝果店。必须早起排队！" },
    vn: { name: "London Bagel Museum Dosan", desc: "Cửa hàng bánh bagel nổi tiếng nhất Hàn Quốc. Chuẩn bị xếp hàng nhé!" },
    city: "Seoul", province: "Seoul", type: "cafe",
    imageUrl: "/images/29.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Trending"],
    groupSizes: ["2-3 People"]
  },
  {
    id: "5",
    en: { name: "Born & Bred", desc: "Premium Hanwoo (Korean Beef) dining experience featured in Michelin guide." },
    ko: { name: "본앤브레드", desc: "미슐랭 가이드에 소개된 프리미엄 한우(Korean Beef) 오마카세 다이닝." },
    jp: { name: "ボーン＆ブレッド", desc: "ミシュランガイドに掲載されたプレミアム韓牛（韓国牛）ダイニング体験。" },
    cn: { name: "Born & Bred", desc: "米其林指南推荐的优质韩牛（韩国牛肉）高级餐厅体验。" },
    vn: { name: "Born & Bred", desc: "Trải nghiệm ẩm thực Hanwoo (Thịt bò Hàn Quốc) cao cấp được giới thiệu trong cẩm nang Michelin." },
    city: "Seoul", province: "Seoul", type: "restaurant",
    imageUrl: "/images/11.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Culture"],
    groupSizes: ["4-5 People"]
  },
  {
    id: "6",
    en: { name: "Seoul Sky Lotte World Tower", desc: "Enjoy a breathtaking panoramic view of Seoul from the 5th tallest building in the world." },
    ko: { name: "롯데월드타워 서울스카이", desc: "세계에서 5번째로 높은 빌딩에서 숨 막히는 서울의 파노라마 야경을 즐겨보세요." },
    jp: { name: "ソウルスカイ ロッテワールドタワー", desc: "世界で5番目に高いビルからソウルの息をのむようなパノラマビューをお楽しみください。" },
    cn: { name: "首尔天空 乐天世界塔", desc: "在世界第5高楼欣赏令人惊叹的首尔全景。" },
    vn: { name: "Seoul Sky Lotte World Tower", desc: "Thưởng thức toàn cảnh ngoạn mục của Seoul từ tòa nhà cao thứ 5 trên thế giới." },
    city: "Seoul", province: "Seoul", type: "concert",
    imageUrl: "/page_images/20.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Healing/Relax"],
    groupSizes: ["2-3 People", "4-5 People"]
  },
  {
    id: "7",
    en: { name: "HYBE INSIGHT", desc: "A dynamic exhibition space where you can experience the music and culture of top K-Pop artists." },
    ko: { name: "하이브 인사이트 (HYBE INSIGHT)", desc: "최정상 K-Pop 아티스트들의 음악과 문화를 생생하게 체험할 수 있는 전시 공간." },
    jp: { name: "HYBE INSIGHT", desc: "トップK-POPアーティストの音楽と文化を体験できるダイナミックな展示空間。" },
    cn: { name: "HYBE INSIGHT", desc: "一个动态的展览空间，您可以体验顶级 K-Pop 艺术家的音乐和文化。" },
    vn: { name: "HYBE INSIGHT", desc: "Không gian triển lãm năng động, nơi bạn có thể trải nghiệm âm nhạc và văn hóa của các nghệ sĩ K-Pop hàng đầu." },
    city: "Seoul", province: "Seoul", type: "concert",
    imageUrl: "/page_images/34.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["K-Culture"],
    groupSizes: ["Solo", "2-3 People"]
  },
  {
    id: "8",
    en: { name: "Namsan Seoul Tower", desc: "A romantic spot in the heart of Seoul surrounded by nature and beautiful trails." },
    ko: { name: "남산 서울타워", desc: "자연과 산책로로 둘러싸인 서울 중심부의 가장 로맨틱한 명소." },
    jp: { name: "南山ソウルタワー", desc: "自然と美しい遊歩道に囲まれたソウルの中心部にあるロマンチックなスポット。" },
    cn: { name: "南山首尔塔", desc: "被自然和美丽的步道环绕的首尔市中心浪漫景点。" },
    vn: { name: "Tháp Namsan Seoul", desc: "Một địa điểm lãng mạn ở trung tâm Seoul được bao quanh bởi thiên nhiên và những con đường mòn tuyệt đẹp." },
    city: "Seoul", province: "Seoul", type: "concert",
    imageUrl: "/images/33.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Nature", "Healing/Relax"],
    groupSizes: ["2-3 People", "4-5 People"]
  },
  {
    id: "9",
    en: { name: "Haeundae Blue Line Park", desc: "Ride the romantic beach train along the stunning coastline of Busan." },
    ko: { name: "해운대 블루라인파크", desc: "눈부신 부산의 해안선을 따라 달리는 낭만적인 해변 열차 캡슐." },
    jp: { name: "海雲台ブルーラインパーク", desc: "釜山の見事な海岸線に沿って走るロマンチックなビーチトレインに乗ってみましょう。" },
    cn: { name: "海云台蓝线公园", desc: "乘坐浪漫的海滩列车沿着釜山迷人的海岸线行驶。" },
    vn: { name: "Công viên Haeundae Blue Line", desc: "Đi chuyến tàu bãi biển lãng mạn dọc theo bờ biển tuyệt đẹp của Busan." },
    city: "Busan", province: "Busan", type: "concert",
    imageUrl: "/page_images/11.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Nature", "Healing/Relax"],
    groupSizes: ["Solo", "2-3 People", "4-5 People"]
  },
  {
    id: "10",
    en: { name: "Gwangjang Market", desc: "The ultimate destination for Korean street food. Try the famous mung bean pancakes!" },
    ko: { name: "광장시장", 초성: "ㄱㅈㅅㅈ", desc: "한국 길거리 음식의 끝판왕. 유명한 빈대떡과 육회를 꼭 맛보세요!" },
    jp: { name: "広蔵市場", desc: "韓国の屋台料理の究極の目的地。有名な緑豆チヂミをお試しください！" },
    cn: { name: "广藏市场", desc: "韩国街头小吃的终极目的地。一定要尝尝著名的绿豆煎饼！" },
    vn: { name: "Chợ Gwangjang", desc: "Điểm đến cuối cùng của ẩm thực đường phố Hàn Quốc. Hãy thử món bánh xèo đậu xanh nổi tiếng!" },
    city: "Seoul", province: "Seoul", type: "restaurant",
    imageUrl: "/page_images/34.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Culture", "Trending"],
    groupSizes: ["Solo", "2-3 People"]
  },
  {
    id: "11",
    en: { name: "Starfield Library COEX", desc: "A magnificent open library located inside the giant COEX mall." },
    ko: { name: "코엑스 별마당 도서관", desc: "거대한 코엑스 쇼핑몰 중앙에 위치한 압도적인 스케일의 열린 도서관." },
    jp: { name: "スターフィールド図書館 COEX", desc: "巨大なCOEXモール内にある壮大なオープンライブラリ。" },
    cn: { name: "星空图书馆 COEX", desc: "位于巨大的 COEX 购物中心内的宏伟开放式图书馆。" },
    vn: { name: "Thư viện Starfield COEX", desc: "Một thư viện mở tráng lệ nằm bên trong trung tâm mua sắm COEX khổng lồ." },
    city: "Seoul", province: "Seoul", type: "cafe",
    imageUrl: "/images/39.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Culture", "Healing/Relax"],
    groupSizes: ["Solo", "2-3 People"]
  },
  {
    id: "12",
    en: { name: "Baskin Robbins Brown Cheongdam", desc: "A luxury 100-flavor ice cream concept store by Baskin Robbins." },
    ko: { name: "배스킨라빈스 브라운 청담", desc: "100가지 맛의 아이스크림을 맛볼 수 있는 프리미엄 배스킨라빈스 컨셉 스토어." },
    jp: { name: "バスキンロビンス ブラウン清潭", desc: "バスキンロビンスの豪華な100フレーバーアイスクリームコンセプトストア。" },
    cn: { name: "芭斯罗缤 Brown 清潭", desc: "芭斯罗缤推出的豪华 100 种口味冰淇淋概念店。" },
    vn: { name: "Baskin Robbins Brown Cheongdam", desc: "Cửa hàng concept kem 100 hương vị sang trọng của Baskin Robbins." },
    city: "Seoul", province: "Seoul", type: "cafe",
    imageUrl: "/images/29.jpg",
    links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" },
    tags: ["Healing/Relax", "Trending"],
    groupSizes: ["Solo", "2-3 People"]
  }
];

const curationDB = { EN: [], KO: [], JP: [], CN: [], VN: [] };

baseLocations.forEach(loc => {
  const base = {
    id: loc.id,
    city: loc.city,
    province: loc.province,
    type: loc.type,
    imageUrl: loc.imageUrl,
    links: loc.links,
    tags: loc.tags,
    groupSizes: loc.groupSizes
  };

  curationDB.EN.push({ ...base, name: loc.en.name, description: loc.en.desc });
  curationDB.KO.push({ ...base, name: loc.ko.name, description: loc.ko.desc });
  curationDB.JP.push({ ...base, name: loc.jp.name, description: loc.jp.desc });
  curationDB.CN.push({ ...base, name: loc.cn.name, description: loc.cn.desc });
  curationDB.VN.push({ ...base, name: loc.vn.name, description: loc.vn.desc });
});

const dbPath = path.join(__dirname, '../src/data/curationDB.json');
fs.writeFileSync(dbPath, JSON.stringify(curationDB, null, 2));

console.log("✅ Successfully populated curationDB.json with " + baseLocations.length + " items per language!");
