import { useContext, useMemo, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { AppContext } from "../Context";
import { URL } from "../config";

const isValidEmail = (value) => /.+@.+\..+/.test(value);

function Login() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLogged } = useContext(AppContext);

  const content = useMemo(
    () => ({
      title: isLoginScreen ? "Sign in" : "Register",
      description: isLoginScreen ? "Access dashboard." : "Create account.",
    }),
    [isLoginScreen],
  );

  const validate = () => {
    const nextErrors = {};

    if (!username.trim()) nextErrors.username = "Username is required.";
    if (!password.trim()) nextErrors.password = "Password is required.";
    if (!isLoginScreen) {
      if (!email.trim()) nextErrors.email = "Email is required.";
      else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email.";
      if (password.trim() && password.length < 6)
        nextErrors.password = "Use at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleServerError = (error) => {
    if (!error?.response) return "Network error. Try again.";
    if (error.response.status === 401) return "Invalid username or password.";
    if (error.response.status === 409) return "Account already exists.";
    if (error.response.status === 400) return "Check form values.";
    return error.response.data?.error || "Request failed.";
  };

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${URL}/user/register`,
        { username, email, password },
        { headers: { "Content-Type": "application/json" } },
      );
      setStatusMessage("Account created.");
      setIsLoginScreen(true);
      resetFields();
      setErrors({});
    } catch (error) {
      setStatusMessage(handleServerError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${URL}/user/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" } },
      );
      setStatusMessage("Login successful.");
      setErrors({});
      setIsLogged(true);
    } catch (error) {
      setStatusMessage(handleServerError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--app-bg)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1fr_0.9fr]">
        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="max-w-xl">
            <div className="ui-card inline-flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium">
              <img
                src="/trainsthti-logo.png"
                alt="Trainsthti"
                className="h-5 w-5"
              />
              Trainsthti
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Live dashboard
            </h1>
            <p
              className="mt-3 max-w-lg text-base leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Sign in to continue.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {content.title}
                </h2>
              </div>
            </div>

            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {content.description}
            </p>

            <div aria-live="polite" className="mt-5 min-h-6 text-sm">
              {statusMessage}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!validate()) return;
                isLoginScreen ? handleLogin() : handleRegister();
              }}
              className="mt-4 space-y-4"
            >
              {!isLoginScreen ? (
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(Boolean(errors.email))}
                  />
                  {errors.email ? (
                    <p
                      id="email-error"
                      className="mt-2 text-sm"
                      style={{ color: "var(--danger)" }}
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={
                    errors.username ? "username-error" : undefined
                  }
                  className={inputClass(Boolean(errors.username))}
                />
                {errors.username ? (
                  <p
                    id="username-error"
                    className="mt-2 text-sm"
                    style={{ color: "var(--danger)" }}
                  >
                    {errors.username}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete={
                    isLoginScreen ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "password-error password-help"
                      : "password-help"
                  }
                  className={inputClass(Boolean(errors.password))}
                />
                <p
                  id="password-help"
                  className="mt-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Password recovery is not available yet.
                </p>
                {errors.password ? (
                  <p
                    id="password-error"
                    className="mt-2 text-sm"
                    style={{ color: "var(--danger)" }}
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "ui-button flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {isSubmitting
                  ? "Working…"
                  : isLoginScreen
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>

            <p
              className="mt-5 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {isLoginScreen ? "Need an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLoginScreen((value) => !value);
                  setErrors({});
                  setStatusMessage("");
                }}
                className="font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {isLoginScreen ? "Register" : "Login"}
              </button>
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}

const inputClass = (hasError) =>
  clsx(
    "w-full rounded-lg border px-4 py-3",
    hasError ? "border-[var(--danger)]" : "border-[var(--border-subtle)]",
    "bg-[var(--surface-strong)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
    "focus-visible:outline",
  );

const Card = ({ children }) => (
  <div className="ui-card w-full max-w-md p-6 sm:p-8">{children}</div>
);

export default Login;
