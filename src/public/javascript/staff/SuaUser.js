import {
    numberWithDot,
    numberWithoutDot,
    numberSmallerTen,
    openLoader,
    closeLoader,
    getThuTrongTuan,
    today,
    onlyNumber,
    showToast,
    ActiveNavItem_Header,
} from '../start.js';

ActiveNavItem_Header('PhanQuyen');
openLoader('Chờ chút');
closeLoader();

window.onlyNumber = onlyNumber;
let MaUser = document.querySelector('.MaUser').getAttribute('value');
let Users = JSON.parse(document.querySelector('.Users').getAttribute('value'));
let MaXacNhan;
let Email, SDT, CCCD;
let User_MaUser = document.querySelector('.User_MaUser');
let User_TrangThai = document.querySelector('.User_TrangThai');
let User_MaChucVu = document.querySelector('.User_MaChucVu');
let User_MatKhau = document.querySelector('.User_MatKhau');
let User_MatKhauR = document.querySelector('.User_MatKhauR');
let User_HoTen = document.querySelector('.User_HoTen');
let User_GioiTinh = document.querySelector('.User_GioiTinh');
let User_Ngay = document.querySelector('.User_Ngay');
let User_Thang = document.querySelector('.User_Thang');
let User_Nam = document.querySelector('.User_Nam');
let User_CCCD = document.querySelector('.User_CCCD');
let User_SDT = document.querySelector('.User_SDT');
let User_Email = document.querySelector('.User_Email');
function checkEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//Load thông tin user
load();
function load() {
    for (let i = 1; i <= 31; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        User_Ngay.appendChild(opt);
    }

    for (let i = 1; i <= 12; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = 'Tháng ' + i;
        User_Thang.appendChild(opt);
    }
    let today = new Date();
    let Nam = today.getFullYear() - 18;
    for (let i = Nam - 200; i <= Nam; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        User_Nam.appendChild(opt);
    }
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].MaUser == MaUser) {
            User_MaUser.value = Users[i].MaUser;
            User_MaChucVu.value = Users[i].MaChucVu;
            User_HoTen.value = Users[i].HoTen;
            User_GioiTinh.value = Users[i].GioiTinh == 1 ? 1 : 2;
            let date = new Date(Users[i].NgaySinh);
            User_Ngay.value = date.getDate();
            User_Thang.value = date.getMonth() + 1;
            User_Nam.value = date.getFullYear();
            User_CCCD.value = Users[i].CCCD;
            User_SDT.value = Users[i].SDT;
            User_Email.value = Users[i].Email;
            CCCD = User_CCCD.value;
            Email = User_Email.value;
            SDT = User_SDT.value;
            if (Users[i].TrangThai == 'HieuLuc') {
                User_TrangThai.value = 1;
                User_TrangThai.classList.remove('text-danger');
                User_TrangThai.classList.add('text-success-light');
            } else {
                User_TrangThai.value = 2;
                User_TrangThai.classList.add('text-danger');
                User_TrangThai.classList.remove('text-success-light');
            }
            if (User_MaChucVu.value == '3KH') {
                User_MaUser.disabled = true;
                User_MaChucVu.disabled = true;
                User_HoTen.disabled = true;
                User_GioiTinh.disabled = true;
                User_Ngay.disabled = true;
                User_Thang.disabled = true;
                User_Nam.disabled = true;
                User_CCCD.disabled = true;
                User_SDT.disabled = true;
                User_Email.disabled = true;
            }
            break;
        }
    }
}
User_TrangThai.addEventListener('change', (e) => {
    if (e.target.selectedIndex == 0) {
        e.target.classList.remove('text-danger');
        e.target.classList.add('text-success-light');
    } else {
        e.target.classList.remove('text-success-light');
        e.target.classList.add('text-danger');
    }
});
//Hàm check ngày hợp lệ
function CheckNgayThangNam(Ngay, Thang, Nam) {
    if (Thang == 4 || Thang == 6 || Thang == 9 || Thang == 11) {
        if (Ngay == 31) return 0;
    }
    if (Thang == 2) {
        if ((Nam % 4 == 0 && Nam % 100 != 0) || Nam % 400 == 0) {
            if (Ngay > 28) return 0;
        } else {
            if (Ngay > 29) return 0;
        }
    }
    return;
}
document.querySelector('.User--Sua').addEventListener('click', (e) => {
    // kiểm tra dữ liệu vào
    if (User_HoTen.value == '') {
        showToast({
            header: 'Thêm người dùng',
            body: 'Họ tên không được để trống',
            duration: 5000,
            type: 'warning',
        });
        User_HoTen.focus();
        return;
    }
    if (CheckNgayThangNam(User_Ngay.value, User_Thang.value, User_Nam.value) == 0) {
        showToast({
            header: 'Thêm người dùng',
            body: 'Ngày sinh không hợp lệ',
            duration: 5000,
            type: 'warning',
        });
        User_Ngay.focus();
        return;
    }
    if (User_SDT.value == '') {
        showToast({
            header: 'Thêm người dùng',
            body: 'Số điện thoại không được để trống',
            duration: 5000,
            type: 'warning',
        });
        User_SDT.focus();
        return;
    }
    if (User_SDT.value.length != 10 || User_SDT.value.charAt(0) != '0') {
        showToast({
            header: 'Thêm người dùng',
            body: 'Số điện thoại không hợp lệ',
            duration: 5000,
            type: 'warning',
        });
        User_SDT.focus();
        return;
    }
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].SDT == User_SDT.value && User_SDT.value != SDT) {
            showToast({
                header: 'Thêm người dùng',
                body: 'Số điện thoại đã được sử dụng',
                duration: 5000,
                type: 'warning',
            });
            User_SDT.value = '';
            User_SDT.focus();
            return;
        }
    }
    if (User_CCCD.value == '') {
        showToast({
            header: 'Thêm người dùng',
            body: 'Căn cước công dân không được để trống',
            duration: 5000,
            type: 'warning',
        });
        User_CCCD.focus();
        return;
    }
    if (User_CCCD.value.length != 12) {
        showToast({
            header: 'Thêm người dùng',
            body: 'Căn cước công dân không hợp lệ',
            duration: 5000,
            type: 'warning',
        });
        User_CCCD.focus();
        return;
    }
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].CCCD == User_CCCD.value && User_CCCD.value != CCCD) {
            showToast({
                header: 'Thêm người dùng',
                body: 'Căn cước công dân đã được sử dụng',
                duration: 5000,
                type: 'warning',
            });
            User_CCCD.value = '';
            User_CCCD.focus();
            return;
        }
    }
    if (User_Email.value == '') {
        showToast({
            header: 'Thêm người dùng',
            body: 'Email không được để trống',
            duration: 5000,
            type: 'warning',
        });
        User_Email.focus();
        return;
    }
    if (checkEmail(User_Email.value) == false) {
        showToast({
            header: 'Thêm người dùng',
            body: 'Email không hợp lệ',
            duration: 5000,
            type: 'warning',
        });
        User_Email.value = '';
        User_Email.focus();
        return;
    }
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].Email == User_Email.value && User_Email.value != Email) {
            showToast({
                header: 'Thêm người dùng',
                body: 'Email đã được sử dụng',
                duration: 5000,
                type: 'warning',
            });
            User_Email.value = '';
            User_Email.focus();
            return;
        }
    }
    // if (User_Email.value != Email) {
    //     document.getElementById('XacNhan_Email').innerText = User_Email.value;
    //     let input = document.getElementById('MaXacNhan_input');
    //     input.value = '';
    //     const NhacNhapCode = document.getElementById('NhacNhapCode');
    //     if (!NhacNhapCode.classList.contains('d-none')) NhacNhapCode.classList.add('d-none');
    //     if (!input.classList.contains('custom-boxshadow-focus-primary')) {
    //         input.classList.add('custom-boxshadow-focus-primary');
    //     }
    //     if (input.classList.contains('custom-boxshadow-focus-secondary')) {
    //         input.classList.remove('custom-boxshadow-focus-secondary');
    //     }
    //     document.getElementById('XacNhan').disabled = true;
    //     new bootstrap.Modal(document.getElementById('staticBackdrop')).show();

    //     axios({
    //         method: 'post',
    //         url: '/validatecode',
    //         data: { Email: document.getElementById('XacNhan_Email').innerText.toString() },
    //     }).then((res) => {
    //         MaXacNhan = res.data.Code;
    //         console.log(MaXacNhan);
    //         document.getElementById('XacNhan').disabled = false;
    //     });
    // } else {
    let User_NgaySinh =
        User_Nam.value + '-' + ('0' + User_Thang.value).slice(-2) + '-' + ('0' + User_Ngay.value).slice(-2);
    let User_P = {
        MaUser: User_MaUser.value,
        MaChucVu: User_MaChucVu.value,
        HoTen: User_HoTen.value,
        GioiTinh: User_GioiTinh.value,
        NgaySinh: User_NgaySinh,
        CCCD: User_CCCD.value,
        SDT: User_SDT.value,
        Email: User_Email.value,
        TrangThai: User_TrangThai.value,
    };
    console.log(User_P);
    axios({
        method: 'POST',
        url: '/staff/phanquyen/SuaUser',
        data: User_P,
    }).then((res) => {
        alert('Cập nhật thông tin người dùng thành công');
        var Form = document.forms['Form'];
        Form.action = '/staff/phanquyen/Authorization';
        Form.submit();
    });
    // }
});
// kiểm tra mã xác nhận
const XacNhan = document.getElementById('XacNhan');
if (XacNhan) {
    XacNhan.addEventListener('click', (e) => {
        let input = document.getElementById('MaXacNhan_input');
        if (input.value == '' || input.value != MaXacNhan) {
            const NhacNhapCode = document.getElementById('NhacNhapCode');

            if (input.value == '') NhacNhapCode.innerText = 'Bạn chưa nhập mã code!';
            else NhacNhapCode.innerText = 'Mã code không đúng!';

            if (NhacNhapCode.classList.contains('d-none')) NhacNhapCode.classList.remove('d-none');
            if (input.classList.contains('custom-boxshadow-focus-primary')) {
                input.classList.remove('custom-boxshadow-focus-primary');
            }
            if (!input.classList.contains('custom-boxshadow-focus-secondary')) {
                input.classList.add('custom-boxshadow-focus-secondary');
            }
            return;
        }
        if (input.value == MaXacNhan) {
            let User_NgaySinh =
                User_Nam.value + '-' + ('0' + User_Thang.value).slice(-2) + '-' + ('0' + User_Ngay.value).slice(-2);
            let User_P = {
                MaUser: User_MaUser.value,
                MaChucVu: User_MaChucVu.value,
                HoTen: User_HoTen.value,
                GioiTinh: User_GioiTinh.value,
                NgaySinh: User_NgaySinh,
                CCCD: User_CCCD.value,
                SDT: User_SDT.value,
                Email: User_Email.value,
                TrangThai: User_TrangThai.value,
            };
            console.log(User_P);
            axios({
                method: 'POST',
                url: '/staff/phanquyen/SuaUser',
                data: User_P,
            }).then((res) => {
                alert('Cập nhật thông tin người dùng thành công');
                var Form = document.forms['Form'];
                Form.action = '/staff/phanquyen/Authorization';
                Form.submit();
            });
        }
    });
}
if (GuiLaiMaXacNhan) {
    GuiLaiMaXacNhan.addEventListener('click', (e) => {
        document.getElementById('XacNhan').disabled = true;
        axios({
            method: 'post',
            url: '/validatecode',
            data: { Email: document.getElementById('XacNhan_Email').innerText.toString() },
        }).then((res) => {
            MaXacNhan = res.data.Code;
            console.log(MaXacNhan);
            document.getElementById('XacNhan').disabled = false;
        });
    });
}
