/* ==========================================================
   CẤU HÌNH WEBSITE — chỉ cần sửa file này
   ========================================================== */
window.TTN_CONFIG = {
  /* CHẾ ĐỘ NHÁP
     false = chạy thật: mục nào chưa có nội dung thì tự ẩn (khung ảnh trống, video chưa có,
             dự án/giấy phép/nhận xét trống, hỏi – đáp mẫu, tài liệu chưa có link...).
     true  = đang soạn nội dung: hiện khung chờ kèm ghi chú tên file, câu hỏi mẫu, trang dự án mẫu. */
  cheDoNhap: false,

  /* Mã form Formspree (phần cuối của địa chỉ https://formspree.io/f/xxxxxxx).
     Tạo miễn phí tại https://formspree.io, rồi dán mã vào đây.
     Khi chưa có mã, form sẽ nhắc khách gọi hotline. */
  formspreeId: "mzerjnyb",

  /* Số hiển thị trong thông báo của form */
  hotline: "098.6637.678",

  /* Video giới thiệu ở trang chủ: dán link hoặc mã YouTube, ví dụ "https://youtu.be/xxxxxxxxxxx".
     Để trống thì trang chủ ẩn phần video (chế độ nháp: hiện khung chờ). */
  videoGioiThieu: "",

  /* Zalo Official Account: dán OA ID (dãy số trong trang quản lý OA).
     Có OA ID thì website tự hiện khung chat Zalo và nút "Zalo" trong thanh chia sẻ. */
  zaloOA: ""
};
