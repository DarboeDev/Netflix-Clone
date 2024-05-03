import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";

const auth = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("Login");

  const toggleVariant = () => {
    if (variant == "Login") {
      setVariant("Register");
    } else {
      setVariant("Login");
    }
  };

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log("Logged In");
      router.push("/");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  }, [email, password, router]);

  return (
    <main className="w-full h-full relative bg-background-image bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-30">
        <nav className="px-12 py-5">
          <img src="images/Netflix-Logo.svg" alt="logo" className="h-[100px]" />
        </nav>
        <div className="flex justify-center mt-10">
          <div className="lg:w-2/5 lg:max-w-md rounded-md w-full bg-black px-16 py-16">
            <h1 className="text-white text-4xl mb-8 font-semibold">
              {variant == "Login" ? "Sign In" : "Register"}
            </h1>
            <div className="flex flex-col gap-4">
              {variant != "Login" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <button
                onClick={variant == "Login" ? login : register}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 duration-200 text-lg font-semibold"
              >
                {variant == "Login" ? "Login" : "Sign Up"}
              </button>
              <p className="text-neutral-500 mt-6">
                {variant == "Login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant == "Login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default auth;
