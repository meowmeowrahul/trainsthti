import { useState } from "react";
import axios from "axios";
import "../tailwind.css";
const URL = "http://localhost:3000";
function Login() {
	const [isLoginScreen, setisLoginScreen] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				alert("SUCESSFUL LOGIN");
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
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
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
