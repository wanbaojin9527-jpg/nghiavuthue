
import React from 'react';
import { ContractData } from '../types';
import { ScrollText, ChevronRight, Award, FileText, Landmark } from 'lucide-react';

interface Props {
  onContinue?: () => void;
  data: ContractData;
  signature?: string | null;
  hideHeader?: boolean;
}

export const ContractReviewView: React.FC<Props> = ({ onContinue, data, signature, hideHeader = false }) => {
  return (
    <div className={`bg-slate-100 min-h-[700px] flex flex-col font-arial ${hideHeader ? 'bg-white' : ''}`}>
      {!hideHeader && onContinue && (
        <div className="bg-white p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20 shadow-sm px-8 no-print">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-indigo-900 rounded-lg text-white">
              <Landmark size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Tờ khai quyết toán điện tử</h3>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">Trạng thái: Chờ người nộp xác nhận</p>
            </div>
          </div>
          <button
            onClick={onContinue}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <span>Ký tên xác nhận</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      <div className={`${hideHeader ? 'p-0' : 'p-4 md:p-12'} flex-1 overflow-y-auto`}>
        <div className={`max-w-[850px] mx-auto bg-white ${hideHeader ? 'shadow-none' : 'shadow-2xl'} p-10 md:p-24 relative text-[#2d3748] legal-document ${hideHeader ? 'border-none' : 'border-[16px] border-slate-50'}`}>
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] overflow-hidden">
            <h1 className="text-[120px] font-bold uppercase whitespace-nowrap">TỔNG CỤC THUẾ - BỘ TÀI CHÍNH</h1>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
            <h3 className="text-sm font-bold mb-2">Độc lập - Tự do - Hạnh phúc</h3>
            <div className="w-40 h-[1.5px] bg-slate-900 mx-auto mb-12"></div>
            
            <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900 mb-2">TỜ KHAI QUYẾT TOÁN THUẾ</h1>
            <p className="text-xs text-slate-500 font-bold tracking-widest">Số hiệu hồ sơ: {data.contractCode}</p>
          </div>

          <div className="space-y-12">
            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
              <h4 className="font-bold text-xs uppercase mb-6 text-slate-900 flex items-center gap-2">
                <Landmark size={16} className="text-indigo-700" />
                Thông tin chủ thể giao dịch
              </h4>
              <div className="space-y-5">
                <p className="m-0 text-sm leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">CƠ QUAN QUẢN LÝ:</span>
                  <span className="uppercase font-bold text-indigo-800">{data.companyName}</span><br />
                  <span className="text-slate-500">Phụ trách hồ sơ:</span> <span className="font-bold">{data.senderName}</span><br />
                  <span className="text-slate-500">Chức vụ:</span> <span className="font-bold uppercase text-[11px]">{data.senderTitle}</span><br />
                  <span className="text-slate-500">Trụ sở:</span> <span className="text-sm italic">{data.companyAddress}</span><br />
                  <span className="text-slate-500">Mã số thuế cơ quan:</span> <span className="font-mono">{data.taxCode}</span>
                </p>
                <div className="h-px bg-slate-200"></div>
                <p className="m-0 text-sm leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">NGƯỜI NỘP THUẾ (NGƯỜI THỤ HƯỞNG):</span>
                  <span className="uppercase font-bold text-slate-900 text-lg">{data.recipientName}</span><br />
                  <span className="text-slate-500">Xác minh định danh:</span> <span className="italic text-indigo-600 font-bold">Dữ liệu căn cước công dân đã được đồng bộ với mã số thuế cá nhân.</span>
                </p>
              </div>
            </section>

            {data.clauses.map((clause) => (
              <section key={clause.id} className="relative group">
                <h4 className="font-bold text-sm uppercase mb-3 text-slate-900 flex items-center gap-3">
                  <span className="w-6 h-6 bg-indigo-900 text-white rounded-md flex items-center justify-center text-[10px]">{clause.id.replace('c', '')}</span>
                  {clause.title}
                </h4>
                <div className="pl-9">
                  <p className="text-sm text-justify leading-relaxed whitespace-pre-wrap text-slate-700 font-normal">
                    {clause.content}
                  </p>
                  {clause.id === 'c2' && (
                    <div className="mt-4 p-6 bg-indigo-50 rounded-2xl border-l-4 border-indigo-700 shadow-sm">
                      <p className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-1">Tổng giá trị quyết toán giao dịch:</p>
                      <p className="m-0 font-bold text-3xl text-indigo-900 tracking-tight">{data.amount}</p>
                    </div>
                  )}
                </div>
              </section>
            ))}

            <div className="grid grid-cols-2 gap-12 pt-20 mt-20 border-t-2 border-slate-100">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-8 tracking-[0.3em]">CƠ QUAN THUẾ XÁC NHẬN</p>
                <div className="h-44 flex flex-col items-center justify-center relative">
                   {data.senderStampUrl ? (
                     <img 
                       src={data.senderStampUrl} 
                       alt="Official Stamp" 
                       className="max-h-44 object-contain mix-blend-multiply" 
                     />
                   ) : (
                     <div className="w-44 h-44 flex flex-col items-center justify-center italic text-slate-200">
                        <div className="w-32 h-32 border border-slate-100 rounded-full flex items-center justify-center text-[8px] uppercase tracking-widest font-bold">Dấu Cơ Quan</div>
                     </div>
                   )}
                </div>
                <div className="mt-6">
                  <p className="font-bold text-lg text-slate-900 uppercase tracking-tight m-0">{data.senderName}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{data.senderTitle}</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-8 tracking-[0.3em]">NGƯỜI NỘP THUẾ KÝ TÊN</p>
                <div className="h-44 flex items-center justify-center relative">
                   {signature ? (
                     <img 
                       src={signature} 
                       alt="Bên B Signature" 
                       className="max-h-40 object-contain mix-blend-multiply" 
                     />
                   ) : (
                     <div className="w-full h-full border-b-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 text-[10px] font-medium uppercase tracking-[0.2em]">
                        Ký tên người nộp thuế
                     </div>
                   )}
                </div>
                <div className="mt-6">
                  <p className="font-bold text-lg text-slate-900 uppercase tracking-tight m-0">{data.recipientName}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Người nộp thuế</p>
                </div>
              </div>
            </div>
            
            <div className="pt-20 text-center flex flex-col items-center gap-4">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.6em] max-w-sm">
                XÁC THỰC BỞI HỆ THỐNG CỔNG DỊCH VỤ CÔNG QUỐC GIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
