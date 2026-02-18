import { useState, useContext } from "react";
import clsx from "clsx";
import axios from "axios";
import "../tailwind.css";
import { AppContext, URL } from "../Context";
function Login() {
	const [isLoginScreen, setisLoginScreen] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setIsLogged } = useContext(AppContext);
	const handleRegister = () => {
		const user = {
			username: username,
			email: email,
			password: password,
		};
		axios
			.post(`${URL}/user/register`, user, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				alert("SUCESSFULLY REGISTERED,CAN LOGIN");
				console.log("res:" + res.data);
				setisLoginScreen(true);
			})
			.catch((err) => {
				(alert("SOME ERROR OCCURED"), console.log("err:" + err));
			});
	};
	const handleLogin = () => {
		const user = {
			username: username,
			password: password,
		};
		axios
			.post(`${URL}/user/login`, user, {
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				alert("SUCESSFUL LOGIN");
				setIsLogged(true);
				console.log("res:" + res.data);
			})
			.catch((err) => {
				(alert("SOME ERROR OCCURED"), console.log("err:" + err));
			});
	};

	return (
		<div className="h-full">
			<div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
						className="mx-auto h-10 w-auto dark:hidden"
					/>
					<img
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
						alt="Your Company"
						className="mx-auto h-10 w-auto not-dark:hidden"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							isLoginScreen ? handleLogin() : handleRegister();
						}}
						className="space-y-6">
						{isLoginScreen ? (
							<></>
						) : (
							<div>
								<label
									htmlFor="email"
									className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										type="email"
										name="email"
										required
										autoComplete="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										className={clsx(
											"block",
											"w-full",
											"px-3 py-1.5",
											"rounded-md",
											"bg-white dark:bg-white/5",
											"dark:placeholder:text-gray-500 dark:text-white placeholder:text-gray-400 sm:text-sm/6 text-base text-gray-900",
											"-outline-offset-1 dark:focus:outline-indigo-500 dark:outline-white/10 focus:-outline-offset-2 focus:outline-2 focus:outline-indigo-600 outline-1 outline-gray-300",
										)}
									/>
								</div>
							</div>
						)}
						<div>
							<label
								htmlFor="username"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									type="string"
									name="username"
									required
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									className={clsx(
										"block",
										"w-full",
										"px-3 py-1.5",
										"rounded-md",
										"bg-white dark:bg-white/5",
										"dark:placeholder:text-gray-500 dark:text-white placeholder:text-gray-400 sm:text-sm/6 text-base text-gray-900",
										"-outline-offset-1 dark:focus:outline-indigo-500 dark:outline-white/10 focus:-outline-offset-2 focus:outline-2 focus:outline-indigo-600 outline-1 outline-gray-300",
									)}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									for="password"
									className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
									Password
								</label>
								<div className="text-sm">
									<a
										href="#"
										className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									type="password"
									name="password"
									required
									autoComplete="current-password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									className={clsx(
										"block",
										"w-full",
										"px-3 py-1.5",
										"rounded-md",
										"bg-white dark:bg-white/5",
										"dark:placeholder:text-gray-500 dark:text-white placeholder:text-gray-400 sm:text-sm/6 text-base text-gray-900",
										"-outline-offset-1 dark:focus:outline-indigo-500 dark:outline-white/10 focus:-outline-offset-2 focus:outline-2 focus:outline-indigo-600 outline-1 outline-gray-300",
									)}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className={clsx(
									"flex justify-center",
									"w-full",
									"px-3 py-1.5",
									"rounded-md",
									"bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 hover:bg-indigo-500",
									"font-semibold text-sm/6 text-white",
									"dark:shadow-none shadow-xs",
									"dark:focus-visible:outline-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2",
								)}>
								{isLoginScreen ? "Sign In" : "Register"}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
						Not a member?
						<button
							onClick={() => {
								setisLoginScreen(!isLoginScreen);
							}}
							className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
							{!isLoginScreen ? "Login" : "Register"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
