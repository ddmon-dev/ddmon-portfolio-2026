export interface ArchiveItem {
  name: string;
  link?: string;
}

export const HOMEPAGE_ARCHIVE: ArchiveItem[] = [
  { name: '비엘테크', link: 'http://www.bl-tech.net' },
  { name: '포스백스', link: 'http://www.posvax.com' },
  { name: '삼우DTP', link: 'http://www.samwoodtp.com' },
  { name: '체크메이트', link: 'http://www.checkmatetx.com' },
  { name: '리가스', link: 'http://rigas.co.kr' },
  { name: '그린폴리텍', link: 'http://greenpolytech.co.kr' },
  { name: '파이어킴', link: 'http://www.firekim.co.kr' },
  { name: '하이모', link: 'http://himo.com' },
  { name: '한아에스에스', link: 'http://hana-ss.co.kr' },
  { name: '티아이티이엔지', link: 'http://www.pointman.co.kr' },
  { name: '더원리빙', link: 'http://theod.co.kr' },
  { name: '지에프아이 (2020)', link: 'http://websian.rgbcom.co.kr/gfi/en/' },
  { name: '자동기', link: 'http://www.desnow.co.kr' },
  { name: '대호냉각기', link: 'http://daehocooler.co.kr/ko/' }, // 썸네일 못가져옴
  { name: '중앙이엔지', link: 'http://jaeng.co.kr' },
  { name: '백신실용화기술개발사업단', link: 'https://vitalkorea.kr/kr/' }, // 썸네일 못가져옴
  { name: 'UPI', link: 'http://www.upi.co.kr' },
  { name: 'FFA', link: 'http://feedflavorsasia.com' },
  { name: '선메딕스', link: 'http://sunmedix.com' },
  { name: '지필로스', link: 'http://g-philos.co.kr' },
  { name: '삼정향료', link: 'http://www.samjungflavor.co.kr' },
  {
    name: '태성시스템 (2021)',
    link: 'http://websian.rgbcom.co.kr/Taesung/en/',
  },
  { name: '고려기연', link: 'https://glovebox.jp' },
  { name: '옵티팜', link: 'http://www.optipharm.co.kr' },
  { name: '제타크리젠', link: 'http://www.zetacrezen.com' },
  { name: '에버그린켐텍', link: 'http://www.ievergreen.com' },
  { name: '크라텍', link: 'http://cratech.co.kr' },
  { name: '에어젠박스', link: 'http://www.airxenbox.com' },
  { name: '한국주택학회', link: 'https://www.kahps.org' }, // 썸네일 다시 따기
  { name: '에이유센서', link: 'https://au-sensor.com' }, // 썸네일 다시 따기
  { name: 'VSI', link: 'http://www.vsi.co.kr' },
  { name: 'AST', link: 'https://web.rgbcom.kr/AST/en/' },
  { name: '파이코일바이오텍코리아', link: 'http://www.phycoil.com' },
  { name: '아토솔루텍', link: 'http://attotk.com' },
  { name: '한빛엠디', link: 'http://www.hanbitmd.com/ko/' },
  { name: '한립', link: 'https://web.rgbcom.kr/HANLIP_use/en/' },
  { name: '에이스엔지니어링', link: 'https://aceengineering.com' },
  { name: 'BHLBIO', link: 'https://webs.rgbcom.kr/BHLBIO' },
  { name: 'MSJ', link: 'http://msj3000.co.kr' },
  { name: '멘피스코리아', link: 'http://menfiskorea.com' },
  { name: '솔라가드 한국본사', link: 'http://www.solargard.co.kr' },
  { name: '대일텍', link: 'http://daeiltec.co.kr' },
  { name: '스템메디케어', link: 'http://www.stemmedicare.com' },
  { name: '경진티알엠', link: 'http://kjtrm.co.kr' },
  { name: '플럭시티', link: 'http://www.pluxity.com' },
  { name: '케이넷츠', link: 'http://k-netz.com' },
  { name: '스톰테크', link: 'http://stormtec.co.kr' },
  { name: '태원공업', link: 'http://taeweon.co.kr/ko/' },
  { name: '엔젤로보틱스', link: 'https://angel-robotics.com/ko' },
  { name: '큐로직', link: 'http://www.qlogic.co.kr' },
  { name: '릭스에어', link: 'http://rixair.co.kr' },
  { name: '한국지네틱바이오팜', link: 'http://kgbp.co.kr' },
  { name: '파스코이엔지', link: 'http://www.fascoeng.co.kr' },
  { name: '대의엔지니어링', link: 'http://daeyee.com' },
  { name: '우리기술', link: 'http://wooritg.com' },
  { name: '파노라마필름', link: 'https://www.panoramafilm.co.kr' },
  {
    name: '솔라가드 특판 필름 보증서 발급 서비스',
    link: 'http://sgwarranty.co.kr',
  },
  { name: '백신정보포털', link: 'https://vitalkorea-vip.kr' }, // 썸네일 따기
  { name: '(주)엠알', link: 'http://mrev.co.kr' },
  { name: '아쿠아라마', link: 'http://www.aquarama.kr' },
];

