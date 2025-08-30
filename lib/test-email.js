import { sendNewPostEmail, sendWelcomeEmail } from './email';

// Test function to send a sample new post email
export const testNewPostEmail = async () => {
  const testPost = {
    _id: 'test-post-id',
    title: 'Test Blog Post',
    body: 'This is a test blog post to verify that the email functionality is working correctly. The email should be sent to all subscribers with a beautiful template.',
    content: 'This is a test blog post to verify that the email functionality is working correctly. The email should be sent to all subscribers with a beautiful template.',
    thumbnail: 'https://via.placeholder.com/400x200',
    date: new Date()
  };

  try {
    await sendNewPostEmail(testPost);
    console.log('Test new post email sent successfully!');
  } catch (error) {
    console.error('Failed to send test new post email:', error);
  }
};

// Test function to send a welcome email
export const testWelcomeEmail = async (email) => {
  try {
    await sendWelcomeEmail(email);
    console.log(`Test welcome email sent successfully to ${email}!`);
  } catch (error) {
    console.error('Failed to send test welcome email:', error);
  }
};

// Usage examples:
// testNewPostEmail();
// testWelcomeEmail('test@example.com'); 