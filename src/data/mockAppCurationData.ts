export const smartCourses = [
  {
    id: 'c1',
    title: '성수동 힙스터 반나절 코스',
    desc: '지금 서울에서 가장 힙한 성수동을 완벽하게 즐기는 골목길 도보 코스입니다. 트렌디한 팝업과 카페를 모두 만나보세요.',
    image: '/images/cafe.png',
    tag: '트렌디',
    places: [
      {
        id: 'p1_1',
        name: '소문난성수감자탕',
        type: '로컬 식당',
        desc: '든든하게 배를 채우고 시작하는 성수동 투어. 깊고 얼큰한 국물과 부드러운 고기가 일품입니다.',
        address: '성동구 연무장길 45',
        rating: 4.6,
        transitToNext: '도보 3분'
      },
      {
        id: 'p1_2',
        name: '어니언 성수',
        type: '카페',
        desc: '폐공장을 개조한 빈티지 감성 카페. 팡도르와 진한 커피로 휴식을 취해보세요.',
        address: '성동구 아차산로9길 8',
        rating: 4.5,
        transitToNext: '도보 8분'
      },
      {
        id: 'p1_3',
        name: '디올 성수',
        type: '포토존 / 플래그십',
        desc: '프랑스 정원을 연상시키는 외관에서 인생샷을 남겨보세요. 성수동 최고의 포토스팟입니다.',
        address: '성동구 연무장5길 7',
        rating: 4.8,
        transitToNext: null
      }
    ]
  },
  {
    id: 'c2',
    title: '명동 스트리트 푸드 완전 정복',
    desc: '외국인 친구를 데려가기 완벽한 코스! 명동의 밤거리를 걸으며 길거리 음식부터 쇼핑까지 한번에 끝내세요.',
    image: '/images/street_food.png',
    tag: '먹거리',
    places: [
      {
        id: 'p2_1',
        name: '명동교자 본점',
        type: '미슐랭 식당',
        desc: '진한 마늘 김치와 닭육수 칼국수의 조합! 본격적인 길거리 투어 전 가볍게 배를 채우기 좋습니다.',
        address: '중구 명동10길 29',
        rating: 4.7,
        transitToNext: '도보 1분'
      },
      {
        id: 'p2_2',
        name: '명동 야시장 거리',
        type: '길거리 음식',
        desc: '떡볶이, 계란빵, 랍스터 구이까지! 화려한 네온사인 아래에서 다양한 간식을 맛보세요.',
        address: '중구 명동8길 일대',
        rating: 4.5,
        transitToNext: '도보 10분'
      },
      {
        id: 'p2_3',
        name: '신세계백화점 본점 미디어파사드',
        type: '야경 명소',
        desc: '투어의 마무리는 환상적인 미디어 아트 야경. 로맨틱한 분위기로 하루를 마무리하세요.',
        address: '중구 소공로 63',
        rating: 4.9,
        transitToNext: null
      }
    ]
  },
  {
    id: 'c3',
    title: '비오는 날, 압구정 프라이빗 코스',
    desc: '날씨에 구애받지 않고 여유롭고 고급스럽게 즐기는 압구정 청담동 실내 투어.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=600',
    tag: '실내데이트',
    places: [
      {
        id: 'p3_1',
        name: '카멜커피 도산',
        type: '카페',
        desc: '따뜻한 카멜커피 한 잔과 함께 비오는 창밖을 바라보며 여유로운 아침을 시작하세요.',
        address: '강남구 도산대로49길 16',
        rating: 4.6,
        transitToNext: '도보 2분'
      },
      {
        id: 'p3_2',
        name: '하우스 도산',
        type: '복합문화공간',
        desc: '젠틀몬스터, 탬버린즈, 누데이크가 모여있는 힙한 공간. 전시를 보며 실내 쇼핑을 즐겨보세요.',
        address: '강남구 압구정로46길 50',
        rating: 4.8,
        transitToNext: '택시 5분'
      },
      {
        id: 'p3_3',
        name: '밍글스',
        type: '파인다이닝',
        desc: '모던 한식의 진수. 특별한 날을 완성시켜주는 미슐랭 2스타 레스토랑입니다.',
        address: '강남구 선릉로 757',
        rating: 4.9,
        transitToNext: null
      }
    ]
  },
  {
    id: 'c4',
    title: 'K-POP 팬을 위한 K-성지순례',
    desc: 'BTS, 세븐틴 팬이라면 반드시 가봐야 할 아이돌 소속사 인근 핫플과 생일카페 투어 코스입니다.',
    image: 'https://images.unsplash.com/photo-1540324155970-148fa275fc84?auto=format&fit=crop&q=80&w=600',
    tag: 'K-POP',
    places: [
      {
        id: 'p4_1',
        name: '하이브 인사이트 (구 뮤지엄)',
        type: '전시공간',
        desc: '하이브 아티스트들의 발자취를 느낄 수 있는 공간 주변의 카페거리를 탐방해보세요.',
        address: '용산구 한강대로 42',
        rating: 4.8,
        transitToNext: '도보 15분'
      },
      {
        id: 'p4_2',
        name: '용산 아이파크몰',
        type: '쇼핑몰',
        desc: 'K-POP 굿즈샵과 다양한 팝업스토어가 열리는 팬들의 성지입니다.',
        address: '용산구 한강대로23길 55',
        rating: 4.5,
        transitToNext: null
      }
    ]
  }
];
