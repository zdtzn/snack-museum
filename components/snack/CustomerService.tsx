"use client";

import { useState } from "react";
import { X, ChevronRight, MessageCircle } from "lucide-react";

interface CityData {
  name: string;
  wechat: string;
  phone?: string;
}

interface ProvinceData {
  name: string;
  cities: CityData[];
}

const provinces: ProvinceData[] = [
  { name: "山东", cities: [
    { name: "济南", wechat: "kefu_sd" }, { name: "青岛", wechat: "kefu_sd" }, { name: "淄博", wechat: "kefu_sd" },
    { name: "枣庄", wechat: "kefu_sd" }, { name: "东营", wechat: "kefu_sd" }, { name: "烟台", wechat: "kefu_sd" },
    { name: "潍坊", wechat: "kefu_sd" }, { name: "济宁", wechat: "kefu_sd" }, { name: "泰安", wechat: "kefu_sd" },
    { name: "威海", wechat: "kefu_sd" }, { name: "日照", wechat: "kefu_sd" }, { name: "临沂", wechat: "kefu_sd" },
    { name: "德州", wechat: "kefu_sd" }, { name: "聊城", wechat: "kefu_sd" }, { name: "滨州", wechat: "kefu_sd" },
    { name: "菏泽", wechat: "kefu_sd" }
  ]},
  { name: "广东", cities: [
    { name: "广州", wechat: "kefu_gd" }, { name: "韶关", wechat: "kefu_gd" }, { name: "深圳", wechat: "kefu_gd" },
    { name: "珠海", wechat: "kefu_gd" }, { name: "汕头", wechat: "kefu_gd" }, { name: "佛山", wechat: "kefu_gd" },
    { name: "江门", wechat: "kefu_gd" }, { name: "湛江", wechat: "kefu_gd" }, { name: "茂名", wechat: "kefu_gd" },
    { name: "肇庆", wechat: "kefu_gd" }, { name: "惠州", wechat: "kefu_gd" }, { name: "梅州", wechat: "kefu_gd" },
    { name: "汕尾", wechat: "kefu_gd" }, { name: "河源", wechat: "kefu_gd" }, { name: "阳江", wechat: "kefu_gd" },
    { name: "清远", wechat: "kefu_gd" }, { name: "东莞", wechat: "kefu_gd" }, { name: "中山", wechat: "kefu_gd" },
    { name: "潮州", wechat: "kefu_gd" }, { name: "揭阳", wechat: "kefu_gd" }, { name: "云浮", wechat: "kefu_gd" }
  ]},
  { name: "浙江", cities: [
    { name: "杭州", wechat: "kefu_zj" }, { name: "宁波", wechat: "kefu_zj" }, { name: "温州", wechat: "kefu_zj" },
    { name: "嘉兴", wechat: "kefu_zj" }, { name: "湖州", wechat: "kefu_zj" }, { name: "绍兴", wechat: "kefu_zj" },
    { name: "金华", wechat: "kefu_zj" }, { name: "衢州", wechat: "kefu_zj" }, { name: "舟山", wechat: "kefu_zj" },
    { name: "台州", wechat: "kefu_zj" }, { name: "丽水", wechat: "kefu_zj" }
  ]},
  { name: "江苏", cities: [
    { name: "南京", wechat: "kefu_js" }, { name: "无锡", wechat: "kefu_js" }, { name: "徐州", wechat: "kefu_js" },
    { name: "常州", wechat: "kefu_js" }, { name: "苏州", wechat: "kefu_js" }, { name: "南通", wechat: "kefu_js" },
    { name: "连云港", wechat: "kefu_js" }, { name: "淮安", wechat: "kefu_js" }, { name: "盐城", wechat: "kefu_js" },
    { name: "扬州", wechat: "kefu_js" }, { name: "镇江", wechat: "kefu_js" }, { name: "泰州", wechat: "kefu_js" },
    { name: "宿迁", wechat: "kefu_js" }
  ]},
  { name: "北京", cities: [{ name: "北京", wechat: "kefu_bj" }] },
  { name: "上海", cities: [{ name: "上海", wechat: "kefu_sh" }] },
  { name: "天津", cities: [{ name: "天津", wechat: "kefu_tj" }] },
  { name: "重庆", cities: [{ name: "重庆", wechat: "kefu_cq" }] },
  { name: "河南", cities: [
    { name: "郑州", wechat: "kefu_henan" }, { name: "开封", wechat: "kefu_henan" }, { name: "洛阳", wechat: "kefu_henan" },
    { name: "平顶山", wechat: "kefu_henan" }, { name: "安阳", wechat: "kefu_henan" }, { name: "鹤壁", wechat: "kefu_henan" },
    { name: "新乡", wechat: "kefu_henan" }, { name: "焦作", wechat: "kefu_henan" }, { name: "濮阳", wechat: "kefu_henan" },
    { name: "许昌", wechat: "kefu_henan" }, { name: "漯河", wechat: "kefu_henan" }, { name: "三门峡", wechat: "kefu_henan" },
    { name: "南阳", wechat: "kefu_henan" }, { name: "商丘", wechat: "kefu_henan" }, { name: "信阳", wechat: "kefu_henan" },
    { name: "周口", wechat: "kefu_henan" }, { name: "驻马店", wechat: "kefu_henan" }
  ]},
  { name: "四川", cities: [
    { name: "成都", wechat: "kefu_sc" }, { name: "自贡", wechat: "kefu_sc" }, { name: "攀枝花", wechat: "kefu_sc" },
    { name: "泸州", wechat: "kefu_sc" }, { name: "德阳", wechat: "kefu_sc" }, { name: "绵阳", wechat: "kefu_sc" },
    { name: "广元", wechat: "kefu_sc" }, { name: "遂宁", wechat: "kefu_sc" }, { name: "内江", wechat: "kefu_sc" },
    { name: "乐山", wechat: "kefu_sc" }, { name: "南充", wechat: "kefu_sc" }, { name: "眉山", wechat: "kefu_sc" },
    { name: "宜宾", wechat: "kefu_sc" }, { name: "广安", wechat: "kefu_sc" }, { name: "达州", wechat: "kefu_sc" },
    { name: "雅安", wechat: "kefu_sc" }, { name: "巴中", wechat: "kefu_sc" }, { name: "资阳", wechat: "kefu_sc" }
  ]},
  { name: "湖北", cities: [
    { name: "武汉", wechat: "kefu_hb" }, { name: "黄石", wechat: "kefu_hb" }, { name: "十堰", wechat: "kefu_hb" },
    { name: "宜昌", wechat: "kefu_hb" }, { name: "襄阳", wechat: "kefu_hb" }, { name: "鄂州", wechat: "kefu_hb" },
    { name: "荆门", wechat: "kefu_hb" }, { name: "孝感", wechat: "kefu_hb" }, { name: "荆州", wechat: "kefu_hb" },
    { name: "黄冈", wechat: "kefu_hb" }, { name: "咸宁", wechat: "kefu_hb" }, { name: "随州", wechat: "kefu_hb" },
    { name: "恩施", wechat: "kefu_hb" }
  ]},
  { name: "湖南", cities: [
    { name: "长沙", wechat: "kefu_hunan" }, { name: "株洲", wechat: "kefu_hunan" }, { name: "湘潭", wechat: "kefu_hunan" },
    { name: "衡阳", wechat: "kefu_hunan" }, { name: "邵阳", wechat: "kefu_hunan" }, { name: "岳阳", wechat: "kefu_hunan" },
    { name: "常德", wechat: "kefu_hunan" }, { name: "张家界", wechat: "kefu_hunan" }, { name: "益阳", wechat: "kefu_hunan" },
    { name: "郴州", wechat: "kefu_hunan" }, { name: "永州", wechat: "kefu_hunan" }, { name: "怀化", wechat: "kefu_hunan" },
    { name: "娄底", wechat: "kefu_hunan" }
  ]},
  { name: "河北", cities: [
    { name: "石家庄", wechat: "kefu_hebei" }, { name: "唐山", wechat: "kefu_hebei" }, { name: "秦皇岛", wechat: "kefu_hebei" },
    { name: "邯郸", wechat: "kefu_hebei" }, { name: "邢台", wechat: "kefu_hebei" }, { name: "保定", wechat: "kefu_hebei" },
    { name: "张家口", wechat: "kefu_hebei" }, { name: "承德", wechat: "kefu_hebei" }, { name: "沧州", wechat: "kefu_hebei" },
    { name: "廊坊", wechat: "kefu_hebei" }, { name: "衡水", wechat: "kefu_hebei" }
  ]},
  { name: "安徽", cities: [
    { name: "合肥", wechat: "kefu_ah" }, { name: "芜湖", wechat: "kefu_ah" }, { name: "蚌埠", wechat: "kefu_ah" },
    { name: "淮南", wechat: "kefu_ah" }, { name: "马鞍山", wechat: "kefu_ah" }, { name: "淮北", wechat: "kefu_ah" },
    { name: "铜陵", wechat: "kefu_ah" }, { name: "安庆", wechat: "kefu_ah" }, { name: "黄山", wechat: "kefu_ah" },
    { name: "滁州", wechat: "kefu_ah" }, { name: "阜阳", wechat: "kefu_ah" }, { name: "宿州", wechat: "kefu_ah" },
    { name: "六安", wechat: "kefu_ah" }, { name: "亳州", wechat: "kefu_ah" }, { name: "池州", wechat: "kefu_ah" },
    { name: "宣城", wechat: "kefu_ah" }
  ]},
  { name: "福建", cities: [
    { name: "福州", wechat: "kefu_fj" }, { name: "厦门", wechat: "kefu_fj" }, { name: "莆田", wechat: "kefu_fj" },
    { name: "三明", wechat: "kefu_fj" }, { name: "泉州", wechat: "kefu_fj" }, { name: "漳州", wechat: "kefu_fj" },
    { name: "南平", wechat: "kefu_fj" }, { name: "龙岩", wechat: "kefu_fj" }, { name: "宁德", wechat: "kefu_fj" }
  ]},
  { name: "辽宁", cities: [
    { name: "沈阳", wechat: "kefu_ln" }, { name: "大连", wechat: "kefu_ln" }, { name: "鞍山", wechat: "kefu_ln" },
    { name: "抚顺", wechat: "kefu_ln" }, { name: "本溪", wechat: "kefu_ln" }, { name: "丹东", wechat: "kefu_ln" },
    { name: "锦州", wechat: "kefu_ln" }, { name: "营口", wechat: "kefu_ln" }, { name: "阜新", wechat: "kefu_ln" },
    { name: "辽阳", wechat: "kefu_ln" }, { name: "盘锦", wechat: "kefu_ln" }, { name: "铁岭", wechat: "kefu_ln" },
    { name: "朝阳", wechat: "kefu_ln" }, { name: "葫芦岛", wechat: "kefu_ln" }
  ]},
  { name: "江西", cities: [
    { name: "南昌", wechat: "kefu_jx" }, { name: "景德镇", wechat: "kefu_jx" }, { name: "萍乡", wechat: "kefu_jx" },
    { name: "九江", wechat: "kefu_jx" }, { name: "新余", wechat: "kefu_jx" }, { name: "鹰潭", wechat: "kefu_jx" },
    { name: "赣州", wechat: "kefu_jx" }, { name: "吉安", wechat: "kefu_jx" }, { name: "宜春", wechat: "kefu_jx" },
    { name: "抚州", wechat: "kefu_jx" }, { name: "上饶", wechat: "kefu_jx" }
  ]},
  { name: "山西", cities: [
    { name: "太原", wechat: "kefu_sx" }, { name: "大同", wechat: "kefu_sx" }, { name: "阳泉", wechat: "kefu_sx" },
    { name: "长治", wechat: "kefu_sx" }, { name: "晋城", wechat: "kefu_sx" }, { name: "朔州", wechat: "kefu_sx" },
    { name: "晋中", wechat: "kefu_sx" }, { name: "运城", wechat: "kefu_sx" }, { name: "忻州", wechat: "kefu_sx" },
    { name: "临汾", wechat: "kefu_sx" }, { name: "吕梁", wechat: "kefu_sx" }
  ]},
  { name: "广西", cities: [
    { name: "南宁", wechat: "kefu_gx" }, { name: "柳州", wechat: "kefu_gx" }, { name: "桂林", wechat: "kefu_gx" },
    { name: "梧州", wechat: "kefu_gx" }, { name: "北海", wechat: "kefu_gx" }, { name: "防城港", wechat: "kefu_gx" },
    { name: "钦州", wechat: "kefu_gx" }, { name: "贵港", wechat: "kefu_gx" }, { name: "玉林", wechat: "kefu_gx" },
    { name: "百色", wechat: "kefu_gx" }, { name: "贺州", wechat: "kefu_gx" }, { name: "河池", wechat: "kefu_gx" },
    { name: "来宾", wechat: "kefu_gx" }, { name: "崇左", wechat: "kefu_gx" }
  ]},
  { name: "陕西", cities: [
    { name: "西安", wechat: "kefu_shanxi" }, { name: "铜川", wechat: "kefu_shanxi" }, { name: "宝鸡", wechat: "kefu_shanxi" },
    { name: "咸阳", wechat: "kefu_shanxi" }, { name: "渭南", wechat: "kefu_shanxi" }, { name: "延安", wechat: "kefu_shanxi" },
    { name: "汉中", wechat: "kefu_shanxi" }, { name: "榆林", wechat: "kefu_shanxi" }, { name: "安康", wechat: "kefu_shanxi" },
    { name: "商洛", wechat: "kefu_shanxi" }
  ]},
  { name: "吉林", cities: [
    { name: "长春", wechat: "kefu_jl" }, { name: "吉林", wechat: "kefu_jl" }, { name: "四平", wechat: "kefu_jl" },
    { name: "辽源", wechat: "kefu_jl" }, { name: "通化", wechat: "kefu_jl" }, { name: "白山", wechat: "kefu_jl" },
    { name: "松原", wechat: "kefu_jl" }, { name: "白城", wechat: "kefu_jl" }
  ]},
  { name: "黑龙江", cities: [
    { name: "哈尔滨", wechat: "kefu_hlj" }, { name: "齐齐哈尔", wechat: "kefu_hlj" }, { name: "鸡西", wechat: "kefu_hlj" },
    { name: "鹤岗", wechat: "kefu_hlj" }, { name: "双鸭山", wechat: "kefu_hlj" }, { name: "大庆", wechat: "kefu_hlj" },
    { name: "伊春", wechat: "kefu_hlj" }, { name: "佳木斯", wechat: "kefu_hlj" }, { name: "七台河", wechat: "kefu_hlj" },
    { name: "牡丹江", wechat: "kefu_hlj" }, { name: "黑河", wechat: "kefu_hlj" }, { name: "绥化", wechat: "kefu_hlj" }
  ]},
  { name: "内蒙古", cities: [
    { name: "呼和浩特", wechat: "kefu_nmg" }, { name: "包头", wechat: "kefu_nmg" }, { name: "乌海", wechat: "kefu_nmg" },
    { name: "赤峰", wechat: "kefu_nmg" }, { name: "通辽", wechat: "kefu_nmg" }, { name: "鄂尔多斯", wechat: "kefu_nmg" },
    { name: "呼伦贝尔", wechat: "kefu_nmg" }, { name: "巴彦淖尔", wechat: "kefu_nmg" }, { name: "乌兰察布", wechat: "kefu_nmg" },
    { name: "兴安盟", wechat: "kefu_nmg" }, { name: "锡林郭勒盟", wechat: "kefu_nmg" }, { name: "阿拉善盟", wechat: "kefu_nmg" }
  ]},
  { name: "甘肃", cities: [
    { name: "兰州", wechat: "kefu_gs" }, { name: "嘉峪关", wechat: "kefu_gs" }, { name: "金昌", wechat: "kefu_gs" },
    { name: "白银", wechat: "kefu_gs" }, { name: "天水", wechat: "kefu_gs" }, { name: "武威", wechat: "kefu_gs" },
    { name: "张掖", wechat: "kefu_gs" }, { name: "平凉", wechat: "kefu_gs" }, { name: "酒泉", wechat: "kefu_gs" },
    { name: "庆阳", wechat: "kefu_gs" }, { name: "定西", wechat: "kefu_gs" }, { name: "陇南", wechat: "kefu_gs" }
  ]},
  { name: "贵州", cities: [
    { name: "贵阳", wechat: "kefu_gz" }, { name: "六盘水", wechat: "kefu_gz" }, { name: "遵义", wechat: "kefu_gz" },
    { name: "安顺", wechat: "kefu_gz" }, { name: "毕节", wechat: "kefu_gz" }, { name: "铜仁", wechat: "kefu_gz" },
    { name: "黔西南", wechat: "kefu_gz" }, { name: "黔东南", wechat: "kefu_gz" }, { name: "黔南", wechat: "kefu_gz" }
  ]},
  { name: "云南", cities: [
    { name: "昆明", wechat: "kefu_yn" }, { name: "曲靖", wechat: "kefu_yn" }, { name: "玉溪", wechat: "kefu_yn" },
    { name: "保山", wechat: "kefu_yn" }, { name: "昭通", wechat: "kefu_yn" }, { name: "丽江", wechat: "kefu_yn" },
    { name: "普洱", wechat: "kefu_yn" }, { name: "临沧", wechat: "kefu_yn" }, { name: "楚雄", wechat: "kefu_yn" },
    { name: "红河", wechat: "kefu_yn" }, { name: "文山", wechat: "kefu_yn" }, { name: "西双版纳", wechat: "kefu_yn" },
    { name: "大理", wechat: "kefu_yn" }, { name: "德宏", wechat: "kefu_yn" }, { name: "怒江", wechat: "kefu_yn" },
    { name: "迪庆", wechat: "kefu_yn" }
  ]},
  { name: "新疆", cities: [
    { name: "乌鲁木齐", wechat: "kefu_xj" }, { name: "克拉玛依", wechat: "kefu_xj" }, { name: "吐鲁番", wechat: "kefu_xj" },
    { name: "哈密", wechat: "kefu_xj" }, { name: "昌吉", wechat: "kefu_xj" }, { name: "博尔塔拉", wechat: "kefu_xj" },
    { name: "巴音郭楞", wechat: "kefu_xj" }, { name: "阿克苏", wechat: "kefu_xj" }, { name: "克孜勒苏", wechat: "kefu_xj" },
    { name: "喀什", wechat: "kefu_xj" }, { name: "和田", wechat: "kefu_xj" }, { name: "伊犁", wechat: "kefu_xj" },
    { name: "塔城", wechat: "kefu_xj" }, { name: "阿勒泰", wechat: "kefu_xj" }
  ]},
  { name: "宁夏", cities: [
    { name: "银川", wechat: "kefu_nx" }, { name: "石嘴山", wechat: "kefu_nx" }, { name: "吴忠", wechat: "kefu_nx" },
    { name: "固原", wechat: "kefu_nx" }, { name: "中卫", wechat: "kefu_nx" }
  ]},
  { name: "青海", cities: [
    { name: "西宁", wechat: "kefu_qh" }, { name: "海东", wechat: "kefu_qh" }, { name: "海北", wechat: "kefu_qh" },
    { name: "黄南", wechat: "kefu_qh" }, { name: "海南", wechat: "kefu_qh" }, { name: "果洛", wechat: "kefu_qh" },
    { name: "玉树", wechat: "kefu_qh" }, { name: "海西", wechat: "kefu_qh" }
  ]},
  { name: "西藏", cities: [
    { name: "拉萨", wechat: "kefu_xz" }, { name: "日喀则", wechat: "kefu_xz" }, { name: "昌都", wechat: "kefu_xz" },
    { name: "林芝", wechat: "kefu_xz" }, { name: "山南", wechat: "kefu_xz" }, { name: "那曲", wechat: "kefu_xz" },
    { name: "阿里", wechat: "kefu_xz" }
  ]},
  { name: "海南", cities: [
    { name: "海口", wechat: "kefu_hn" }, { name: "三亚", wechat: "kefu_hn" }, { name: "三沙", wechat: "kefu_hn" },
    { name: "儋州", wechat: "kefu_hn" }
  ]},
  { name: "港澳台", cities: [
    { name: "香港", wechat: "kefu_gat" }, { name: "澳门", wechat: "kefu_gat" }, { name: "台湾", wechat: "kefu_gat" }
  ]},
  { name: "其他地区", cities: [{ name: "全国统一客服", wechat: "kefu_general" }] }
];

