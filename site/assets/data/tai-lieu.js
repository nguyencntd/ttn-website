/* ==========================================================
   THƯ VIỆN TÀI LIỆU — mỗi tài liệu là một dòng { ... }
   tieuDe : tên tài liệu
   moTa   : 1 câu mô tả ngắn
   nhom   : "pccc" | "atvsld" | "huan-luyen" | "bieu-mau"
   loai   : "PDF" | "DOCX" | "XLSX" | "VIDEO"
   link   : link Google Drive (Chia sẻ > Bất kỳ ai có đường liên kết > Sao chép)
            Để trống "" thì website hiện "Đang cập nhật".
   dangKy : true = khách phải để lại họ tên, số điện thoại mới nhận được tài liệu
            (thông tin gửi về Formspree). Nếu chưa có link, khách vẫn đăng ký được
            và TTN gửi tài liệu sau qua email/Zalo.
   ========================================================== */
window.TTN_TAI_LIEU = [
  { tieuDe: "QCVN 06:2022/BXD", moTa: "Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình.", nhom: "pccc", loai: "PDF", link: "" },
  { tieuDe: "TCVN 3890:2023", moTa: "Phương tiện PCCC cho nhà và công trình: trang bị, bố trí, kiểm tra, bảo dưỡng.", nhom: "pccc", loai: "PDF", link: "" },
  { tieuDe: "Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ", moTa: "Luật số 55/2024/QH15.", nhom: "pccc", loai: "PDF", link: "" },
  { tieuDe: "NFPA 13", moTa: "Tiêu chuẩn lắp đặt hệ thống chữa cháy sprinkler tự động.", nhom: "pccc", loai: "PDF", link: "" },
  { tieuDe: "NFPA 72", moTa: "Tiêu chuẩn hệ thống báo cháy và tín hiệu.", nhom: "pccc", loai: "PDF", link: "" },
  { tieuDe: "Luật An toàn, vệ sinh lao động", moTa: "Luật số 84/2015/QH13.", nhom: "atvsld", loai: "PDF", link: "" },
  { tieuDe: "Nghị định 44/2016/NĐ-CP", moTa: "Kiểm định, huấn luyện an toàn, vệ sinh lao động và quan trắc môi trường lao động.", nhom: "huan-luyen", loai: "PDF", link: "" },
  { tieuDe: "Mẫu kiểm tra bình chữa cháy hằng tháng", moTa: "Biểu mẫu tham khảo dùng cho nhà máy.", nhom: "bieu-mau", loai: "XLSX", link: "", dangKy: true }
];
