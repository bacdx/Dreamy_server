const { check } = require('express-validator');

let validateCategory = () => {
  return [
    check('ten', 'Không được để trống tên').not().isEmpty(),
    check('note', 'không được để trống ghi chú').not().isEmpty(),
    check('img', 'Không được để trống link ảnh').not().isEmpty(),
    
  ];
}
let validateCategoryEdit = () => {
  return [
    check('ten', 'Không được để trống tên').not().isEmpty(),
    check('note', 'không được để trống ghi chú').not().isEmpty(),
    check('img', 'Không được để trống link ảnh').not().isEmpty(),
    
  ];
}
let validate = {
  validateCategory: validateCategory,
  validateCategoryEdit: validateCategoryEdit
};

module.exports = {validate};
