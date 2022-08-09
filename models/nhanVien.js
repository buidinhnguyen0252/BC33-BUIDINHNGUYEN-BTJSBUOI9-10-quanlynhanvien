function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.calcLuong = function () {
    if (this.chucVu === "Sếp") {
      return (this.calcLuong = Number(this.luongCoBan) * 3);
    } else if (thichucVu === "Trưởng phòng") {
      return (this.calcLuong = Number(this.luongCoBan) * 2);
    } else return (this.calcLuong = Number(this.luongCoBan));
  };
  this.xepLoaiNhanVien = function () {
    if (this.chucVu !== "Nhân viên") return "";
    if (this.gioLam >= 192) {
      return (this.xepLoaiNhanVien = "Nhân viên xuất sắc");
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      return (this.xepLoaiNhanVien = "Nhân viên giỏi");
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      return (this.xepLoaiNhanVien = "Nhân viên khá");
    } else {
      return (this.xepLoaiNhanVien = "Nhân viên trung bình");
    }
  };
}
