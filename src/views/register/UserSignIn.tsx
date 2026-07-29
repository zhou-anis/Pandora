import { Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import type { RootDispatch, RootState } from "../../store";
import { setToken, type UserRole } from "../../store/reducers/user";

interface IForm {
  phone: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState<IForm>({ phone: "", password: "" });
  const [errors, setErrors] = useState<Partial<IForm>>({});
  const [loading, setLoading] = useState(false);
  const phoneRegex = /^1\d{10}$/;

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors: Partial<IForm> = {};
    if (!form.phone.trim()) newErrors.phone = "手机号不能为空";
    else if (!phoneRegex.test(form.phone)) newErrors.phone = "手机号必须为 11 位数字";
    if (!form.password.trim()) newErrors.password = "密码不能为空";
    else if (form.password.length < 6) newErrors.password = "密码长度至少 6 位";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // 检查是否有离线注册的用户
    const tempUser = localStorage.getItem("temp_user");
    let role: UserRole = "user";
    if (tempUser) {
      try {
        const parsed = JSON.parse(tempUser);
        if (parsed.phone === form.phone && parsed.password === form.password) {
          role = parsed.role || "user";
          dispatch(setToken({
            username: parsed.username,
            token: "mock_token_" + Date.now(),
            refresh_token: "mock_refresh_" + Date.now(),
            role,
            phone: parsed.phone,
            email: parsed.email,
          }));
          message.success(`欢迎回来，${parsed.username}！`);
          setLoading(false);
          navigate("/");
          return;
        }
      } catch { /* ignore parse error */ }
    }

    // 模拟登录（后端不可用时的 fallback）
    setTimeout(() => {
      dispatch(setToken({
        username: "旅行者_" + form.phone.slice(-4),
        token: "mock_token_" + Date.now(),
        refresh_token: "mock_refresh_" + Date.now(),
        role: "user",
        phone: form.phone,
      }));
      message.success("登录成功（离线模式）");
      setLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[url('/register/pexels-tirachard-kumtanom-112571-733853.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/75 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 border border-white/30">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-2 tracking-wide">
          欢迎回来 ✈️
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          登录你的 Pandora 账户，继续探索世界
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 手机号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <Input
              size="large"
              prefix={<UserOutlined className="text-gray-400 mr-2" />}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="请输入手机号"
              maxLength={11}
              className="!rounded-xl"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* 密码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400 mr-2" />}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="请输入密码"
              className="!rounded-xl"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="text-gray-500 cursor-pointer hover:text-blue-500">
              <input type="checkbox" className="mr-1.5" defaultChecked /> 记住我
            </label>
            <span className="text-blue-500 cursor-pointer hover:text-blue-700">忘记密码？</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={classNames(
              "w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base",
              loading ? "opacity-70 cursor-wait" : "hover:from-indigo-500 hover:to-purple-500"
            )}
          >
            {loading ? "登录中..." : "登录"}
          </button>

          <p className="text-center text-sm text-gray-400">
            还没有账户？
            <a href="/signup" className="text-blue-500 hover:text-blue-700 ml-1 font-medium">
              立即注册
            </a>
          </p>
        </form>

        {/* 演示提示 */}
        <div className="mt-6 p-3 bg-blue-50 rounded-xl text-xs text-blue-600 text-center">
          💡 提示：后端未就绪时，任意手机号+密码即可登录（离线模式）
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
