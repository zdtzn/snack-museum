"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface CityData { name: string; wechat: string; phone?: string; image?: string; }
interface ProvinceData { name: string; cities: CityData[]; }

interface Props { onClose: () => void; }

export function CustomerService({ onClose }: Props) {
  const [provinces, setProvinces] = useState<ProvinceData[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  useEffect(() => {
    fetch("/api/customer-service").then(r => r.json()).then(d => setProvinces(d.provinces || []));
  }, []);

  const currentProvince = provinces.find(p => p.name === selectedProvince);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm">
      <div className="glass-heavy w-full max-w-md p-6 relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-dark/30 hover:text-dark/60" aria-label="关闭"><X size={20} /></button>
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">💬</p>
          <h3 className="text-xl font-extrabold gradient-text">联系客服微信</h3>
          <p className="text-sm text-dark/40 mt-1">
            {selectedCity ? `${selectedProvince} · ${selectedCity.name}` : selectedProvince ? `选择城市（${selectedProvince}）` : "请选择你的地区"}
          </p>
        </div>

        {selectedCity ? (
          <div className="text-center">
            <div className="glass p-6 mb-4">
              <p className="text-lg font-bold text-dark mb-1">{selectedProvince} · {selectedCity.name}</p>
              {selectedCity.image && (
                <Image src={selectedCity.image} alt={`${selectedCity.name}客服微信二维码`} width={160} height={160} className="w-40 h-40 mx-auto my-3 object-contain rounded-xl border border-primary/10" unoptimized />
              )}
              <div className="glass p-4 inline-block min-w-[200px] mt-1">
                <p className="text-xs text-dark/40 mb-1">客服微信</p>
                <p className="text-xl font-extrabold text-green break-all">{selectedCity.wechat}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setSelectedCity(null); setSelectedProvince(null); }}
                className="flex-1 px-4 py-3 bg-white/70 text-dark font-bold rounded-xl border border-primary/20 hover:bg-primary/5 text-sm">重新选择</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(selectedProvince ? currentProvince!.cities : provinces).map((item: ProvinceData | CityData) => {
              const isProvince = "cities" in item;
              const name = item.name;
              const cityCount = isProvince ? (item as ProvinceData).cities.length : 0;
              return (
                <button key={name} onClick={() => isProvince ? setSelectedProvince(name) : setSelectedCity(item as CityData)}
                  className="glass p-3 text-center hover:bg-primary/5 hover:border-primary/20 border border-transparent rounded-xl transition-all">
                  <p className="text-sm font-bold text-dark">{name}</p>
                  {isProvince && <p className="text-xs text-dark/30 mt-1">{cityCount}市</p>}
                </button>
              );
            })}
          </div>
        )}
        {selectedProvince && !selectedCity && (
          <button onClick={() => setSelectedProvince(null)} className="mt-4 text-sm text-dark/40 hover:text-primary">← 返回省份列表</button>
        )}
      </div>
    </div>
  );
}
