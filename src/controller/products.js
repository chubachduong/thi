import Product from "../models/products";
import Joi from "joi";
const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `mời nhập tên`,
  }),
  price: Joi.number().required().messages({
    "any.required": `mời nhập giá`,
  }),
  desc: Joi.string().required().messages({
    "any.required": `mời nhập mô tả`,
  }),
  status: Joi.boolean().required().messages({
    "any.required": `mời nhập trạng thái`,
  }),
  quality: Joi.number().required().messages({
    "any.required": `mời nhập số lượng`,
  }),
});
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const data = await Product.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Thêm sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length === 0) {
      return res.status(200).json({
        message: "không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.length === 0) {
      return res.status(200).json({
        message: "không có sản phẩm nào",
      });
    }
    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: "xoa thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate({ _id: req.params.id },req.body,{ new: true });
    if (!product) {
      return res.status(400).json({
        message: "sửa khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "sửa thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
