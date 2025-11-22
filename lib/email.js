import nodemailer from 'nodemailer';
import { Subscriber } from './models/Subscriber.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  });
};

// TABLE-BASED Email template for new blog post with inline styles and unsubscribe link
const createEmailTemplate = (post, subscriberEmail) => {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;
  return `
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Blog Post: ${post.title}</title>
</head>
<body style="margin:0; padding:0; background:#fff; font-family: Arial, sans-serif; color:#111;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff; padding:0; margin:0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff; border-radius:10px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#000; color:#fff; padding:32px 32px 16px 32px; text-align:center; border-bottom:1px solid #eee;">
              <h1 style="margin:0; font-size:1.7rem; font-weight:700; letter-spacing:0.02em;">New Blog Post</h1>
              <p style="margin:0; font-size:1.1rem; opacity:0.82;">Stay updated with our latest content</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px 28px 24px 28px; background:#fff;">
              <h2 style="margin:0 0 13px 0; font-weight:700; font-size:1.33rem; letter-spacing:0.02em; line-height:1.23; color:#000;">${post.title}</h2>
              <p style="margin:0 0 18px 0; font-style:italic; opacity:0.77; font-size:1.05rem; color:#232323; white-space:pre-line;">${post.body}</p>
              
              <a
                href="${process.env.NEXT_PUBLIC_SITE_URL}/article/${post.slug || post._id}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display:inline-block;
                  border:1.5px solid #000;
                  background:#fff;
                  color:#000 !important;
                  padding:14px 35px;
                  font-weight:500;
                  font-size:1rem;
                  border-radius:5px;
                  text-align:center;
                  text-decoration:none;
                  margin-top:26px;
                  margin-bottom:5px;
                  letter-spacing:0.01em;
                  transition:background 0.2s, color 0.2s;
                  font-family: Arial, sans-serif;
                ">
                Read Full Post →
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#fff; text-align:center; padding:24px 18px 14px 18px; color:#544; font-size:0.98rem; border-top:1px solid #eee;">
              <p style="margin:0;">Thanks for subscribing to our newsletter!</p>
              <a href="${unsubscribeUrl}" target="_blank" rel="noopener noreferrer" 
                 style="display:inline-block; margin-top:10px; color:#000; text-decoration:underline; font-size:0.97rem; opacity:.55;">
                Unsubscribe
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

// Send email to all subscribers
export const sendNewPostEmail = async (post) => {
  try {
    const transporter = createTransporter();

    // Get all subscribers
    const subscribers = await Subscriber.find({});

    if (subscribers.length === 0) {
      console.log('No subscribers found');
      return;
    }

    // Send personalized email to each subscriber with unsubscribe link
    const emailPromises = subscribers.map(subscriber => {
      const emailTemplate = createEmailTemplate(post, subscriber.email);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: `New Blog Post: ${post.title}`,
        html: emailTemplate,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log(`Email sent to ${subscribers.length} subscribers`);

  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
};

// Send welcome email to new subscriber with matching minimal black & white style
export const sendWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const welcomeTemplate = `
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to BLOGGITE!</title>
</head>
<body style="margin:0; padding:0; background:#fff; font-family: Arial, sans-serif; color:#111;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff; padding:0; margin:0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff; border-radius:10px; overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#000; color:#fff; padding:32px 32px 16px 32px; text-align:center; border-bottom:1px solid #eee;">
              <h1 style="margin:0; font-size:1.8rem; font-weight:700; letter-spacing:0.02em;">🎉 Welcome to BLOGGITE!</h1>
              <p style="margin:0; font-size:1.06rem; opacity:0.82;">Your journey into amazing content starts here</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px 28px 28px 28px; background:#fff; color:#222; font-weight:400; font-size:1.05rem; line-height:1.58; font-family: Arial, sans-serif;">
              <h2 style="font-weight:700; margin-top:0; margin-bottom:15px; font-size:1.3rem; color:#000;">Hey there! 👋</h2>
              <p style="margin:0 0 20px 0;">I'm absolutely thrilled that you've decided to join our little corner of the internet! You're now part of an awesome community of curious minds and knowledge seekers.</p>
              <p style="margin:0 0 20px 0;">Here's what you can expect from me:</p>
              <ul style="padding-left:20px; color:#3b3b3b; font-weight:500; font-size:1rem; margin:0 0 20px 0;">
                <li style="margin-bottom:8px;">📚 Fresh insights and learnings from my journey</li>
                <li style="margin-bottom:8px;">💡 Practical tips and tricks I discover along the way</li>
                <li style="margin-bottom:8px;">🚀 Stories that inspire and motivate</li>
                <li style="margin-bottom:8px;">🎯 Content that actually adds value to your life</li>
              </ul>
              <p style="margin:0 0 20px 0;">I promise to keep things real, helpful, and genuinely interesting. No fluff, just good stuff!</p>
              <p style="margin:0 0 20px 0;">Ready to dive in? Your first update is just around the corner! 🚀</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#fff; text-align:center; padding:20px 28px 18px 28px; color:#888; font-size:0.98rem; letter-spacing:0.01em; border-top:1px solid #eee; border-radius: 0 0 10px 10px; font-weight:400; font-family: Arial, sans-serif;">
              <p style="margin:0;">Happy reading! 📖</p>
              <p style="font-weight:700; color:#000; margin:12px 0 0 0; font-size:1.05rem;">— Aashish@BLOGGITE</p>
              <p style="font-size:0.85rem; margin-top:8px; color:#aaa;">P.S. Feel free to reply to this email if you have any questions or just want to say hi! 😊</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Our Blog Newsletter!',
      html: welcomeTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};
