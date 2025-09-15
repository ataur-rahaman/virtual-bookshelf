import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { createUser, googleLogin } = use(AuthContext);
  const provider = new GoogleAuthProvider();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    const saveToDB = {
      name: name,
      email: email,
      profile_photo: photoURL,
    };
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (passwordRegex.test(password) === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        setUser(result);
        updateProfile(auth.currentUser, profile)
          .then(() => {
            axios.post("http://localhost:3000/users", saveToDB).then((res) => {
              console.log(res.data);
              if (res.data.success) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Profile updated successfully!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Profile updated successfully!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });

            navigate(`${location.state ? location.state : "/"}`, {
              state: { user },
            });
          })
          .catch((error) => {
            navigate("/login");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.message}`,
            });
          });
      })
      .catch((error) => {
        error.message;
        let msg = error.message;
        if (error.code === "auth/email-already-in-use") {
          msg = "That email is already registered. Try logging in.";
        } else if (error.code === "auth/weak-password") {
          msg = "Password should be at least 6 characters.";
        } else if (error.code === "auth/invalid-email") {
          msg = "Please enter a valid email address.";
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${msg}`,
        });
      });
  };

  const handleLoginGoogle = (e) => {
    e.preventDefault();
    googleLogin(provider)
      .then((result) => {
        setUser(result);
        const name = result.user.displayName;
        const email = result.user.email;
        const profile_photo = result.user.photoURL;
        const saveToDB = {
          name,
          email,
          profile_photo,
        };
        axios.post("http://localhost:3000/users", saveToDB).then((res) => {
          if (res.data.success) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Welcome back ${result.user.displayName} !`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Welcome back ${result.user.displayName} !`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

        navigate(`${location.state ? location.state : "/"}`, {
          state: { user },
        });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops...",
            text: "You have closed the login popup window, Please try again",
            showConfirmButton: true,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
          });
        }
      });
  };

  return (
    <>
      <title>Register</title>
      <div className=" mx-auto flex justify-center items-center bg-sky-50 dark:bg-gray-600 py-[100px]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 rounded-2xl shadow-2xl">
          <div className="card-body rounded-2xl">
            <h1 className="text-4xl mb-5 text-center">Register here</h1>
            <form onSubmit={handleRegister}>
              <motion.input
                initial={{ translateY: -1500 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.4,
                  type: "tween",
                  stiffness: 200,
                }}
                type="text"
                name="name"
                className="input mb-2 focus:border-2 focus:border-blue-500 focus:outline-0 focus:shadow-none rounded-4xl w-full"
                placeholder="Name"
                required
              />
              <motion.input
                initial={{ translateY: -1500 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.3,
                  type: "tween",
                  stiffness: 200,
                }}
                type="email"
                name="email"
                className="input mb-2 focus:border-2 focus:border-blue-500 focus:outline-0 focus:shadow-none rounded-4xl w-full"
                placeholder="Email"
                required
              />
              <motion.input
                initial={{ translateY: -1500 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.2,
                  type: "tween",
                  stiffness: 200,
                }}
                type="text"
                name="photoURL"
                className="input mb-2 focus:border-2 focus:border-blue-500 focus:outline-0 focus:shadow-none rounded-4xl w-full"
                placeholder="Photo Url"
                required
              />
              <motion.div
                initial={{ translateY: -1500 }}
                animate={{ translateY: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1,
                  type: "tween",
                  stiffness: 200,
                }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input mb-2 focus:border-2 focus:border-blue-500 focus:outline-0 focus:shadow-none rounded-4xl w-full"
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
              <div>
                <span>
                  Already have an account?{" "}
                  <Link to={"/login"} className="link link-hover text-blue-500">
                    Login
                  </Link>
                </span>
              </div>
              <motion.input
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn mt-4 bg-blue-500 hover:bg-blue-600 text-white border-0 w-full rounded-4xl"
                type="submit"
                value="SignUp"
              />
              <div className="flex flex-col">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
