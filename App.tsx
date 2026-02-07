
import React, { useState, useEffect } from 'react';
import { AppStep, ContractData } from './types';
import { WelcomeView } from './components/WelcomeView';
import { NoticeView } from './components/NoticeView';
import { ContractReviewView } from './components/ContractReviewView';
import { SignatureView } from './components/SignatureView';
import { SuccessView } from './components/SuccessView';
import { MASTER_CONFIG } from './config';
import { ShieldCheck, FileText, Lock, Settings2, Save, X, CheckSquare, Image as ImageIcon, RotateCcw, KeyRound, Code, PenTool, Landmark } from 'lucide-react';

const ADMIN_PASSWORD = "admin123@"; 

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [signature, setSignature] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [adminTab, setAdminTab] = useState<'info' | 'welcome' | 'clauses' | 'success'>('info');
  const [saveStatus, setSaveStatus] = useState<boolean>(false);

  // Khởi tạo state: Ưu tiên dữ liệu từ config.ts (MASTER_CONFIG) để hỗ trợ cập nhật khi deploy
  const [contractData, setContractData] = useState<ContractData>(() => {
    const savedData = localStorage.getItem('tax_portal_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Logic: Nếu muốn luôn cập nhật theo file config khi deploy, hãy bỏ comment dòng dưới
      // return MASTER_CONFIG; 
      return parsed;
    }
    return MASTER_CONFIG;
  });

  // Cập nhật lại state nếu MASTER_CONFIG thay đổi (khi deploy bản mới)
  useEffect(() => {
    // Nếu bạn muốn ép buộc ứng dụng dùng dữ liệu mới nhất từ file config sau khi deploy,
    // ta có thể thực hiện so sánh hoặc reset tại đây.
    // Ở đây ta giữ nguyên để admin vẫn có thể sửa nhanh trên trình duyệt nếu cần.
  }, []);

  useEffect(() => {
    localStorage.setItem('tax_portal_data', JSON.stringify(contractData));
  }, [contractData]);

  const updateField = (field: keyof ContractData, value: string) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'senderStampUrl' | 'recipientSignatureUrl', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContractData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateClause = (id: string, field: 'title' | 'content', value: string) => {
    setContractData(prev => ({
      ...prev,
      clauses: prev.clauses.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const handleReset = () => {
    if (window.confirm("Khôi phục toàn bộ nội dung về mặc định của file config.ts?")) {
      setContractData(MASTER_CONFIG);
      setSignature(null);
      localStorage.removeItem('tax_portal_data');
    }
  };

  const handleManualSave = () => {
    localStorage.setItem('tax_portal_data', JSON.stringify(contractData));
    setSaveStatus(true);
    setTimeout(() => {
      setSaveStatus(false);
      setIsEditMode(false);
    }, 1000);
  };

  const handleAdminClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowLogin(false);
      setPasswordInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

  const copyToClipboard = () => {
    const code = `export const MASTER_CONFIG: ContractData = ${JSON.stringify(contractData, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert("Đã sao chép nội dung cấu hình! Hãy dán vào file config.ts để lưu vĩnh viễn.");
  };

  const renderStep = () => {
    const activeSignature = signature || contractData.recipientSignatureUrl || null;
    switch (step) {
      case AppStep.WELCOME: return <WelcomeView onStart={() => setStep(AppStep.NOTICE)} data={contractData} />;
      case AppStep.NOTICE: return <NoticeView onContinue={() => setStep(AppStep.REVIEW)} data={contractData} />;
      case AppStep.REVIEW: return <ContractReviewView onContinue={() => setStep(AppStep.SIGN)} data={contractData} signature={activeSignature} />;
      case AppStep.SIGN: return <SignatureView onSign={(sig) => { setSignature(sig); setStep(AppStep.SUCCESS); }} data={contractData} />;
      case AppStep.SUCCESS: return <SuccessView data={contractData} signature={activeSignature} />;
      default: return <WelcomeView onStart={() => setStep(AppStep.NOTICE)} data={contractData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 font-arial">
      <button 
        onClick={handleAdminClick}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all no-print flex items-center gap-2 font-bold text-sm ${isEditMode ? 'bg-red-500 text-white' : 'bg-indigo-900 text-white hover:scale-105'}`}
      >
        {isEditMode ? <X size={20} /> : <Settings2 size={20} />}
        <span>{isEditMode ? 'Đóng Admin' : 'Cấu hình Hệ thống'}</span>
      </button>

      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm no-print px-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-[2rem] shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-white">
                <KeyRound size={24} />
              </div>
              <button onClick={() => setShowLogin(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight text-center">Xác thực Quản trị viên</h3>
            <p className="text-slate-500 text-sm mb-6 text-center">Vui lòng nhập mật khẩu cổng dịch vụ.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password"
                autoFocus
                placeholder="Mật khẩu"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-4 bg-slate-50 border ${loginError ? 'border-red-500 ring-red-100' : 'border-slate-200 focus:ring-indigo-100'} rounded-2xl outline-none focus:ring-4 transition-all text-center text-lg font-bold`}
              />
              <button type="submit" className="w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">Đăng nhập</button>
            </form>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="fixed inset-y-0 left-0 w-full md:w-[450px] bg-white shadow-2xl z-40 p-0 overflow-hidden no-print border-r border-slate-200 flex flex-col animate-in slide-in-from-left duration-300">
          <div className="bg-indigo-900 p-6 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight uppercase">QUẢN TRỊ VIÊN CỔNG THUẾ</h2>
              <p className="text-slate-400 text-xs">Sửa xong hãy copy JSON dán vào config.ts</p>
            </div>
            <button onClick={() => setIsEditMode(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
          </div>

          <div className="flex bg-slate-100 border-b border-slate-200 overflow-x-auto">
            {[
              { id: 'info', label: 'Cơ quan' },
              { id: 'welcome', label: 'Giao diện' },
              { id: 'clauses', label: 'Luật thuế' },
              { id: 'success', label: 'Kết quả' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setAdminTab(tab.id as any)} className={`px-4 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${adminTab === tab.id ? 'bg-white text-indigo-600 border-t-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {adminTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Dấu Cơ Quan Thuế</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer h-32">
                      {contractData.senderStampUrl ? (
                        <img src={contractData.senderStampUrl} className="max-h-full object-contain" alt="Stamp" />
                      ) : (
                        <ImageIcon size={20} className="text-slate-300 mb-2" />
                      )}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-2">Tải ảnh con dấu</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload('senderStampUrl', e)} />
                    </label>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Chữ ký Người nộp</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer h-32">
                      {contractData.recipientSignatureUrl ? (
                        <img src={contractData.recipientSignatureUrl} className="max-h-full object-contain" alt="Signature B" />
                      ) : (
                        <PenTool size={20} className="text-slate-300 mb-2" />
                      )}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-2">Tải ảnh chữ ký</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload('recipientSignatureUrl', e)} />
                    </label>
                  </div>
                </div>

                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Người nộp thuế (Bên B)</label><input value={contractData.recipientName} onChange={e => updateField('recipientName', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none" /></div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Số tiền quyết toán</label><input value={contractData.amount} onChange={e => updateField('amount', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 font-bold text-indigo-700 outline-none" /></div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Tên cơ quan</label><input value={contractData.companyName} onChange={e => updateField('companyName', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none" /></div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Mã số tờ khai</label><input value={contractData.contractCode} onChange={e => updateField('contractCode', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none" /></div>
              </div>
            )}
            
            {adminTab === 'welcome' && (
              <div className="space-y-4">
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Tiêu đề cổng</label><input value={contractData.welcomeTitle} onChange={e => updateField('welcomeTitle', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none" /></div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Mô tả quy trình</label><textarea value={contractData.welcomeSubtitle} onChange={e => updateField('welcomeSubtitle', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none h-20" /></div>
              </div>
            )}

            {adminTab === 'clauses' && (
              <div className="space-y-6">
                {contractData.clauses.map((clause, index) => (
                  <div key={clause.id} className="p-4 border rounded-xl bg-slate-50 relative">
                    <span className="absolute -top-2 -left-2 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">{index + 1}</span>
                    <input value={clause.title} onChange={e => updateClause(clause.id, 'title', e.target.value)} className="w-full p-2 mb-2 font-bold text-xs bg-transparent border-b border-slate-200 outline-none" />
                    <textarea value={clause.content} onChange={e => updateClause(clause.id, 'content', e.target.value)} className="w-full p-2 text-xs bg-transparent outline-none h-24 resize-none" />
                  </div>
                ))}
              </div>
            )}

            {adminTab === 'success' && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
                  <p className="text-[10px] font-bold text-green-700 uppercase mb-2">Chỉnh sửa trạng thái Hoàn tất</p>
                </div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Tiêu đề xác nhận</label><input value={contractData.successTitle} onChange={e => updateField('successTitle', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none" /></div>
                <div><label className="text-[10px] font-bold text-slate-400 block mb-1">Thông báo lệ phí & Giải ngân</label><textarea value={contractData.successFeeText} onChange={e => updateField('successFeeText', e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 outline-none h-32" /></div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
            <button onClick={handleManualSave} className={`w-full py-4 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saveStatus ? 'bg-green-600' : 'bg-indigo-900'}`}>{saveStatus ? <CheckSquare size={18} /> : <Save size={18} />} {saveStatus ? 'ĐÃ LƯU TẠM' : 'LƯU TRÌNH DUYỆT'}</button>
            <button onClick={copyToClipboard} className="w-full py-3 bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-200 transition-colors uppercase tracking-widest"><Code size={14} /> COPY CONFIG JSON</button>
            <button onClick={handleReset} className="w-full py-2 text-slate-400 font-bold text-[10px] flex items-center justify-center gap-1 hover:text-red-500 transition-colors uppercase tracking-widest"><RotateCcw size={12} /> RESET THEO FILE CONFIG</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mb-6 flex items-center justify-between no-print">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            <Landmark size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-900 font-bold text-lg tracking-tight leading-none uppercase">CHÍNH PHỦ <span className="text-slate-500 font-medium">BỘ TÀI CHÍNH</span></span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cổng Dịch Vụ Thuế Điện Tử Quốc Gia</span>
          </div>
        </div>
        <div className="flex items-center text-slate-400 text-[10px] font-bold space-x-6 uppercase tracking-widest">
          <div className="flex items-center gap-1.5"><Lock size={12} className="text-indigo-500" /><span>Secure SHA-512</span></div>
          <div className="flex items-center gap-2"><span>Bước {Object.values(AppStep).indexOf(step) + 1}/5</span><div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-indigo-900 transition-all duration-500" style={{ width: `${(Object.values(AppStep).indexOf(step) + 1) * 20}%` }} /></div></div>
        </div>
      </div>

      <main className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 transition-all min-h-[550px]">
        {renderStep()}
      </main>

      <footer className="mt-10 text-center text-slate-400 text-[10px] flex flex-col items-center space-y-3 no-print uppercase tracking-widest font-bold">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5"><ShieldCheck size={14} className="text-slate-300" /><span>Hệ thống bảo mật chính phủ</span></div>
          <div className="flex items-center space-x-1.5"><FileText size={14} className="text-slate-300" /><span>Legal Electronic Signature 2.0</span></div>
        </div>
        <p>&copy; 2024 {contractData.companyName} — TRANG TIN CHÍNH THỨC</p>
      </footer>
    </div>
  );
};

export default App;
