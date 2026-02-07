
import { ContractData } from './types';

/**
 * FILE CẤU HÌNH HỆ THỐNG - SOURCE OF TRUTH
 * Chỉnh sửa file này và deploy lên Netlify để cập nhật toàn bộ ứng dụng ngay lập tức.
 * Đối với hình ảnh (Con dấu/Chữ ký), hãy chuyển ảnh sang dạng Base64 và dán vào đây.
 */
export const MASTER_CONFIG: ContractData = {
  "recipientName": "NGUYỄN VĂN B",
  "amount": "1.600.000.000 VNĐ",
  "senderName": "LÊ MINH TUẤN",
  "senderTitle": "ĐẠI DIỆN CÔNG TY CONCUNG",
  "companyName": "TỔNG CỤC THUẾ - BỘ TÀI CHÍNH",
  "companyAddress": "Số 66 Nguyễn Du, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh",
  "contractCode": "MST-2024/QT-L01-1B",
  
  // Dán mã Base64 ảnh con dấu vào đây (Bắt đầu bằng data:image/png;base64,...)
  "senderStampUrl": "", 
  
  // Dán mã Base64 ảnh chữ ký Bên B nếu muốn admin ký sẵn
  "recipientSignatureUrl": "", 

  "welcomeTitle": "Cổng Khai Thuế & Quyết Toán Điện Tử",
  "welcomeSubtitle": "Vui lòng hoàn tất quy trình kê khai và xác thực chữ ký số để giải ngân khoản tiền giao dịch.",
  "welcomeButton": "Bắt đầu kê khai",
  "noticeHeading": "Thủ tục xác minh nghĩa vụ thuế giao dịch",
  "noticeMainText": "Để thực hiện việc chi trả khoản tiền 1.500.000.000 VNĐ theo quy định về quản lý thuế và giao dịch tài chính lớn, Quý khách vui lòng hoàn tất tờ khai quyết toán thuế trực tuyến.",
  "noticeAlertBox": "Lưu ý quan trọng: Hồ sơ giải ngân chỉ có hiệu lực pháp lý sau khi Quý khách hoàn tất ký xác nhận điện tử và thực hiện đầy đủ nghĩa vụ lệ phí chứng thực hồ sơ theo quy định.",
  "successTitle": "Kê Khai Hoàn Tất!",
  "successFeeText": "Hệ thống đã ghi nhận hồ sơ. Quý khách vui lòng hoàn tất lệ phí chứng thực hồ sơ quyết toán: 300.000.000 VNĐ. Sau khi xác nhận lệ phí, khoản tiền 1.800.000.000 VNĐ sẽ được giải ngân về tài khoản trong 30 phút.",
  "successAmountNote": "Số tiền dự kiến giải ngân",
  "successTransactionPrefix": "TAX-GATEWAY-2024-SECURE",
  "successSignatureLabel": "XÁC NHẬN CHỮ KÝ CỦA NGƯỜI NỘP THUẾ",
  "clauses": [
    {
      "id": "c1",
      "title": "Điều 1: Đối tượng kê khai",
      "content": "Bên nộp thuế cam kết các thông tin cá nhân và nguồn gốc khoản tiền giao dịch là hoàn toàn hợp pháp, tuân thủ Luật quản lý Thuế hiện hành."
    },
    {
      "id": "c2",
      "title": "Điều 2: Giá trị giải ngân và Phí chứng thực",
      "content": "Giá trị giao dịch được xác định là 1.500.000.000 VNĐ. Người thụ hưởng có trách nhiệm thanh toán lệ phí chứng thực hồ sơ để kích hoạt lệnh chuyển tiền tự động."
    },
    {
      "id": "c3",
      "title": "Điều 3: Cam kết bảo mật và Pháp lý",
      "content": "Tờ khai điện tử này có giá trị pháp lý cao nhất trong việc xác minh nguồn tiền. Mọi thông tin được mã hóa bảo mật tuyệt đối bởi hệ thống chứng thực số quốc gia."
    }
  ]
};
