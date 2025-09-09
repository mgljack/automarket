import {
  Sun, Car, Gauge, Camera, Wind, Key, Navigation, Thermometer,
  Fan, Armchair, SunDim, AlertTriangle, AirVent, Disc,
  Snowflake, Wifi, Bluetooth, BatteryCharging, Shield, ParkingCircle
} from "lucide-react";

export type OptionKey =
  | "sunroof" | "ledHeadlamp" | "parkingSensor" | "rearCamera" | "autoAircon"
  | "smartKey" | "navigation" | "heatedSeat" | "ventilatedSeat" | "leatherSeat"
  | "cruise" | "alarm" | "airVent" | "heatedSteering" | "fourWheel"
  | "wireless" | "bluetooth" | "battery" | "airbag" | "autoParking" | "etc";

export const OptionDict: Record<OptionKey, { label: string; icon: any; keywords: string[]; cat: string; }> = {
  sunroof:        { label: "선루프",       icon: Sun,           keywords: ["선루프","파노라마"], cat:"편의" },
  ledHeadlamp:    { label: "헤드램프(LED)", icon: SunDim,        keywords: ["헤드램프","LED","라이트"], cat:"안전" },
  parkingSensor:  { label: "주차감지센서",   icon: ParkingCircle, keywords: ["주차감지","주차센서","전/후방감지"], cat:"안전" },
  rearCamera:     { label: "후방카메라",     icon: Camera,        keywords: ["후방카메라","어라운드뷰"], cat:"안전" },
  autoAircon:     { label: "자동에어컨",     icon: Wind,          keywords: ["오토에어컨","자동에어컨","공조"], cat:"편의" },
  smartKey:       { label: "스마트키",       icon: Key,           keywords: ["스마트키","원격시동"], cat:"편의" },
  navigation:     { label: "내비게이션",     icon: Navigation,    keywords: ["내비","네비","네비게이션"], cat:"인포테인먼트" },
  heatedSeat:     { label: "열선시트",       icon: Thermometer,   keywords: ["열선시트","시트열선"], cat:"편의" },
  ventilatedSeat: { label: "통풍시트",       icon: Fan,           keywords: ["통풍시트"], cat:"편의" },
  leatherSeat:    { label: "가죽시트",       icon: Armchair,      keywords: ["가죽시트"], cat:"인테리어" },
  cruise:         { label: "크루즈컨트롤",   icon: Gauge,         keywords: ["크루즈","어댑티브","ACC"], cat:"주행" },
  alarm:          { label: "도난경보기",     icon: AlertTriangle, keywords: ["도난","경보기"], cat:"안전" },
  airVent:        { label: "에어벤트",       icon: AirVent,       keywords: ["에어벤트"], cat:"편의" },
  heatedSteering: { label: "열선핸들",       icon: Disc, keywords: ["열선핸들","핸들열선"], cat:"편의" },
  fourWheel:      { label: "4WD",           icon: Snowflake,     keywords: ["4WD","AWD","사륜"], cat:"주행" },
  wireless:       { label: "무선충전/카플레이",icon: Wifi,        keywords: ["무선","카플레이","안드로이드오토"], cat:"인포테인먼트" },
  bluetooth:      { label: "블루투스",       icon: Bluetooth,     keywords: ["블루투스"], cat:"인포테인먼트" },
  battery:        { label: "배터리히트/예열", icon: BatteryCharging, keywords:["배터리","히트","예열"], cat:"전동" },
  airbag:         { label: "에어백",         icon: Shield,        keywords: ["에어백","사이드커튼"], cat:"안전" },
  autoParking:    { label: "자동주차",       icon: Car,           keywords: ["자동주차","파킹어시스트"], cat:"주행" },
  etc:            { label: "기타",           icon: Car,           keywords: [], cat:"기타" },
};

// 문자열 옵션을 키로 매핑
export function mapOption(str: string): OptionKey {
  const s = (str||"").toLowerCase();
  for (const k of Object.keys(OptionDict) as OptionKey[]) {
    if (OptionDict[k].keywords.some(w => s.includes(w.toLowerCase()))) return k;
  }
  return "etc";
}
