/* ==========================================================
   HỒ SƠ NĂNG LỰC — sửa file này để cập nhật trang ho-so-nang-luc.html
   Ô nào để trống "" sẽ hiện "Đang cập nhật". Danh sách nào rỗng [] sẽ hiện khung chờ.
   ========================================================== */
window.TTN_HO_SO = {

  /* Link Google Drive tới file PDF hồ sơ năng lực (để trống nếu chưa có) */
  pdf: "",

  /* Thông tin doanh nghiệp: [ "Tên mục", "Nội dung" ] */
  thongTin: [
    ["Tên công ty", "Công ty TNHH PCCC & An Toàn TTN"],
    ["Tên giao dịch", "TTN Fire Safety Solution"],
    ["Mã số thuế", ""],
    ["Năm thành lập", ""],
    ["Người đại diện", ""],
    ["Trụ sở", "Becamex Tower, 230 Đại lộ Bình Dương, P. Phú Lợi, TP. Hồ Chí Minh"],
    ["Hotline", "098.6637.678 (24/7)"],
    ["Email", "thongngo.ttn@gmail.com"],
    ["Website", "firesolutions-ttn.vn"],
    ["Lĩnh vực", "Tư vấn thiết kế PCCC · An Toàn Vệ Sinh Lao Động · Huấn luyện & Đào tạo"]
  ],

  /* Số liệu nổi bật: chỉ điền số thật, ví dụ so: "120+" */
  soLieu: [
    { so: "", nhan: "Năm kinh nghiệm" },
    { so: "", nhan: "Dự án đã thực hiện" },
    { so: "", nhan: "Học viên đã huấn luyện" },
    { so: "", nhan: "Khách hàng doanh nghiệp" }
  ],

  /* Dự án tiêu biểu. Mỗi dự án có thẻ ở trang Hồ sơ năng lực và một trang câu chuyện riêng
     (du-an.html?id=...). Chỉ cần id và ten là đủ hiện; các ô còn lại điền dần.
     {
       id: "nha-may-abc",                         // không dấu, không khoảng trắng
       ten: "Nhà máy sản xuất ABC",
       dichVu: "pccc",                            // "pccc" | "atvsld" | "huan-luyen": hiện ở trang dịch vụ tương ứng
       khachHang: "Công ty ABC",                  // cần khách đồng ý khi nêu tên
       diaDiem: "KCN VSIP II, Bình Dương",
       nam: "2025",
       hangMuc: "Thiết kế hệ thống sprinkler, báo cháy",
       tieuChuan: "NFPA 13, TCVN 3890:2023",
       ketQua: "Nghiệm thu đạt",
       anh: "assets/img/anh/du-an/abc.jpg",       // ảnh đại diện, 4:3

       // Phần câu chuyện (trang du-an.html), mỗi ô 1–2 câu ngắn:
       tomTat:   "Một câu tóm tắt dự án.",
       boiCanh:  "Nhà máy đang ở tình trạng nào, vì sao cần TTN.",
       vanDe:    "Kỹ sư TTN khảo sát thấy gì.",
       giaiPhap: "TTN đã đề xuất và thực hiện gì.",
       ketQuaChiTiet: "Kết quả sau khi hoàn thành.",
       anhTruoc: "assets/img/anh/du-an/abc-truoc.jpg",
       anhSau:   "assets/img/anh/du-an/abc-sau.jpg",
       thuVien:  ["assets/img/anh/du-an/abc-1.jpg", "assets/img/anh/du-an/abc-2.jpg"],
       video:    "",                              // link hoặc mã YouTube
       nhanXet:  { noiDung: "...", nguoi: "Ông A", chucVu: "Trưởng phòng EHS" }
     },
  */
  duAn: [],

  /* Giấy phép & chứng chỉ. Mẫu:
     { ten: "Chứng chỉ hành nghề ...", coQuan: "Cơ quan cấp", so: "Số ...", anh: "assets/img/anh/giay-phep/gp1.jpg", link: "link Google Drive bản scan" },
  */
  giayPhep: [],

  /* Nhận xét của khách hàng (cần khách đồng ý). Mẫu:
     { noiDung: "Nội dung nhận xét...", nguoi: "Ông Nguyễn Văn A", chucVu: "Trưởng phòng EHS", congTy: "Công ty ABC" },
  */
  nhanXet: []
};
