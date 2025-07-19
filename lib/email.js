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

// Email template for new blog post
const createEmailTemplate = (post) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Post: ${post.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .post-title {
          color: #2c3e50;
          font-size: 24px;
          margin-bottom: 15px;
        }
        .post-excerpt {
          color: #555;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .cta-button {
          display: inline-block;
          background: #3498db;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #777;
          font-size: 14px;
        }
        .unsubscribe {
          color: #e74c3c;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📝 New Blog Post Published!</h1>
        <p>Stay updated with our latest content</p>
      </div>
      
      <div class="content">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-excerpt">${post.body ? post.body.substring(0, 200) + '...' : post.content.substring(0, 200) + '...'}</p>
        
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/explore/${post._id}" class="cta-button">
          Read Full Post →
        </a>
      </div>
      
      <div class="footer">
        <p>Thanks for subscribing to our newsletter!</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe" class="unsubscribe">
            Unsubscribe
          </a>
        </p>
      </div>
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

    const emailTemplate = createEmailTemplate(post);
    
    // Send email to each subscriber
    const emailPromises = subscribers.map(subscriber => {
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

// Send welcome email to new subscriber
export const sendWelcomeEmail = async (email) => {
  try {
    const transporter = createTransporter();
    
    const welcomeTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to BLOGGITE!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 14px;
          }
          .signature {
            font-weight: bold;
            color: #667eea;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Welcome to BLOGGITE!</h1>
          <p>Your journey into amazing content starts here</p>
        </div>
        
        <div class="content">
          <h2>Hey there! 👋</h2>
          <p>I'm absolutely thrilled that you've decided to join our little corner of the internet! You're now part of an awesome community of curious minds and knowledge seekers.</p>
          
          <p>Here's what you can expect from me:</p>
          <ul>
            <li>📚 Fresh insights and learnings from my journey</li>
            <li>💡 Practical tips and tricks I discover along the way</li>
            <li>🚀 Stories that inspire and motivate</li>
            <li>🎯 Content that actually adds value to your life</li>
          </ul>
          
          <p>I promise to keep things real, helpful, and genuinely interesting. No fluff, just good stuff!</p>
          
          <p>Ready to dive in? Your first update is just around the corner! 🚀</p>
        </div>
        
        <div class="footer">
          <p>Happy reading! 📖</p>
          <p class="signature">— Aashish@BLOGGITE</p>
          <p style="font-size: 12px; margin-top: 10px;">P.S. Feel free to reply to this email if you have any questions or just want to say hi! 😊</p>
        </div>
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