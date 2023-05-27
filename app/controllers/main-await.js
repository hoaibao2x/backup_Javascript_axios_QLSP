// Global
var spService = new SanPhamService();


function getProductList() {
    spService.getProductList().then(function (result) {
        // Thành công
        console.log(result);
        // console.log(result.data);

        // Hiển thị lên table
        showTable(result.data);


    }).catch(function (error) {
        // Thất bại
        console.log(error);
    });

    // Nếu gọi showTable() nằm ngoài then => Bất đồng bộ dữ liệu
    // Thì showTable() sẽ bị thực thi trước khi trước khi lấy được data
    // ==> Sai nghiệp vụ

}

getProductList();


function showTable(mangSP) {
    var content = "";
    var stt = 1;
    mangSP.map(function (sp) {
        content += `
            <tr>
                <td>${stt++}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>${sp.hinhAnh}</td>
                <td>${sp.moTa}</td>
                <td>
                    <button data-toggle="modal" data-target="#myModal" class= "btn btn-info" onclick= "getProductDetail('${sp.id}')">Xem</button>
                    <button class= "btn btn-danger" onclick= "deleteProduct('${sp.id}')">Xóa</button>
                </td>
            </tr>
        `
    });
    document.querySelector("#tblDanhSachSP").innerHTML = content;
}

function handleForm() {
    document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class= "btn btn-success" onclick= "addProduct()">Add</button>
    `

    // Khi dùng hàm reset() => Chỉ dùng được với thẻ form
    var formELE = document.querySelectorAll("#myModal .form-control");
    console.log(formELE);
    // map() => Chỉ dùng với array
    // formELE => NodeList => Dùng for
    for (var i = 0; i < formELE.length; i++) {
        formELE[i].value = ""
    }

}
document.querySelector("#btnThemSP").onclick = handleForm;

async function addProduct() {
    var tenSP = document.querySelector("#TenSP").value;
    var gia = document.querySelector("#GiaSP").value;
    var hinhAnh = document.querySelector("#HinhSP").value;
    var moTa = document.querySelector("#moTaSP").value;

    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);

    //? await: Bắt trình duyệt thực hiện tuần tự theo thứ tự
    try {
        // Xử lý thành công
        var response = await fetch('https://62e7428c69bd03090f7a48a4.mockapi.io/Products', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sp)
        });
        console.log(response);
        var data = await response.json();
        console.log(data);
        document.querySelector("#myModal .close").click();
        getProductList();
    } catch (error) {
        // Xử lý thất bại
        console.log(error);
    }
}

function deleteProduct(id) {
    spService.deleteProduct(id)
        .then(function (result) {

            // Thành công
            console.log(result);

            // Load lại table
            getProductList();

        }).catch(function (error) {

            // Thất bại
            console.log(error);

        })
}

function getProductDetail(id) {
    console.log(id);

    spService.getProductDetail(id)
        .then(function (result) {
            // console.log(result);
            console.log(result.data);
            var sp = result.data;
            document.querySelector("#GiaSP").value = sp.gia;
            document.querySelector("#TenSP").value = sp.tenSP;
            document.querySelector("#HinhSP").value = sp.hinhAnh;
            document.querySelector("#moTaSP").value = sp.moTa;

            // Thêm button Update khi click xem => Chuẩn bị chức năng cập nhật
            document.querySelector("#myModal .modal-footer").innerHTML = `<button class= "btn btn-primary" onclick= "updateProduct('${sp.id}')">Update</button>`;

        }).catch(function (error) {
            console.log(error);
        })
}

function updateProduct(id) {
    var tenSP = document.querySelector("#TenSP").value;
    var gia = document.querySelector("#GiaSP").value;
    var hinhAnh = document.querySelector("#HinhSP").value;
    var moTa = document.querySelector("#moTaSP").value;

    var spUpdate = new SanPham(tenSP, gia, hinhAnh, moTa);

    spService.updateProduct(id, spUpdate)
        .then(function (result) {
            console.log(result);
            document.querySelector("#myModal .close").click();
            getProductList();
        }).catch(function (error) {
            console.log(error);
        })
}