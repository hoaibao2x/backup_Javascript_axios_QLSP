function SanPhamService() {
    // Chứa các phương thức giao tiếp với API (restful API: GET: Lấy dữ liệu, POST: Thêm mới dữ liệu, PUT: Cập nhật dữ liệu, DELETE: Xóa dữ liệu)
    //? axios: Truyền vào đối tượng chứa các thông tin kết nối API
    // method: phương thức giao tiếp 
    // url: đường dẫn API
    // trả về đối tượng Promise (Chứa các phương thức xử lý thành công "then", thất bại "catch")

    this.getProductList = function () {
        var promise = axios({
            method: 'get',
            url: 'https://62e7428c69bd03090f7a48a4.mockapi.io/Products'
        });

        return promise;
    }
    this.addProduct = function (sp) {
        // console.log("Add service", sp);
        // data: nhận vào kiểu đối tượng, chính là dữ liệu mới cần lưu xuống BE
        return axios({
            method: 'post',
            url: 'https://62e7428c69bd03090f7a48a4.mockapi.io/Products',
            data: sp
        });
    }
    this.deleteProduct = function (id) {
        // console.log(("id xóa", id));
        // /Products/: id
        // vd: /Products/1; /Products/2
        return axios({
            method: 'delete',
            url: `https://62e7428c69bd03090f7a48a4.mockapi.io/Products/${id}`
        });
    }
    this.getProductDetail = function (id) {
        return axios({
            method: 'get',
            url: `https://62e7428c69bd03090f7a48a4.mockapi.io/Products/${id}`
        });
    }
    this.updateProduct = function (id, sp) {
        return axios({
            method: 'put',
            url: `https://62e7428c69bd03090f7a48a4.mockapi.io/Products/${id}`,
            data: sp
        });
    }

}