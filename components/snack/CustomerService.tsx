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
    { name: "临沂", wechat: "kefu_linyi" }, { name: "济南", wechat: "kefu_jinan" },
    { name: "青岛", wechat: "kefu_qingdao" }, { name: "烟台", wechat: "kefu_yantai" }, { name: "潍坊", wechat: "kefu_weifang" }
  ]},
  { name: "广东", cities: [
    { name: "广州", wechat: "kefu_gz" }, { name: "深圳", wechat: "kefu_sz" },
    { name: "东莞", wechat: "kefu_dg" }, { name: "佛山", wechat: "kefu_fs" }
  ]},
  { name: "浙江", cities: [
    { name: "杭州", wechat: "kefu_hz" }, { name: "宁波", wechat: "kefu_nb" },
    { name: "温州", wechat: "kefu_wz" }, { name: "义乌", wechat: "kefu_yw" }
  ]},
  { name: "江苏", cities: [
    { name: "南京", wechat: "kefu_nanjing" }, { name: "苏州", wechat: "kefu_suzhou" },
    { name: "无锡", wechat: "kefu_wuxi" }, { name: "徐州", wechat: "kefu_xuzhou" }
  ]},
  { name: "北京", cities: [{ name: "北京", wechat: "kefu_bj" }] },
  { name: "上海", cities: [{ name: "上海", wechat: "kefu_sh" }] },
  { name: "河南", cities: [
    { name: "郑州", wechat: "kefu_zz" }, { name: "洛阳", wechat: "kefu_luoyang" }, { name: "南阳", wechat: "kefu_nanyang" }
  ]},
  { name: "四川", cities: [
    { name: "成都", wechat: "kefu_cd" }, { name: "绵阳", wechat: "kefu_mianyang" }, { name: "宜宾", wechat: "kefu_yibin" }
  ]},
  { name: "湖北", cities: [
    { name: "武汉", wechat: "kefu_wh" }, { name: "宜昌", wechat: "kefu_yichang" }, { name: "襄阳", wechat: "kefu_xiangyang" }
  ]},
  { name: "湖南", cities: [
    { name: "长沙", wechat: "kefu_cs" }, { name: "株洲", wechat: "kefu_zhuzhou" }, { name: "衡阳", wechat: "kefu_hengyang" }
  ]},
  { name: "河北", cities: [
    { name: "石家庄", wechat: "kefu_sjz" }, { name: "保定", wechat: "kefu_baoding" }, { name: "唐山", wechat: "kefu_tangshan" }
  ]},
  { name: "安徽", cities: [
    { name: "合肥", wechat: "kefu_hf" }, { name: "芜湖", wechat: "kefu_wuhu" }, { name: "蚌埠", wechat: "kefu_bengbu" }
  ]},
  { name: "福建", cities: [
    { name: "福州", wechat: "kefu_fz" }, { name: "厦门", wechat: "kefu_xm" }, { name: "泉州", wechat: "kefu_qz" }
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
