import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {


    const { username, password } = await req.json();


    console.log("NEXT DATA:", {
      username,
      password
    });



    const response = await fetch(
      "http://hopest.in/hopestphp/logincheck.php",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          fullname: username.trim(),

          mailid: password.trim(),

        })

      }
    );



    const text = await response.text();


    console.log("PHP RAW:", text);



    let result;


    try {

      result = JSON.parse(text);

    }

    catch(e){

      return NextResponse.json({

        loginStatus:false,

        message:"Invalid PHP response",

        raw:text

      });

    }



    return NextResponse.json(result);



  }

  catch(error){


    console.log(error);


    return NextResponse.json({

      loginStatus:false,

      message:"Server error"

    });


  }

}