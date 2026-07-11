// ============================================================
// Site Content Configuration (Multi-Language)
// ============================================================

export const BRAND_NAME = 'THE K-SPOT';
export const COPYRIGHT = '© 2026 THE K-SPOT. All rights reserved.';

export const SITE_CONTENT = {
  EN: {
    hero: {
      titleLeft: ["Korea's Real Hotspots,", ""],
      titleRight: ["Only the Trending", "Places Right Now."],
      watermark: 'K-SPOT',
      description: "No ads, no outdated info. We curate the hottest pop-up stores, restaurants, cafes, and travel spots in Korea in real-time. Meet Korea's today, faster than anyone.",
    },
    cinematic: {
      text: "Korean trends move at lightning speed. The typical travel guide shows you places that closed six months ago. THE K-SPOT tracks live community forums, maps active popup store schedules, and filters Naver Map ratings to deliver the raw, authentic vibe of Seoul with zero marketing noise.",
    },
    metrics: {
      subtitle: 'Korean Vibe Curator',
      items: [
        { value: '0 Ads', label: '100% Honest' },
        { value: 'Weekly', label: 'Live Popup Maps' },
        { value: 'Top', label: 'Curated K-Memes' },
      ],
    },
    technology: {
      title: ['The Real', 'Korea Vibe'],
      description: "We don't do sponsored content. We crawl online communities and filter Naver Place databases to bring you the exact maps, files, and cultural guides you need to experience Korea like a local.",
      features: [
        { title: 'Ad-Free Matzip Map', desc: "Curated local maps filtering out fake Naver reviews and sponsored posts." },
        { title: 'Live Popup Calendar', desc: "Weekly updated schedules and routes for popups in Seongsu and Hongdae." },
        { title: 'Weekly Slang & Memes', desc: "No boring textbook language. Learn the exact words Koreans are typing on Reddit and DC Inside." },
        { title: '1-Click Google Maps', desc: "Instantly import custom routes to your phone with zero manual effort." },
      ],
    },
    architecture: {
      subtitle: 'Our Curated Layers',
      heading: 'One Click. Live Seoul.',
      description: "No more planning fatigue. We provide direct Google Map imports for the best local spots and weekly newsletter digests.",
      layers: [
        { num: 1, name: 'Naver-Filtered Food Map' },
        { num: 2, name: 'Live Seongsu Popup Tour' },
        { num: 3, name: 'Weekly K-Slang PDF Digest' },
      ],
    },
    footer: {
      tagline: "Don't visit Korea like an outsider. Experience the real vibe with zero effort.",
    },
    nav: {
      downloadLabel: 'Subscribe Now',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      about: 'About',
      metrics: 'Metrics',
    },
    pricing: {
      subtitle: 'Pricing',
      title: 'Choose Your Plan',
      desc: 'Select the styling plan that fits your travel goals.',
      basic: 'Basic',
      pro: 'Pro',
      enterprise: 'Enterprise',
      mostPopular: 'Most Popular',
      contactSales: 'Contact Sales',
      debitOrCreditCard: 'Debit or Credit Card',
      oneTime: '/one-time',
      basicDesc: 'Weekly Seongsu popup route map & Naver-filtered clean food lists.',
      basicFeatures: ['Weekly updated popup maps', 'Naver-filtered clean food list', 'Basic K-slang/meme glossary'],
      proDesc: 'Real-time custom maps, K-slang guides & private Discord channel feed.',
      proFeatures: ['Everything in Basic', 'All Naver-filtered clean food maps', 'Premium weekly K-slang guides', 'Priority Q&A & translation support'],
      enterpriseDesc: 'Custom corporate tour guides & retail popup placement analysis.',
      enterpriseFeatures: ['Everything in Pro', 'B2B brand popup placement support', 'Custom local SEO & marketing consulting', 'Dedicated English guide support'],
    },
    curation: {
      mapInteract: 'Click to interact with Map',
    }
  },
  KO: {
    hero: {
      titleLeft: ['한국의 진짜 핫플,', ''],
      titleRight: ['지금 가장 인기 있는', '곳만.'],
      watermark: 'K-SPOT',
      description: '광고와 오래된 정보는 빼고, 지금 한국에서 가장 뜨는 팝업스토어, 맛집, 카페, 여행지를 실시간으로 큐레이션합니다. 한국의 오늘을 가장 빠르게 만나보세요.',
    },
    cinematic: {
      text: "한국의 트렌드는 빛의 속도로 변합니다. 평범한 가이드북은 이미 반년 전에 폐업한 곳을 추천하죠. THE K-SPOT은 실시간 커뮤니티 동향, 최신 팝업스토어 일정, 네이버 평점을 엄격하게 필터링하여 마케팅 소음이 0%인 진짜 서울의 바이브를 전달합니다.",
    },
    metrics: {
      subtitle: 'Korean Vibe Curator',
      items: [
        { value: '0 광고', label: '100% 정직함' },
        { value: '매주', label: '실시간 팝업 지도' },
        { value: '최신', label: '큐레이션 K-밈' },
      ],
    },
    technology: {
      title: ['진짜 한국의', '바이브'],
      description: "협찬 광고는 일절 취급하지 않습니다. 온라인 커뮤니티와 네이버 플레이스 데이터를 직접 분석하여, 현지인처럼 한국을 경험하는 데 필요한 완벽한 지도와 문화 가이드만 제공합니다.",
      features: [
        { title: '광고 없는 맛집 지도', desc: "가짜 네이버 리뷰와 스폰서 게시물을 필터링한 찐 로컬 맛집 지도입니다." },
        { title: '실시간 팝업 캘린더', desc: "성수동과 홍대 지역의 팝업스토어 일정과 동선을 매주 업데이트합니다." },
        { title: '주간 신조어 & 밈', desc: "지루한 교과서 언어는 그만. 한국인들이 커뮤니티에서 쓰는 진짜 밈을 알려드립니다." },
        { title: '1-Click Google Maps', desc: "수작업 없이 버튼 한 번으로 맞춤형 루트를 구글 맵에 바로 가져가세요." },
      ],
    },
    architecture: {
      subtitle: '큐레이션 레이어',
      heading: '클릭 한 번으로, 리얼 서울',
      description: "여행 계획을 짜느라 피곤해하지 마세요. 최고의 로컬 핫플을 구글 맵으로 직배송 해드리고 주간 뉴스레터로 트렌드를 짚어드립니다.",
      layers: [
        { num: 1, name: '네이버 필터링 클린 맛집' },
        { num: 2, name: '성수동 라이브 팝업 투어' },
        { num: 3, name: '주간 K-슬랭 요약본' },
      ],
    },
    footer: {
      tagline: "이방인처럼 여행하지 마세요. 한국인의 진짜 바이브를 손쉽게 경험하세요.",
    },
    nav: {
      downloadLabel: '구독하기',
      signIn: '로그인',
      signOut: '로그아웃',
      about: '소개',
      metrics: '데이터',
    },
    pricing: {
      subtitle: '가격 정책',
      title: '플랜을 선택하세요',
      desc: '여행 목적에 맞는 완벽한 큐레이션 플랜을 시작해보세요.',
      basic: '베이직',
      pro: '프로',
      enterprise: '엔터프라이즈',
      mostPopular: '가장 인기있는',
      contactSales: '도입 문의',
      debitOrCreditCard: '직불카드 또는 신용카드',
      oneTime: '/1회 결제',
      basicDesc: '주간 성수 팝업 루트 맵과 네이버 필터링 클린 맛집 리스트를 제공합니다.',
      basicFeatures: ['매주 업데이트되는 팝업 지도', '네이버 필터링 클린 맛집 리스트', '기본 K-밈 용어집'],
      proDesc: '실시간 커스텀 맵, K-슬랭 가이드 및 프라이빗 디스코드 채널 피드가 제공됩니다.',
      proFeatures: ['베이직 플랜의 모든 기능', '전체 네이버 필터링 맛집 지도', '프리미엄 주간 K-슬랭 가이드', '우선 Q&A 및 번역 지원'],
      enterpriseDesc: '맞춤형 기업 투어 가이드 및 리테일 팝업 배치 분석 서비스를 제공합니다.',
      enterpriseFeatures: ['프로 플랜의 모든 기능', 'B2B 브랜드 팝업 배치 지원', '맞춤형 로컬 SEO 및 마케팅 컨설팅', '전담 영어 가이드 지원'],
    },
    curation: {
      mapInteract: '지도를 조작하려면 클릭하세요',
    }
  },
  JP: {
    hero: {
      titleLeft: ['韓国の本当の', 'ホットプレイス、'],
      titleRight: ['今最も人気のある', '場所だけ。'],
      watermark: 'K-SPOT',
      description: '広告や古い情報は省き、今韓国で最も熱いポップアップストア、グルメ、カフェ、旅行先をリアルタイムでキュレーションします。韓国の「今日」を誰よりも早く体験してください。',
    },
    cinematic: {
      text: "韓国のトレンドは光の速さで変化します。普通のガイドブックは半年前に閉店した場所を紹介しています。THE K-SPOTは、リアルタイムのコミュニティやポップアップのスケジュールを追跡し、マーケティングノイズのない「本物」のソウルの雰囲気をお届けします。",
    },
    metrics: {
      subtitle: 'Korean Vibe Curator',
      items: [
        { value: '広告 0', label: '100% リアル' },
        { value: '毎週', label: '最新ポップアップ' },
        { value: '最新', label: 'K-ミーム厳選' },
      ],
    },
    technology: {
      title: ['本当の韓国の', 'バイブス'],
      description: "スポンサー記事は一切扱いません。オンラインコミュニティを分析し、地元民のように韓国を体験するために必要なマップとガイドだけを提供します。",
      features: [
        { title: '広告なしグルメマップ', desc: "偽のレビューやスポンサー記事を除外した、本物のローカルマップです。" },
        { title: 'リアルタイムカレンダー', desc: "聖水(ソンス)や弘大(ホンデ)のポップアップ日程とルートを毎週更新。" },
        { title: '最新スラング＆ミーム', desc: "教科書にはない、韓国人がネットで実際に使っている生きた言葉を学びましょう。" },
        { title: '1-Click Googleマップ', desc: "ワンクリックでカスタムルートをスマートフォンに直接インポート。" },
      ],
    },
    architecture: {
      subtitle: 'キュレーションレイヤー',
      heading: 'ワンクリックで、リアルなソウル',
      description: "計画を立てる疲れにさようなら。最高のローカルスポットを直接Googleマップに追加し、週間ニュースレターでお届けします。",
      layers: [
        { num: 1, name: '厳選クリーンローカルグルメ' },
        { num: 2, name: '聖水(ソンス)ポップアップツアー' },
        { num: 3, name: '週間K-スラングPDF要約' },
      ],
    },
    footer: {
      tagline: "よそ者のように旅行しないでください。本当の韓国のバイブスを手軽に体験しましょう。",
    },
    nav: {
      downloadLabel: '購読する',
      signIn: 'ログイン',
      signOut: 'ログアウト',
      about: '概要',
      metrics: '指標',
    },
    pricing: {
      subtitle: '料金プラン',
      title: 'プランを選択',
      desc: 'あなたの旅行の目的に合った最適なキュレーションプランをお選びください。',
      basic: 'ベーシック',
      pro: 'プロ',
      enterprise: 'エンタープライズ',
      mostPopular: '一番人気',
      contactSales: 'お問い合わせ',
      debitOrCreditCard: 'デビットカードまたはクレジットカード',
      oneTime: '/1回買い切り',
      basicDesc: '週刊・聖水ポップアップルートマップとネイバーフィルタリング済みクリーンルメリスト。',
      basicFeatures: ['毎週更新のポップアップマップ', 'フィルタリング済みローカルグルメリスト', '基本的なK-ミーム用語集'],
      proDesc: 'リアルタイムのカスタムマップ、K-スラングガイド、プライベートDiscordチャンネル。',
      proFeatures: ['ベーシックの全機能', '全てのクリーンローカルグルメマップ', 'プレミアム週刊K-スラングガイド', '優先Q&Aと翻訳サポート'],
      enterpriseDesc: 'カスタマイズされた企業ツアーガイドとリテールポップアップ配置分析。',
      enterpriseFeatures: ['プロの全機能', 'B2Bブランドのポップアップ配置サポート', 'カスタムローカルSEOとマーケティングコンサルティング', '専任の英語ガイドサポート'],
    },
    curation: {
      mapInteract: 'マップを操作するにはクリック',
    }
  },
  CN: {
    hero: {
      titleLeft: ['韩国真正的', '热门打卡地，'],
      titleRight: ['只去现在', '最火的地方。'],
      watermark: 'K-SPOT',
      description: '告别广告与过时信息，为您实时精选韩国当下最热门的快闪店、美食、咖啡厅与旅行地。带您最快遇见韩国的“今天”。',
    },
    cinematic: {
      text: "韩国的流行趋势瞬息万变。普通的旅游指南会向您推荐半年前就已关门的地点。THE K-SPOT实时追踪社区论坛、绘制最新的快闪店时间表，并过滤掉虚假评分，为您带来零营销噪音的最真实的韩国氛围。",
    },
    metrics: {
      subtitle: 'Korean Vibe Curator',
      items: [
        { value: '0 广告', label: '100% 真实' },
        { value: '每周', label: '最新快闪地图' },
        { value: '精选', label: 'K-热梗' },
      ],
    },
    technology: {
      title: ['真正的', '韩国氛围'],
      description: "我们不做赞助内容。我们通过抓取网络社区并过滤虚假数据，为您提供像当地人一样体验韩国所需的精确地图和文化指南。",
      features: [
        { title: '无广告美食地图', desc: "过滤掉虚假评论和赞助帖子的精选本地地图。" },
        { title: '实时快闪日历', desc: "每周更新圣水洞和弘大地区快闪店的时间表和路线。" },
        { title: '每周流行语和热梗', desc: "告别枯燥的教科书语言，学习韩国人真正在网上使用的词汇。" },
        { title: '一键同步谷歌地图', desc: "一键将自定义路线导入手机，无需任何手动操作。" },
      ],
    },
    architecture: {
      subtitle: '我们的精选层级',
      heading: '一键即享。真实的韩国。',
      description: "告别做攻略的疲惫。我们直接为您提供最佳本地景点的谷歌地图导入和每周通讯摘要。",
      layers: [
        { num: 1, name: '严格筛选的纯净美食地图' },
        { num: 2, name: '实时圣水洞快闪店之旅' },
        { num: 3, name: '每周韩国流行语摘要' },
      ],
    },
    footer: {
      tagline: "不要像局外人一样来韩国旅游。轻松体验最真实的韩国氛围。",
    },
    nav: {
      downloadLabel: '立即订阅',
      signIn: '登录',
      signOut: '登出',
      about: '关于',
      metrics: '数据',
    },
    pricing: {
      subtitle: '价格方案',
      title: '选择您的计划',
      desc: '选择适合您旅行目标的完美定制计划。',
      basic: '基础版',
      pro: '专业版',
      enterprise: '企业版',
      mostPopular: '最受欢迎',
      contactSales: '联系销售',
      debitOrCreditCard: '借记卡或信用卡',
      oneTime: '/一次性买断',
      basicDesc: '每周圣水洞快闪店路线图和经过Naver过滤的纯净美食列表。',
      basicFeatures: ['每周更新的快闪店地图', '纯净本地美食列表', '基本韩国网络用语/热梗词汇表'],
      proDesc: '实时自定义地图、韩国流行语指南以及专属Discord频道推送。',
      proFeatures: ['包含基础版的所有功能', '所有纯净美食地图', '高级每周韩国流行语指南', '优先问答与翻译支持'],
      enterpriseDesc: '定制企业导游及零售快闪店选址分析。',
      enterpriseFeatures: ['包含专业版的所有功能', 'B2B品牌快闪店选址支持', '定制本地SEO与营销咨询', '专属英语导游支持'],
    },
    curation: {
      mapInteract: '点击以互动地图',
    }
  },
  VN: {
    hero: {
      titleLeft: ['Những địa điểm hot', 'thực sự của Hàn Quốc,'],
      titleRight: ['Chỉ những nơi', 'phổ biến nhất hiện nay.'],
      watermark: 'K-SPOT',
      description: 'Không có quảng cáo và thông tin lỗi thời. Chúng tôi tuyển chọn các cửa hàng pop-up, nhà hàng, quán cà phê và điểm du lịch hot nhất Hàn Quốc theo thời gian thực. Khám phá Hàn Quốc của ngày hôm nay một cách nhanh nhất.',
    },
    cinematic: {
      text: "Xu hướng ở Hàn Quốc thay đổi với tốc độ ánh sáng. Những cẩm nang du lịch thông thường chỉ cho bạn những nơi đã đóng cửa từ 6 tháng trước. THE K-SPOT theo dõi các diễn đàn trực tiếp, cập nhật lịch trình pop-up và lọc các đánh giá để mang đến cho bạn cảm nhận chân thực nhất về Seoul mà không có bất kỳ tiếng ồn marketing nào.",
    },
    metrics: {
      subtitle: 'Korean Vibe Curator',
      items: [
        { value: '0 Quảng Cáo', label: '100% Trung Thực' },
        { value: 'Hàng Tuần', label: 'Bản Đồ Pop-up' },
        { value: 'Hàng Đầu', label: 'K-Meme Tuyển Chọn' },
      ],
    },
    technology: {
      title: ['Vibe Hàn Quốc', 'Chân Thực'],
      description: "Chúng tôi không làm nội dung tài trợ. Chúng tôi phân tích các cộng đồng trực tuyến và lọc cơ sở dữ liệu để mang đến cho bạn bản đồ và hướng dẫn văn hóa chính xác nhất để trải nghiệm Hàn Quốc như người bản địa.",
      features: [
        { title: 'Bản Đồ Ẩm Thực Không Quảng Cáo', desc: "Bản đồ địa phương được tuyển chọn, loại bỏ các đánh giá giả mạo và bài đăng tài trợ." },
        { title: 'Lịch Pop-up Trực Tiếp', desc: "Lịch trình và lộ trình các cửa hàng pop-up ở Seongsu và Hongdae được cập nhật hàng tuần." },
        { title: 'Từ Lóng & Meme Hàng Tuần', desc: "Không có ngôn ngữ sách giáo khoa nhàm chán. Học những từ ngữ người Hàn Quốc thực sự đang gõ trên mạng." },
        { title: 'Google Maps Chỉ Với 1 Click', desc: "Nhập lộ trình tùy chỉnh vào điện thoại của bạn ngay lập tức mà không cần thao tác thủ công." },
      ],
    },
    architecture: {
      subtitle: 'Các Lớp Tuyển Chọn',
      heading: 'Chỉ 1 Click. Seoul Sống Động.',
      description: "Không còn mệt mỏi vì lên kế hoạch. Chúng tôi cung cấp các liên kết nhập Google Map trực tiếp cho các địa điểm tuyệt nhất và bản tin tóm tắt hàng tuần.",
      layers: [
        { num: 1, name: 'Bản Đồ Ẩm Thực Được Chọn Lọc' },
        { num: 2, name: 'Tour Pop-up Seongsu Trực Tiếp' },
        { num: 3, name: 'Bản Tóm Tắt Từ Lóng Hàn Hàng Tuần' },
      ],
    },
    footer: {
      tagline: "Đừng du lịch Hàn Quốc như một người ngoài. Hãy trải nghiệm không khí thực sự một cách dễ dàng.",
    },
    nav: {
      downloadLabel: 'Đăng Ký Ngay',
      signIn: 'Đăng Nhập',
      signOut: 'Đăng Xuất',
      about: 'Về Chúng Tôi',
      metrics: 'Chỉ Số',
    },
    pricing: {
      subtitle: 'Bảng Giá',
      title: 'Chọn Gói Của Bạn',
      desc: 'Chọn gói được thiết kế phù hợp với mục tiêu du lịch của bạn.',
      basic: 'Cơ Bản',
      pro: 'Chuyên Nghiệp',
      enterprise: 'Doanh Nghiệp',
      mostPopular: 'Phổ Biến Nhất',
      contactSales: 'Liên Hệ Bán Hàng',
      debitOrCreditCard: 'Thẻ Ghi Nợ hoặc Thẻ Tín Dụng',
      oneTime: '/mua 1 lần',
      basicDesc: 'Bản đồ lộ trình pop-up Seongsu hàng tuần & danh sách nhà hàng sạch đã lọc từ Naver.',
      basicFeatures: ['Bản đồ pop-up cập nhật hàng tuần', 'Danh sách nhà hàng sạch đã lọc từ Naver', 'Bảng chú giải từ lóng/meme cơ bản'],
      proDesc: 'Bản đồ tùy chỉnh thời gian thực, hướng dẫn từ lóng K và nguồn cấp dữ liệu Discord riêng tư.',
      proFeatures: ['Tất cả tính năng của Gói Cơ Bản', 'Tất cả bản đồ nhà hàng sạch đã lọc', 'Hướng dẫn từ lóng cao cấp hàng tuần', 'Hỗ trợ Q&A và dịch thuật ưu tiên'],
      enterpriseDesc: 'Hướng dẫn viên doanh nghiệp tùy chỉnh & phân tích vị trí pop-up bán lẻ.',
      enterpriseFeatures: ['Tất cả tính năng của Gói Pro', 'Hỗ trợ vị trí pop-up thương hiệu B2B', 'Tư vấn marketing & SEO địa phương tùy chỉnh', 'Hỗ trợ hướng dẫn viên tiếng Anh chuyên dụng'],
    },
    curation: {
      mapInteract: 'Nhấp để tương tác với Bản đồ',
    }
  },
};
