
export enum AppStep {
  WELCOME = 'WELCOME',
  NOTICE = 'NOTICE',
  REVIEW = 'REVIEW',
  SIGN = 'SIGN',
  SUCCESS = 'SUCCESS'
}

export interface ContractClause {
  id: string;
  title: string;
  content: string;
}

export interface ContractData {
  // General
  recipientName: string;
  amount: string;
  companyName: string;
  companyAddress: string;
  taxCode: string;
  contractCode: string;
  senderName: string;
  senderTitle: string;
  senderStampUrl?: string;
  recipientSignatureUrl?: string; // Ảnh chữ ký Bên B do Admin tải lên
  
  // Welcome View Content
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeButton: string;
  
  // Notice View Content
  noticeHeading: string;
  noticeMainText: string;
  noticeAlertBox: string;
  
  // Success View Content
  successTitle: string;
  successFeeText: string; 
  successAmountNote: string; 
  successTransactionPrefix: string; 
  successSignatureLabel: string; 

  clauses: ContractClause[];
}
