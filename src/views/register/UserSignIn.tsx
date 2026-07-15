import {Input} from "antd";
import React, {useState} from "react";
import {signInRequest} from "../../store/reducers/user.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootDispatch, RootState} from "../../store";


interface IForm {
    password: string;
    phone: string;
}



const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<RootDispatch>();
    const {username, token, refresh_token} = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [form, setForm] = useState<IForm>({
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState<IForm>({
        phone: "",
        password: "",
    });

    const phoneRegex = /^1\d{10}$/; // 简单的中国 11 位手机号格式

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
        setErrors({...errors, [field]: ""}); // 清空该字段错误提示
    };

    const validate = () => {
        const newErrors: Partial<IForm> = {};


        // 手机号校验（新增完善）
        if (!form.phone.trim()) newErrors.phone = "手机号不能为空";
        else if (!phoneRegex.test(form.phone))
            newErrors.phone = "手机号必须为 11 位数字";


        if (!form.password.trim()) newErrors.password = "密码不能为空";
        else if (form.password.length < 6 || form.phone.length > 20)
            newErrors.password = "密码长度必须大于 6 位且小于 20 位";


        setErrors({
            phone: newErrors.phone || "",
            password: newErrors.password || "",
        });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("通过校验，表单数据：", form.phone);
            await dispatch(signInRequest(form))
            if (username) {
                console.log(username);
                console.log(token);
                console.log(refresh_token);
                alert("登陆成功！");
                navigate("/");
            }
            else {
                alert('登陆失败，请重试!')
            }

        }
    };

    return (
        <div className="min-h-screen w-full bg-[url('/register/pexels-tirachard-kumtanom-112571-733853.jpg')] bg-contain flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-10 border border-white/30">

                <h1 className="text-3xl font-bold text-blue-700 text-center mb-6 tracking-wide">
                    创建你的旅程账户 ✈️
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    加入我们，开始你的下一次冒险。
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>

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



                    <button
                        type="submit"
                        className="w-full p-3 mt-2 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                    >
                        登陆
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
