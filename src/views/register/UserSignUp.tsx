import {Button, Input, Space} from "antd";
import React, {useState} from "react";
import { RegisterAPI } from "../../apis/user.ts";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";


interface IForm {
    username: string;
    password: string;
    email: string;
    phone: string;
    code: string;
}



const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<IForm>({
        username: "",
        phone: "",
        email: "",
        code: "",
        password: "",
    });

    const [errors, setErrors] = useState<IForm>({
        username: "",
        phone: "",
        email: "",
        code: "",
        password: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1\d{10}$/; // 简单的中国 11 位手机号格式

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
        setErrors({...errors, [field]: ""}); // 清空该字段错误提示
    };

    const validate = () => {
        const newErrors: Partial<IForm> = {};

        if (!form.username.trim()) newErrors.username = "用户名不能为空";

        // 手机号校验（新增完善）
        if (!form.phone.trim()) newErrors.phone = "手机号不能为空";
        else if (!phoneRegex.test(form.phone))
            newErrors.phone = "手机号必须为 11 位数字";

        if (!form.email.trim()) newErrors.email = "邮箱不能为空";
        else if (!emailRegex.test(form.email))
            newErrors.email = "邮箱格式不正确";

        if (!form.code.trim()) newErrors.code = "验证码不能为空";

        if (!form.password.trim()) newErrors.password = "密码不能为空";
        else if (form.password.length < 6 || form.phone.length > 20)
            newErrors.password = "密码长度必须大于 6 位且小于 20 位";


        setErrors({
            username: newErrors.username || "",
            phone: newErrors.phone || "",
            email: newErrors.email || "",
            code: newErrors.code || "",
            password: newErrors.password || "",
        });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("通过校验，表单数据：", form.username);
            const response  = await RegisterAPI({
                ...form,
            })
            if (response.data.success) {
                alert("注册成功！");
                navigate("/signin");
            }
            else {
                alert('注册失败，请重试!')
            }

        }
    };

    return (
        <div className="min-h-screen w-full bg-[url('/register/pexels-tirachard-kumtanom-112571-733853.jpg')] flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-10 border border-white/30">

                <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 tracking-wide">
                    创建你的旅程账户 ✈️
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    加入我们，开始你的下一次冒险。
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* 用户名 */}
                    <div>
                        <label className="block text-white font-medium mb-2">用户名</label>
                        <Input
                            value={form.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            placeholder="请输入用户名"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* 手机号 */}
                    <div>
                        <label className="block text-white font-medium mb-2">手机号</label>
                        <Input
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="请输入手机号"
                            maxLength={11}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* 邮箱 */}
                    <div>
                        <label className="block text-white font-medium mb-2">邮箱</label>
                        <Space.Compact style={{width: "100%"}}>
                            <Input
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="请输入邮箱"
                            />
                            <Button type="primary">发送验证码</Button>
                        </Space.Compact>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* 验证码 */}
                    <div>
                        <label className="block text-white font-medium mb-2">验证码</label>
                        <Input
                            value={form.code}
                            onChange={(e) => handleChange("code", e.target.value)}
                            placeholder="请输入验证码"
                        />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    {/* 密码 */}
                    <div>
                        <label className="block text-white font-medium mb-2">密码</label>
                        <Input.Password
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="请输入密码"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <span><a href="/signin" className={classNames('hover:text-blue-500')}>去登陆</a></span>


                    <button
                        type="submit"
                        className="w-full p-3 mt-2 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                    >
                        注册账户
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
