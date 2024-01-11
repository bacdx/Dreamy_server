const { check } = require('express-validator');

let validateNSX = () => {
  return [
    check('name', 'Không được để trống tên').not().isEmpty(),
    check('numberphone', 'không được để trống số điện thoại').not().isEmpty(),
    check('numberphone', 'Số điện thoại phải là số').isNumeric(),
    check('numberphone', 'Số điện thoại phải có 10 chữ số').isLength({ min: 10 }),
    check('numberphone','Số điện thoại bắt đầu phải bằng 0').custom((value, { req }) => value.startsWith('0')),
    check('address', 'Không được để trống đại chỉ').not().isEmpty(),
    check('note', 'Không được để trống ghi chú').not().isEmpty(),
  ];
}

let validate = {
  validateNSX: validateNSX,
 
};

module.exports = {validate};
