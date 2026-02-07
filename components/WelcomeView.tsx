
import React from 'react';
import { ContractData } from '../types';
import { ArrowRight, CheckCircle2, Shield, Landmark } from 'lucide-react';

interface Props {
  onStart: () => void;
  data: ContractData;
}

export const WelcomeView: React.FC<Props> = ({ onStart, data }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[550px] font-arial">
      <div className="md:w-1/2 bg-indigo-950 p-12 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
        </div>
        
        <h1 className="text-5xl mb-6 leading-tight font-bold">
          {data.welcomeTitle.split(' ').slice(0, 3).join(' ')} <br />
          <span className="text-indigo-400 italic">{data.welcomeTitle.split(' ').slice(3).join(' ')}</span>
        </h1>
        <p className="text-slate-400 mb-12 leading-relaxed font-normal text-lg max-w-sm">
          Chào mừng <span className="text-white font-bold">{data.recipientName}</span>. 
          {data.welcomeSubtitle}
        </p>
        <div className="space-y-6">
          {[
            "Hệ thống xác thực mã số thuế tập trung",
            "Bảo mật thông tin giao dịch tài chính",
            "Xác lập hồ sơ giải ngân điện tử tức thì"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-indigo-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 p-12 flex flex-col justify-center items-center bg-white">
        <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-100">
          <Landmark className="text-indigo-900" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight uppercase">Cổng Thuế Điện Tử</h2>
        <p className="text-slate-500 text-center mb-12 max-w-xs leading-relaxed text-sm">
          Quý khách vui lòng nhấn nút bên dưới để thực hiện kê khai và ký xác nhận tờ khai quyết toán giao dịch.
        </p>
        <button
          onClick={onStart}
          className="w-full max-w-xs py-5 bg-indigo-900 hover:bg-slate-900 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center space-x-4 group"
        >
          <span className="tracking-widest uppercase text-sm">{data.welcomeButton}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
