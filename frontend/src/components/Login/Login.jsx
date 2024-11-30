import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/userActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            if (
                userInfo.role === "assembly point staff" ||
                userInfo.role === "transaction point staff"
            ) {
                navigate("/staff/quan-ly-buu-gui");
            } else if (
                userInfo.role === "gathering point leader" ||
                userInfo.role === "head of transaction point"
            ) {
                navigate("/pointleader/thong-ke-hang");
            } else if (userInfo.role === "admin") {
                navigate("/president/he-thong-diem");
            }
        }
    }, [userInfo, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const handleLogin = dispatch(login(email, password));
        if (handleLogin) {
            navigate("/");
        }
    };
    return (
        <div className="h-screen flex justify-center ">
            <div
                className="hidden lg:flex w-full lg:w-1/2 bg-cover bg-[url('https://images.pexels.com/photos/1556991/pexels-photo-1556991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
         justify-around items-center "
            >
                <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                    <h1 className="text-[#f7941e] font-bold text-4xl font-sans">
                        MagicPost
                    </h1>
                    <p className="text-white mt-1">Welcome to my app!!!</p>
                    <div className="flex justify-center lg:justify-start mt-6">
                        <Link
                            to="/"
                            className="hover:bg-[#0072bc] hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-[#0072bc] mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                        >
                            Go to app
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                <div className="w-full px-8 md:px-32 lg:px-24">
                    <form
                        className="bg-white rounded-md shadow-2xl p-5"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
                            Login
                        </h1>
                        <p className="text-sm font-normal text-gray-600 mb-8 text-center">
                            Please login to your account!
                        </p>
                        {error && (
                            <Message variant="alert-danger">{error}</Message>
                        )}
                        {loading && <Loading />}
                        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            <input
                                id="email"
                                className=" pl-2 w-full outline-none border-none "
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center border-2 mb-4 py-2 px-3 relative rounded-2xl outline-none ring-blue-500 border-blue-300 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                className="pl-2 w-full outline-none border-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type={visible ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                required
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {visible ? (
                                <AiOutlineEye
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                        <div className={`items-center justify-between `}>
                            <div className={`items-center flex ml-1`}>
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="block w-full hover:bg-[#f7941e] mt-5 py-2 rounded-2xl bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                        >
                            Login
                        </button>
                        <div class="flex justify-between mt-4">
                            <a
                                href="forgot-password"
                                class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                            >
                                Forgot Password ?
                            </a>

                            <Link
                                to="/sign-up"
                                class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                            >
                                Don't have an account yet?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
