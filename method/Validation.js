function kiemTraRong(value, selectorError, name) {
  //output: true | false
  // var valid = true;
  if (value === "") {
    // alert('mã sinh viên không được bỏ trống !');
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
function kiemTraMatKhau(value, selectorError, name) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = " ";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + "chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}
function kiemTraKyTu(value, selectorError, name) {
  var regex = /^[A-Z a-z]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = " ";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " tất cả phải là ký tự";
  return false;
}

function kiemTraSo(value, selectorError, name) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = " ";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " tất cả phải là số";
  return false;
}

function kiemTraEmail(value, selectorError, name) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = " ";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " phải đúng định dạng ! ví dụ : abc@domain.com!";
  return false;
}

function kiemTraDoDai(value, selectorError, name, minLenght, maxLenght) {
  if (value.length > maxLenght || value.length < minLenght) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLenght + " đến" + maxLenght + " ký tự";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
  if (Number(value) < minValue || Number(value) > maxValue || value === "") {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến" + maxValue + " !";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
