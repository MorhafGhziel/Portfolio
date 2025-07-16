import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Log the form data instead of sending email
    console.log("Form submission:", {
      name,
      email,
      subject,
      message,
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Form submitted successfully!",
        id: new Date().toISOString(), // Using timestamp as ID
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
