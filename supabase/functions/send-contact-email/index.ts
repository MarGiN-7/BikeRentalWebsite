import { createTransport } from "npm:nodemailer@6.9.9";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: Deno.env.get('SMTP_USERNAME'),
        pass: Deno.env.get('SMTP_PASSWORD'),
      },
    });

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <h3>Message:</h3>
      <p>${formData.message}</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: "Dehradun Bike Rentals <noreply@dehradunbikerentals.com>",
      to: "admin@dehradunbikerentals.com",
      subject: `New Contact: ${formData.subject}`,
      html: emailContent,
    });

    // Send confirmation email to user
    const userEmailContent = `
      <h2>Thank you for contacting Dehradun Bike Rentals!</h2>
      <p>Dear ${formData.name},</p>
      <p>We have received your message and will get back to you shortly.</p>
      <p>Your message details:</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <br>
      <p>Best regards,</p>
      <p>Dehradun Bike Rentals Team</p>
    `;

    await transporter.sendMail({
      from: "Dehradun Bike Rentals <noreply@dehradunbikerentals.com>",
      to: formData.email,
      subject: "We've received your message - Dehradun Bike Rentals",
      html: userEmailContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});