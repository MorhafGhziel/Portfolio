import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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

    // Create email message
    const msg = {
      to: "contact@morhaf.me",
      from: "contact@morhaf.me",
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3B82F6; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #1F2937; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: #E5E7EB;"><strong style="color: #60A5FA;">Name:</strong> ${name}</p>
            <p style="color: #E5E7EB;"><strong style="color: #60A5FA;">Email:</strong> ${email}</p>
            <p style="color: #E5E7EB;"><strong style="color: #60A5FA;">Subject:</strong> ${subject}</p>
            <p style="color: #E5E7EB;"><strong style="color: #60A5FA;">Message:</strong></p>
            <p style="color: #E5E7EB; white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);

      // Send an auto-reply to the person who submitted the form
      const autoReplyMsg = {
        to: email,
        from: "contact@morhaf.me",
        subject: "Thank you for contacting Morhaf Ghziel",
        text: `Dear ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nMorhaf Ghziel`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                             <img src="https://morhaf.me/images/Logo.jpg" alt="Morhaf Ghziel" style="width: 150px; height: 150px; object-fit: cover; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              </div>
              
              <div style="background: linear-gradient(to right, #1F2937, #111827); padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #60A5FA; margin-bottom: 20px; text-align: center;">Thank You for Reaching Out!</h2>
                
               <div style="color: #FFFFFF; line-height: 1.6;">
                  <p style="margin-bottom: 15px;">Dear ${name},</p>
                  
                  <p style="margin-bottom: 15px;">Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                  
                </div>
                
               <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #374151; color: #FFFFFF;">
                  <p style="margin: 0;">Best regards,</p>
                  <p style="margin: 5px 0; color: #60A5FA; font-weight: bold;">Morhaf Ghziel</p>
              </div>
            </div>
          
          </div>
        `,
      };

      await sgMail.send(autoReplyMsg);

      return NextResponse.json(
        {
          message: "Email sent successfully!",
          id: new Date().toISOString(),
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("SendGrid Error:", error);
      if (error.response && typeof error.response === "object") {
        console.error(error.response.body);
      }
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
