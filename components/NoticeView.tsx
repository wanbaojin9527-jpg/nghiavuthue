
import React from 'react';
import { ContractData } from '../types';
import { Info, Landmark, FileSignature, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  onContinue: () => void;
  data: ContractData;
}

export const NoticeView: React.FC<Props> = ({ onContinue, data }) => {
  return (
    <div className="p-10 md:p-16 font-arial">
      <div className="text-center mb-14">
        <h2 className="text-[10px] tracking-[0.5em] text-indigo-700 font-bold mb-4 uppercase">Quy định quyết toán thuế</h2>
        <h3 className="text-3xl text-slate-900 mb-6 font-bold">{data.noticeHeading}</h3>
        <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-10 text-slate-700">
        <p className="text-xl text-slate-900 font-bold">Kính gửi {data.recipientName},</p>
        
        <p className="text-lg leading-relaxed text-justify font-normal opacity-90">
          Căn cứ quy định về quản lý dòng tiền và thuế thu nhập giao dịch tài chính lớn, hệ thống xác nhận khoản tiền giao dịch: 
          <span className="text-indigo-700 font-bold underline decoration-2 underline-offset-4 ml-2 mr-2">{data.amount}</span>
          cần được thực hiện kê khai quyết toán hồ sơ điện tử để hoàn tất thủ tục giải ngân.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-700 mb-6">
              <Landmark size={24} />
            </div>
            <h4 className="text-[10px] tracking-widest font-bold mb-4 uppercase text-slate-900">Tính Chính Danh</h4>
            <p className="text-xs leading-relaxed text-slate-500">Hồ sơ được xác thực trực tiếp thông qua cơ sở dữ liệu quốc gia về người nộp thuế.</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-800 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-[10px] tracking-widest font-bold mb-4 uppercase text-slate-900">Bảo Mật</h4>
            <p className="text-xs leading-relaxed text-slate-500">Toàn bộ dữ liệu được mã hóa đầu cuối, đảm bảo không rò rỉ thông tin cá nhân của người nộp thuế.</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-700 mb-6">
              <FileSignature size={24} />
            </div>
            <h4 className="text-[10px] tracking-widest font-bold mb-4 uppercase text-slate-900">Pháp Lý</h4>
            <p className="text-xs leading-relaxed text-slate-500">Tờ khai điện tử có giá trị thực thi pháp lý ngay sau khi hoàn tất ký số trực tuyến.</p>
          </div>
        </div>

        <div className="bg-indigo-950 p-10 rounded-[2.5rem] text-slate-300 text-sm font-medium border-l-[12px] border-indigo-500 shadow-2xl">
          <p className="leading-relaxed m-0 text-base">
            <span className="text-white font-bold block mb-3 uppercase tracking-[0.2em] text-[10px]">Cảnh báo từ Tổng Cục Thuế:</span>
            {data.noticeAlertBox}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-slate-100 gap-10">
          <div className="text-center sm:text-left">
            <p className="text-[10px] tracking-[0.3em] text-slate-400 uppercase font-bold mb-2">Đại diện Cơ quan Thuế</p>
            <p className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{data.senderName}</p>
          </div>
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-16 py-5 bg-indigo-900 hover:bg-black text-white font-bold rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-4 group"
          >
            <span className="uppercase tracking-[0.2em] text-xs">Xem Tờ Khai Thuế</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
