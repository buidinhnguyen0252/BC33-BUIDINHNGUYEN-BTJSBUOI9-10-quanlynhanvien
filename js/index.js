var nhanVienList = [];

function createNhanVien() {
  //Lấy thông tin từ input
  var nhanVienTaikhoan = document.querySelector("#tknv").value;
  var nhanVienHoTen = document.querySelector("#name").value;
  var nhanVienEmail = document.querySelector("#email").value;
  var nhanVienMatKhau = document.querySelector("#password").value;
  var nhanVienNgayLam = document.querySelector("#datepicker").value;
  var nhanVienLuongCoban = document.querySelector("#luongCB").value;
  var nhanVienChucVu = document.querySelector("#chucvu").value;
  var nhanVienGioLam = document.querySelector("#gioLam").value;

  // Tạo đối tượng nhân viên
  var nhanVien = new NhanVien(
    nhanVienTaikhoan,
    nhanVienHoTen,
    nhanVienEmail,
    nhanVienMatKhau,
    nhanVienNgayLam,
    nhanVienLuongCoban,
    nhanVienChucVu,
    nhanVienGioLam
  );
  //Kiểm tra rỗng

  var valid = true;

  valid &=
    kiemTraRong(nhanVien.taiKhoan, "#tbTKNV", "Tài khoản") &
    kiemTraRong(nhanVien.hoTen, "#tbTen", "Tên nhân viên") &
    kiemTraRong(nhanVien.email, "#tbEmail", "email") &
    kiemTraRong(nhanVien.matKhau, "#tbMatKhau", "Mật khẩu") &
    kiemTraRong(nhanVien.ngayLam, "#tbNgay", "Ngày làm") &
    kiemTraRong(nhanVien.luongCoBan, "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(nhanVien.chucVu, "#tbChucVu", "Chức vụ") &
    kiemTraRong(nhanVien.gioLam, "#tbGiolam", "Giờ làm");
  // Kiểm tra ký tự
  if (kiemTraRong(nhanVien.hoTen, "#tbTen", "Tên nhân viên")) {
  }
  valid &= kiemTraKyTu(nhanVien.hoTen, "#tbTen", " Tên nhân viên");

  // Kiểm tra độ dài tài khoản
  if (kiemTraSo(nhanVien.taiKhoan, "#tbTKNV", "Tài khoản")) {
    valid &= kiemTraDoDai(nhanVien.taiKhoan, "#tbTKNV", "Tài khoản NV", 4, 6);
  }
  //kiểm tra mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt
  if (kiemTraMatKhau(nhanVien.matKhau, "#tbMatKhau", "Mật khẩu")) {
    valid &= kiemTraDoDai(nhanVien.matKhau, "#tbMatKhau", "Mật khẩu", 6, 10);
  }
  // }
  //Kiểm tra Email
  valid &= kiemTraEmail(nhanVien.email, "#tbEmail", "email");
  //Kiểm tra giá trị
  if (kiemTraSo(nhanVien.luongCoBan, "#tbLuongCB", "Lương cơ bản")) {
    valid &= kiemTraGiaTri(
      nhanVien.luongCoBan,
      "#tbLuongCB",
      "Lương cơ bản",
      1000000,
      20000000
    );
  }
  if (kiemTraSo(nhanVien.gioLam, "#tbGiolam", "Giờ làm")) {
    valid &= kiemTraGiaTri(nhanVien.gioLam, "#tbGiolam", "Giờ làm", 80, 200);
  }
  if (!valid) {
    return;
  }

  // push đối tượng nhân viên vào danh sách
  nhanVienList.push(nhanVien);

  //Gọi hàm tạo table sau khi thêm 1 nhân viên mới vào
  //   console.table(nhanVienList);
  renderNhanVienList(nhanVienList);

  //gọi hàm lưu vào localstorage sau khi thêm nhân viên
  saveLocalStorage(nhanVienList, "arrNV");
}

function renderNhanVienList(arrNV) {
  var output = "";
  for (var index = 0; index < arrNV.length; index++) {
    var obNhanVien = arrNV[index];
    obNhanVien.calcLuong = function () {
      if (this.chucVu === "Sếp") {
        return (this.calcLuong = Number(this.luongCoBan) * 3);
      } else if (this.chucVu === "Trưởng phòng") {
        return (this.calcLuong = Number(this.luongCoBan) * 2);
      } else return (this.calcLuong = Number(this.luongCoBan));
    };
    obNhanVien.xepLoaiNhanVien = function () {
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

    var trNV = `
          <tr>
            <td>${obNhanVien.taiKhoan}</td>
            <td>${obNhanVien.hoTen}</td>
            <td>${obNhanVien.email}</td>
            <td>${obNhanVien.ngayLam}</td>
            <td>${obNhanVien.chucVu}</td>
            <td>${obNhanVien.calcLuong()}</td>
            <td>${obNhanVien.xepLoaiNhanVien()}</td>
            <td>
            <button class="btn btn-danger" onclick="delNhanVien('${
              obNhanVien.taiKhoan
            }')">Del</button>
            <button class="btn btn-success" onclick="editNhanVien('${
              obNhanVien.taiKhoan
            }')">Update</button>
          </td>
          </tr>
        `;
    output += trNV;
  }
  // document.querySelector("#btnCapNhat") = onclick="editNhanVien('${
  //   obNhanVien.taiKhoan
  // }')"
  document.querySelector("#tableDanhSach").innerHTML = output;
  return output;
}
/* Hàm lưu trữ object({}) hoặc array ([]) vào localstorage
 * @param {*} ob Dữ liệu cần lưu
 * @param {*} key keyName trong localstorage
 */

//Xóa nhân viên
function delNhanVien(taiKhoanClick) {
  var indexDel = -1;
  for (var index = nhanVienList.length - 1; index >= 0; index--) {
    if (nhanVienList[index].taiKhoan == taiKhoanClick) {
      nhanVienList.splice(index, 1);
    }
  }
  renderNhanVienList(nhanVienList);
}

// Cập nhật nhân viên
function editNhanVien(nhanVienClick) {
  var nvEdit = null;
  for (var index = 0; index < nhanVienList.length; index++) {
    if (nhanVienList[index].taiKhoan == nhanVienClick) {
      nvEdit = nhanVienList[index];
      break;
    }
  }
  if (nvEdit !== null) {
    //Đưa dữ liệu lên các control input

    document.querySelector("#tknv").value = nvEdit.taiKhoan;
    document.querySelector("#name").value = nvEdit.hoTen;
    document.querySelector("#email").value = nvEdit.email;
    document.querySelector("#password").value = nvEdit.matKhau;
    document.querySelector("#datepicker").value = nvEdit.ngayLam;
    document.querySelector("#luongCB").value = nvEdit.luongCoBan;
    document.querySelector("#chucvu").value = nvEdit.chucVu;
    document.querySelector("#gioLam").value = nvEdit.gioLam;
  }
}
//Khi người dùng thay đổi sau đó bấm nút cập nhật
function capNhatNhanVien() {
  var nvUpdate = new NhanVien();
  nvUpdate.taiKhoan = document.querySelector("#tknv").value;
  nvUpdate.hoTen = document.querySelector("#name").value;
  nvUpdate.email = document.querySelector("#email").value;
  nvUpdate.matKhau = document.querySelector("#password").value;
  nvUpdate.ngayLam = document.querySelector("#datepicker").value;
  nvUpdate.luongCoBan = document.querySelector("#luongCB").value;
  nvUpdate.chucVu = document.querySelector("#chucvu").value;
  nvUpdate.gioLam = document.querySelector("#gioLam").value;
  console.log(nvUpdate);

  var indexEdit = -1;
  for (var index = 0; index < nhanVienList.length; index++) {
    if (nhanVienList[index].taiKhoan === nvUpdate.taiKhoan) {
      indexEdit = index; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    nhanVienList[indexEdit].hoTen = nvUpdate.hoTen;
    nhanVienList[indexEdit].email = nvUpdate.email;
    nhanVienList[indexEdit].matKhau = nvUpdate.matKhau;
    nhanVienList[indexEdit].ngayLam = nvUpdate.ngayLam;
    nhanVienList[indexEdit].luongCoBan = nvUpdate.luongCoBan;
    nhanVienList[indexEdit].chucVu = nvUpdate.chucVu;
    nhanVienList[indexEdit].gioLam = nvUpdate.gioLam;
    //Gọi hàm rendertable truyền cho hàm mảng mới
    renderNhanVienList(nhanVienList);
  }
}
var searchNhanVien = function () {
  //expression function(Không hỗ hoisting)
  //input: tuKhoa : string
  var tuKhoa = document.querySelector("#searchName").value; //a
  tuKhoa = removeVietnameseTones(tuKhoa); // nguyễn => nguyen
  //output: ?? []: arrayNhanVien
  var output = [];
  //process:
  //B1: duyệt qua từng phần tử của mảng
  //B2: Kiểm tra tên có chứa từ khoá hay không
  //B3: Nếu có thì đưa object đó vào output
  //                  0        1         2
  // studentList = [{id,name},{id,name},{id,name}]
  for (var index = 0; index < nhanVienList.length; index++) {
    // nguyễn văn a.search('a') => 11
    // nguyễn văn b.search('a') => -1
    // nguyễn văn c.search('a') => -1
    var xepLoai = nhanVienList[index].xepLoaiNhanVien; // => nguyen van a.search(nguyen)
    if (tuKhoa === "") {
      renderNhanVienList(nhanVienList);
      return;
    }
    if (xepLoai.length > 0 && tuKhoa.length > 0) {
      if (
        xepLoai.search(tuKhoa) != -1 ||
        nhanVienList[index].xepLoaiNhanVien === tuKhoa
      ) {
        output.push(nhanVienList[index]);

        //Dùng output render ra table
        renderNhanVienList(output);
      }
    }
  }
};
//Dom đến txtSearch cài đặt sự kiện oninput cho nó
document.querySelector("#searchName").oninput = searchNhanVien;
//Tìm kiếm
document.querySelector("#btnTimNV").onclick = searchNhanVien;

function saveLocalStorage(ob, key) {
  // {} , []
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

/**
 * Hàm nhận vào keyName để lấy ra giá trị từ localstorage theo key đó
 * @param {*} key : tên của item trong localStorage
 * @returns trả về object được lấy ra theo key
 */

function getLocalStorage(key) {
  //Lấy dữ liệu từ localstorage ra (dữ liệu lấy là string)
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    //Parse dữ liệu về lại object
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}

// //đợi html js load xong thì sẽ động thực thi
window.onload = function () {
  //Lấy ra array nhân viên từ localstorage gán vào nhanVienList
  nhanVienList = getLocalStorage("arrNV");
  if (nhanVienList == undefined) {
    nhanVienList = [];
  }
  renderNhanVienList(nhanVienList);
};
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
