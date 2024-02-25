import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { API_BASE_URL } from "../config";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email syntax
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }

    fetch(`${API_BASE_URL}/api/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/events");
        }
      });
  };

  return (
    <>
      <div className="m-32 flex justify-content-center">
        <div>
          <img src="./iphone.png" className="h-[40rem]" alt="" />
        </div>
        <div className="-ml-32 w-96">
          <div className=" p-6 pt-1 border-2 mt-10 rounded-none ">
            <h1 className="font-Danc text-4xl italic text-gray-700 text-center mt-3 ">
              Campus Collab
            </h1>
            <div className="mt-10 ">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="mt-2 w-5/6 bg-gray-100 border-1 p-2 rounded-md"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  className="mt-2 w-5/6 bg-gray-100 border-1 p-2 rounded-md"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div>
                <button
                  className="mt-4 mb-10 w-5/6 bg-sky-300 text-white  p-2 rounded-md"
                  type="submit"
                  onClick={() => {
                    postData();
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 pt-3 border-2 mt-4 rounded-none ">
            Don't have an account?
            <Link to="/signup">
              <span className=" text-decoration-none"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