export const ECATALOG_ARCHIVE: ArchiveItem[] = [
  { name: '컬러큐브', link: 'http://colorcube.co.kr' },
  { name: '대의엔지니어링 전자카탈로그', link: 'http://daeyee.com/ecatalog' },
  { name: '엔원테크', link: 'http://n-onetech.com/ecatalog' },
  { name: '앤켓 회사소개서', link: 'http://ecatalog.ncat.co.kr' },
  { name: '앤켓 제품소개서', link: 'http://ecatalog.ncat.co.kr/product' },
  { name: 'AR', link: 'https://e-catalog.rgbcom.kr/AR/en/' },
  {
    name: 'HE SOLUTION',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/HE-solution/en/pages/pg01.php',
  },
  { name: '대유위니아', link: 'ecatalog.rgbcom.kr/DAYOU' },
  { name: '태원공업', link: 'e-catalog.rgbcom.kr/TAEWEON/ko/' },
  { name: '플랫폼베이스', link: 'e-catalog.rgbcom.kr/PLATFORMBASE/#/en/cover' },
  { name: '앤켓 제품', link: 'e-catalog.rgbcom.kr/NCAT_product/#/ko/cover' },
  {
    name: '앤켓 회사소개',
    link: 'e-catalog.rgbcom.kr/NCAT_company/#/en_sbm/cover',
  },
  {
    name: '대의엔지니어링',
    link: 'e-catalog.rgbcom.kr/DAEYEE/#/ko/cover/scene1',
  },
  { name: '대일텍 2023', link: 'e-catalog.rgbcom.kr/DAEILTEC2023/en/1' },
  { name: '에이스엔지니어링', link: 'ecatalog.rgbcom.kr/AST/en/' },
  {
    name: 'APM Technologies',
    link: 'ecatalog.rgbcom.kr/APMTECH/#/en/cover/scene1',
  },
  { name: 'S1 KAKAO' }, // 링크 공개 불가 , 썸네일 따로 따기
  { name: '큐로직 : Q-Platform', link: 'qlogic.co.kr/ecatalog/ko/1' },
  { name: '(주)진영', link: 'ecatalog.rgbcom.kr/JINYOUNG2024/ko/' },
  { name: '하이원리조트', link: 'ecatalog.rgbcom.kr/HIGHONE' },
  { name: '백신실용화기술개발사업단', link: 'e-catalog.rgbcom.kr/VITAL/en/' },
  { name: '제우스', link: 'http://web.rgbcom.co.kr/E-catalog/Zeus/en/' },
  { name: '남양넥스모', link: 'e-catalog.rgbcom.kr/NEXMO' },
  { name: '크라텍', link: 'e-catalog.rgbcom.kr/Cratech/ko/' },
  {
    name: '에이스엔지니어링',
    link: 'https://ecatalog.rgbcom.kr/ACE_research/',
  },
  { name: '바이킬러', link: 'e-catalog.rgbcom.kr/VIKILLER/ko' }, // 썸네일
  { name: '지케스', link: 'e-catalog.rgbcom.kr/GKES' },
  { name: '(주)진영 : IR', link: 'e-catalog.rgbcom.kr/JY_IR/ko/' },
  { name: '하이모', link: 'e-catalog.rgbcom.kr/HIMO' },
  { name: '한립', link: 'e-catalog.rgbcom.kr/HANLIP' },
  { name: '코멤텍', link: 'e-catalog.rgbcom.kr/KOMEMTEC/en/' },
  { name: '파스코이엔지', link: 'e-catalog.rgbcom.kr/FASCOENG' },
  { name: '대일텍', link: 'e-catalog.rgbcom.kr/DAEILTEC/ko/' },
  { name: '아토솔루텍', link: 'http://attotk.com/ecatalog/ko/' },
  {
    name: '[3호]한국원전수출산업협회',
    link: 'e-catalog.rgbcom.kr/KNA_3/en/#1',
  },
  {
    name: '삼일제약',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/samil/en/pages/pg00.php',
  },
  {
    name: '선메딕스', // 썸네일
    link: 'http://websian.rgbcom.co.kr/E-catalogue/sunmedix/en/pages/pg00.php',
  },
  {
    name: '옵티팜',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/optipharm/en/pages/pg00.php',
  },
  {
    name: '[2호]한국원전수출산업협회',
    link: 'http://web.rgbcom.co.kr/E-catalog/nuclear/en/pages/pg00.php',
  },
  {
    name: '거산무역상사',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/keosan/en/pages/pg00.php',
  },
  {
    name: '지필로스',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/g-philos/en/pages/pg00.php',
  },
  { name: '삼우DTP', link: 'http://web.rgbcom.co.kr/E-catalog/Samwoo_use/en/' },
  {
    name: '엘앤씨바이오',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/LNCBIO/kr/pages/pg00.php',
  },
  {
    name: '셀레믹스', // 썸네일
    link: 'http://websian.rgbcom.co.kr/E-catalogue/CELEMICS/en/pages/pg00.php',
  },
  {
    name: '에버그린켐텍',
    link: 'http://web.rgbcom.co.kr/E-catalog/Evergreen_procam/en/pages/pg01.php',
  },
  {
    name: '3CP',
    link: 'http://web.rgbcom.co.kr/E-catalog/3CP/en/pages/pg00.php',
  },
  {
    name: '쉐어캠(SIELO)',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/sharechem/en/pages/pg00.php',
  },
  {
    name: '태성시스템',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/Taesung/en/pages/pg00.php',
  },
  { name: 'FFA', link: 'http://websian.rgbcom.co.kr/E-catalogue/FFA' },
  {
    name: '레코(에어젠박스)',
    link: 'http://web.rgbcom.co.kr/E-catalog/Reco/en/',
  },
  {
    name: '더원리빙',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/oneliving/en/',
  },
  {
    name: '에이치이솔루션',
    link: 'http://websian.rgbcom.co.kr/E-catalogue/HE-solution/en/pages/pg00.php',
  },
  {
    name: '옵티메디',
    link: 'http://web.rgbcom.co.kr/E-catalog/Optimedi/en/pages/pg00.php',
  },
];
