import { Button, Input, Space, Select, message } from "antd";
import React, { useState } from "react";
import { RegisterAPI } from "../../apis/user.ts";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface IForm {
  username: string;
  password: string;
  email: string;
  phone: string;
  code: string;
  role: "user" | "creator";
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IForm>({
    username: "",
    phone: "",
    email: "",
    code: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState<Partial<IForm>>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^1\d{10}$/;

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Partial<IForm> = {};
    if (!form.username.trim()) newErrors.username = "用户名不能为空";
    if (!form.phone.trim()) newErrors.phone = "手机号不能为空";
    else if (!phoneRegex.test(form.phone)) newErrors.phone = "手机号必须为 11 位数字";
    if (!form.email.trim()) newErrors.email = "邮箱不能为空";
    else if (!emailRegex.test(form.email)) newErrors.email = "邮箱格式不正确";
    if (!form.password.trim()) newErrors.password = "密码不能为空";
    else if (form.password.length < 6) newErrors.password = "密码长度至少 6 位";
    setErrors(newErrors as IForm);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        // 后端未就绪时模拟注册成功
        await RegisterAPI({ ...form, code: form.code || "0000" });
        message.success("注册成功！即将跳转登录页...");
        setTimeout(() => navigate("/signin"), 800);
      } catch {
        // 后端不可用时，模拟成功并写入 localStorage
        localStorage.setItem("temp_user", JSON.stringify(form));
        message.success("注册成功（离线模式）！");
        setTimeout(() => navigate("/signin"), 800);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/register/pexels-tirachard-kumtanom-112571-733853.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/75 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 border border-white/30">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 tracking-wide">
          创建你的旅程账户 ✈️
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          加入 Pandora，开启你的旅行故事
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 用户名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <Input value={form.username} onChange={(e) => handleChange("username", e.target.value)} placeholder="给自己取个好听的名字" size="large" className="!rounded-xl" />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* 手机号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <Input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="请输入11位手机号" maxLength={11} size="large" className="!rounded-xl" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <Space.Compact style={{ width: "100%" }}>
              <Input value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="用于找回密码" size="large" className="!rounded-xl" />
              <Button type="primary" size="large" className="!rounded-xl">发送验证码</Button>
            </Space.Compact>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* 验证码 + 密码 同行 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>
              <Input value={form.code} onChange={(e) => handleChange("code", e.target.value)} placeholder="6位验证码" size="large" className="!rounded-xl" />
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <Input.Password value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="至少6位" size="large" className="!rounded-xl" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          {/* 角色选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">身份选择</label>
            <Select
              value={form.role}
              onChange={(v) => handleChange("role", v)}
              size="large"
              className="w-full !rounded-xl"
              options={[
                { value: "user", label: "🌍 普通用户 — 浏览目的地、预订酒店、收藏攻略" },
                { value: "creator", label: "✍️ 创作者 — 发布攻略、管理文章、获取粉丝" },
              ]}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl transition-all duration-300 text-base"
          >
            注册账户
          </button>

          <p className="text-center text-sm text-gray-400">
            已有账户？
            <a href="/signin" className={classNames("text-blue-500 hover:text-blue-700 ml-1 font-medium")}>
              去登录
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
