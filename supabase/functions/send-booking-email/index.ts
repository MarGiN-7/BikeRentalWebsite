import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import nodemailer from 'npm:nodemailer@6.9.9';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailData {
  to: string;
  subject: string;
  bookingDetails: {
    bikeName: string;
    startDate: string;
    endDate: string;
    plan: string;
    totalAmount: number;
    tax: number;
    finalAmount: number;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, bookingDetails } = await req.json() as EmailData;

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: Deno.env.get('SMTP_USERNAME'),
        pass: Deno.env.get('SMTP_PASSWORD'),
      },
    });

    const emailContent = `
      <h2>Booking Confirmation</h2>
      <p>Thank you for booking with Dehradun Bike Rentals!</p>
      
      <h3>Booking Details:</h3>
      <ul>
        <li>Bike: ${bookingDetails.bikeName}</li>
        <li>Start Date: ${bookingDetails.startDate}</li>
        <li>End Date: ${bookingDetails.endDate}</li>
        <li>Plan: ${bookingDetails.plan}</li>
      </ul>
      
      <h3>Payment Details:</h3>
      <ul>
        <li>Base Amount: ₹${bookingDetails.totalAmount}</li>
        <li>GST (8%): ₹${bookingDetails.tax}</li>
        <li>Final Amount: ₹${bookingDetails.finalAmount}</li>
      </ul>
      
      <p>For any queries, please contact our support at +91-9520226668</p>
    `;

    await transporter.sendMail({
      from: "Dehradun Bike Rentals <noreply@dehradunbikerentals.com>",
      to: to,
      subject: subject,
      html: emailContent,
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