interface Props {
  onClose: () => void;
}

export function CustomerService({ onClose }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  const currentProvince = provinces.find((p) => p.name === selectedProvince);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
      <div className="glass-heavy w-full max-w-md p-6 relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-dark/30 hover:text-dark/60">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <p className="text-4xl mb-2">💬</p>
          <h3 className="text-xl font-extrabold gradient-text">咨询客服拿货</h3>
          <p className="text-sm text-dark/40 mt-1">
            {selectedCity
              ? `已分配客服：${selectedProvince} · ${selectedCity.name}`
              : selectedProvince
              ? `选择城市（${selectedProvince}）`
              : "请选择你的省份"}
          </p>
        </div>

        {/* 已选客服结果 */}
        {selectedCity ? (
          <div className="text-center">
            <div className="glass p-6 mb-4">
              <p className="text-4xl mb-3">✅</p>
              <p className="text-lg font-bold text-dark mb-1">
                {selectedProvince} · {selectedCity.name}
              </p>
              <p className="text-sm text-dark/40 mb-4">以下是你的专属客服</p>
              <div className="glass p-4 inline-block min-w-[200px]">
                <p className="text-xs text-dark/40 mb-1">客服微信</p>
                <p className="text-xl font-extrabold text-green break-all">
                  {selectedCity.wechat}
                </p>
                <p className="text-xs text-dark/30 mt-2">复制微信号到微信添加</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setSelectedCity(null); setSelectedProvince(null); }}
                className="flex-1 px-4 py-3 bg-white/70 text-dark font-bold rounded-xl border border-primary/20 hover:bg-primary/5 transition-all text-sm"
              >
                重新选择
              </button>
              <a
                href={`weixin://`}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green to-green/80 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all text-sm text-center"
              >
                打开微信
              </a>
            </div>
          </div>
        ) : (
          /* 省份/城市选择 */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(selectedProvince ? currentProvince!.cities : provinces).map((item) => {
              const name = "cities" in item ? (item as ProvinceData).name : (item as CityData).name;
              const isProvince = "cities" in item;
              return (
                <button
                  key={name}
                  onClick={() => {
                    if (isProvince) setSelectedProvince(name);
                    else setSelectedCity(item as CityData);
                  }}
                  className="glass p-3 text-center hover:bg-primary/5 hover:border-primary/20 border border-transparent
                    transition-all rounded-xl cursor-pointer"
                >
                  <p className="text-sm font-bold text-dark">{name}</p>
                  {isProvince && (
                    <p className="text-xs text-dark/30 mt-1">
                      {(item as ProvinceData).cities.length}市
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 返回省份列表 */}
        {selectedProvince && !selectedCity && (
          <button
            onClick={() => setSelectedProvince(null)}
            className="mt-4 text-sm text-dark/40 hover:text-primary transition-colors"
          >
            ← 返回省份列表
          </button>
        )}
      </div>
    </div>
  );
}
