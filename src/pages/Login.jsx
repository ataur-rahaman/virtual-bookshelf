import { GoogleAuthProvider } from "firebase/auth";
import React, { use, useState } from "react";
import { motion, spring } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const LogIn = () => {
  const { logInUser, googleLogin } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setErrorMsg(null);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (passwordRegex.test(password) === false) {
      setErrorMsg(
        "❌ Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    logInUser(email, password)
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back ${result.user.displayName} !`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode;

        if (errorCode === "auth/invalid-credential") {
          setErrorMsg("⚠️ Please enter a valid email address or password.");
        } else if (errorCode === "auth/user-not-found") {
          setErrorMsg("⚠️ No account found with this email.");
        } else if (errorCode === "auth/wrong-password") {
          setErrorMsg("⚠️ Incorrect password. Try again.");
        } else if (errorCode === "auth/too-many-requests") {
          setErrorMsg("⚠️ Too many failed attempts. Please try later.");
        } else {
          setErrorMsg("⚠️ Something went wrong. Please try again.");
        }
      });
  };
  const handleLoginGoogle = (e) => {
    e.preventDefault();
    googleLogin(provider)
      .then((result) => {
        setUser(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome back ${result.user.displayName} !`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`, {
          state: { user },
        });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setErrorMsg(
            "You have closed the login popup window, Please try again"
          );
        } else {
          setErrorMsg(error.message);
        }
      });
  };

  return (
    <>
      <title>Login</title>
      <div className=" mx-auto flex justify-center items-center bg-sky-50 dark:bg-gray-600 py-[100px] px-2">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 rounded-2xl shadow-2xl">
          <div className="card-body rounded-2xl">
            <h1 className="text-4xl mb-5 text-center">Login here</h1>
            <form onSubmit={handleLogin}>
              <motion.input
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, type: spring, stiffness: 200 }}
                type="email"
                name="email"
                className="input mb-2 w-full focus:border-2 focus:border-[#0EA5E9] focus:outline-0 focus:shadow-none rounded-4xl"
                placeholder="Email"
                id="email"
                required
              />
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, type: spring, stiffness: 200 }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input mb-2 w-full focus:border-2 focus:border-[#0EA5E9] focus:outline-0 focus:shadow-none rounded-4xl"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs absolute rounded-full p-2 right-7 top-2 border-2 z-10"
                >
                  {showPassword ? "❌" : "👀"}
                </button>
              </motion.div>

              {errorMsg ? (
                <div className="text-red-500 p-3">{errorMsg}</div>
              ) : (
                ""
              )}

              <div>
                <span>
                  Don't have any account?{" "}
                  <Link
                    state={location.state}
                    to={"/register"}
                    className="link link-hover text-blue-500"
                  >
                    Sign up
                  </Link>
                </span>
              </div>

              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, type: spring, stiffness: 200 }}
                className="flex flex-col"
              >
                <input
                  className="btn mt-4 bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-4xl"
                  type="submit"
                  value="Login"
                />
                <button
                  onClick={handleLoginGoogle}
                  className="btn bg-white text-black border-[#e5e5e5] mt-5 rounded-4xl"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
