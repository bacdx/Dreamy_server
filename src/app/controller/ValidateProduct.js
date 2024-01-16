const { check } = require('express-validator');

let validateProduct = () => {
  return [
    check('ten', 'Không được để trống tên').not().isEmpty(),
    check('manhasanxuat', 'không được để trống ghi chú').not().isEmpty(),
    check('ngaynhap', 'Không được để trống ngày nhập').not().isEmpty(),
    check('ngaynhap', 'Ngày nhập không đúng ').isISO8601('dd/mm/yyyy'),
    check('ghichu', 'Không được để trống ghi chú').not().isEmpty(),
    check('gia', 'Bạn không được để trống giá').not().isEmpty(),
    check('gia', 'Giá của sản phẩm phải là số').isNumeric(),
    
  ];
}
let validateProductImg = () => {
    return [
      check('img', 'Không được để trống ảnh').not().isEmpty(),
    
    ];
  }
  let validateProductSize = () => {
    return [
      check('title', 'Không được để trống tên size').not().isEmpty(),
     
    ];
  }
  let validateProductColor = () => {
    return [
      check('title', 'Không được để trống tên màu').not().isEmpty(),
      check('img', 'Không được để trống ảnh').not().isEmpty(),
      
    ];
  }
  let validateProductVariant = () => {
    return [
        check('mamau', 'Không được để trống màu').not().isEmpty(),
        check('masize', 'Không được để trống size').not().isEmpty(),
      check('soluong', 'Không được để trống số lượng').not().isEmpty(),
      check('soluong', 'nhập đúng số lượng').isNumeric(),
    ];
  }
//check('user.password', 'password more than 6 degits').isLength({ min: 6 }) 
//check('user.username', 'username must be Alphanumeric').isAlphanumeric(), 
//check('user.email', 'Invalid email').isEmail(),
let validate = {
    validateProduct: validateProduct,
    validateProductImg :validateProductImg ,
    validateProductSize :  validateProductSize , 
    validateProductColor : validateProductColor ,
    validateProductVariant : validateProductVariant,
  };
module.exports = {validate};
