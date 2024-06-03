"use client";

import { handleRegister } from "@/utils/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, formAction] = useFormState(handleRegister, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <div className="absolute top-1/4 left-5 right-5 md:left-36 md:right-36 lg:left-60 lg:right-60 border-2 bg-white overflow-auto outline-none p-3 z-50">
      <div className="h-full flex flex-col">
        <div className="flex flex-1 justify-center items-center px-3 pb-2 border-b">
          <h1 className="font-bold text-xl">REGISTER</h1>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-5 justify-between flex-2 mt-5 h-full"
        >
          {/* input nama */}
          <div>
            <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
              <label htmlFor="nama" className={`text-sm md:text-xl text-right font-semibold w-36 `}>
                Nama:
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                required
                className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
              />
            </div>
          </div>

          {/* input username */}
          <div>
            <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
              <label
                htmlFor="username"
                className={`text-sm md:text-xl text-right font-semibold w-36 `}
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
              />
            </div>
          </div>

          {/* input email */}
          <div>
            <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
              <label
                htmlFor="email"
                className={`text-sm md:text-xl text-right font-semibold w-36 `}
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
              />
            </div>
          </div>

          {/* input password */}
          <div>
            <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
              <label
                htmlFor="password"
                className={`text-sm md:text-xl text-right font-semibold w-36 `}
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
              />
            </div>
          </div>

          <div className="flex justify-between items-center border-t mt-3 pt-2">
            <p className="text-red-500">{state?.error}</p>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-md cursor-pointer">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
