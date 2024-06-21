import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import User from '@/models/User'; // Import User model for database interactions
import { connectToDB } from '@/utils/database'; // Import database connection function

// Define the POST request handler
export const POST = async (request: Request) => {
    try {
        // Parse the JSON body from the request
        const { fullname, phoneno, email, password, role } = await request.json();

        // Connect to the database
        await connectToDB();

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Return a response indicating the user already exists
            return new Response(JSON.stringify({ message: "User with this email already exists." }), {
                status: 409, // Conflict status code
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // Generate a secure salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            email: email,
            fullName: fullname,
            password: hashedPassword,
            phoneNumber: phoneno,
            role: role, // Assuming 'userType' maps to 'role' in the model
        });

        // Save the new user to the database
        await newUser.save();

        // Return a response with the newly created user
        return new Response(JSON.stringify(newUser), {
            status: 201, // Created status code
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error creating a new user:", error);
       if(error.name === 'ValidationError'){
        alert(error)
        return new Response(JSON.stringify({ error }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: 'Failed to create a new user' }), { status: 500 });

    }
}
