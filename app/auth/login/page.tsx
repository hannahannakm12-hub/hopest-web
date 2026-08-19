"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";


export default function LoginPage() {


  const router = useRouter();

  const searchParams = useSearchParams();



  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);




  useEffect(() => {


    const paramUsername = searchParams.get("username");


    if (paramUsername) {

      setUsername(paramUsername);

    }


  }, [searchParams]);







  const handleLogin = async (

    e: React.FormEvent<HTMLFormElement>

  ) => {


    e.preventDefault();


    setError("");



    try {



      const res = await fetch("/api/login", {


        method: "POST",


        headers: {


          "Content-Type": "application/json"


        },



        body: JSON.stringify({


          username,

          password


        })



      });






      const data = await res.json();




      console.log(
        "LOGIN RESPONSE:",
        data
      );







      if (data.loginStatus === true) {





        localStorage.setItem(


          "user",


          JSON.stringify(data.userInfo)


        );





        console.log("Redirecting to dashboard...");
        localStorage.setItem("user", JSON.stringify(data.userInfo));

console.log("Saved User =", localStorage.getItem("user"));

router.push("/dashboard");





      }

      else {





        setError(

          data.message ||
          "Wrong username or password"

        );





      }







    }

    catch (error) {



      console.log(error);



      setError(

        "Server error. Please try again."

      );



    }




  };









  return (

    <div className="min-h-screen flex flex-col justify-between animated-gradient">


      <div className="text-center pt-20 animate-modern">


        <h1 className="text-5xl font-serif text-[#d89b52]">

          Hello Login!

        </h1>


      </div>





      <div className="flex justify-center items-center px-6">


        <div className="w-full max-w-md bg-[#f4efe9] rounded-3xl p-10 shadow-2xl animate-modern animate-float">


          <form

            onSubmit={handleLogin}

            className="space-y-8"

          >







            <div className="relative">


              <label className="block text-sm font-semibold text-[#3b2a21] mb-2">

                USERNAME

              </label>





              <input


                type="text"


                placeholder="Enter your username"


                value={username}



                onChange={(e) =>
                  setUsername(e.target.value)
                }



                required



                className={`w-full bg-transparent border-b outline-none py-2 pr-8 transition

          ${error

                    ? "border-red-500"

                    :

                    "border-[#c9bfb6] focus:border-[#6b3f23]"

                  }`}



              />





              <User

                className="absolute right-0 bottom-3 text-[#6b3f23]"

                size={18}

              />



            </div>









            <div className="relative">


              <label className="block text-sm font-semibold text-[#3b2a21] mb-2">

                PASSWORD

              </label>





              <input



                type={

                  showPassword

                    ?

                    "text"

                    :

                    "password"

                }



                placeholder="Enter your password"



                value={password}




                onChange={(e) => {


                  setPassword(e.target.value);

                  setError("");

                }}




                required




                className={`w-full bg-transparent border-b outline-none py-2 pr-16 transition

          ${error

                    ?

                    "border-red-500"

                    :

                    "border-[#c9bfb6] focus:border-[#6b3f23]"

                  }`}




              />







              <button


                type="button"


                onClick={() =>

                  setShowPassword(!showPassword)

                }



                className="absolute right-0 bottom-3 text-[#6b3f23] text-sm"



              >



                {

                  showPassword

                    ?

                    "Hide"

                    :

                    "Show"

                }



              </button>




            </div>









            {

              error &&


              (

                <p className="text-red-600 text-sm">


                  {error}


                </p>


              )

            }









            <button


              type="submit"



              className="w-full mt-4 py-3 rounded-xl text-white font-medium shimmer-button hover:opacity-90 transition"



            >


              Login



            </button>








            <p className="text-center text-sm text-[#6b3f23]">


              <span


                onClick={() =>

                  router.push("/auth/forgot-password")

                }


                className="cursor-pointer hover:underline"


              >


                Forgot Password?


              </span>


            </p>









            <p className="text-center text-sm text-[#6b3f23] mt-4">


              Don't have an account?{" "}





              <span


                onClick={() =>

                  router.push("/auth/register")

                }



                className="font-semibold cursor-pointer hover:underline"



              >


                Register


              </span>




            </p>





          </form>



        </div>


      </div>







      <footer className="text-center text-xs text-[#c9bfb6] pb-6 animate-modern">


        © 2025 HOPEST - hope for the best


      </footer>





    </div>

  );


}