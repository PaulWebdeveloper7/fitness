import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import User from "@/models/User"; // Import User model for database interactions
import { connectToDB } from "@/utils/database"; // Import database connection function

// Define the POST request handler
export const POST = async (request: Request) => {
  try {
    // Parse the JSON body from the request
    const { fullname, phoneNumber, email, password, role } =
      await request.json();

    // Connect to the database
    await connectToDB();

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Return a response indicating the user already exists
      return new Response(
        JSON.stringify({ message: "User with this email already exists." }),
        {
          status: 409, // Conflict status code
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Generate a secure salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      fullName: fullname,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      role: role, // Assuming 'userType' maps to 'role' in the model
    });

    // Save the new user to the database
    await newUser.save();

    // Return a response with the newly created user
    return new Response(JSON.stringify(newUser), {
      status: 201, // Created status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log(error.name);
    console.log(error.message);
    if (error.name === "ValidationError") {
      return new Response(
        JSON.stringify({
          message: ` ${error.message}`,
          name:`${error.name}`
        }),      
          { status: 403 }
      );
    } else {
      return new Response(JSON.stringify({
        message: `Failed to create new user due to validation error: ${error.message}`,
        name:`${error.name}`
      }),{ status: 500 });
    }
  }
};
export const GET = async ({params}:any ,request:Request) => {
  try {
    await connectToDB();
    const {phoneNumber } = await request.json()
    const user = await User.find({phoneNumber: phoneNumber});
    if(!user){
      return new Response(JSON.stringify({message:"User not found"}),{status:404})
      // return  Response.status(404).json({
      // message:"User not found"
      // })
    }
    console.log(user)
    return new Response(JSON.stringify(user),{status:200})
   
   
  } catch (error:any) {
    return new Response(JSON.stringify({message:`${error}`}),{status:500})
  

  }
}