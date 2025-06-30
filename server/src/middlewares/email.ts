import transporter from '../config/nodemailer';
import { IUser } from '../models/User';

export const sendWelcomeEmail = async (user: IUser) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Welcome to Edity',
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Edity</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #2563eb 0%, #4a90e2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Welcome to Edity</h1>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="padding: 40px 30px; line-height: 1.6; color: #374151;">
                        <p style="font-size: 18px; margin: 0 0 24px 0; color: #111827;">Dear ${user.name},</p>
                        
                        <p style="margin: 0 0 24px 0; font-size: 16px;">We are pleased to inform you that your account has been successfully created and your request for <strong>${user.role}</strong> access has been approved.</p>
                        
                        <p style="margin: 0 0 32px 0; font-size: 16px;">You now have access to all the tools and resources available to ${user.role}s on our platform. We're excited to have you join our community of educators and learners.</p>
                        
                        <!-- Call to Action -->
                        <div style="text-align: center; margin: 40px 0;">
                            <div style="background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 24px; margin: 24px 0;">
                                <p style="margin: 0; font-size: 16px; color: #175cd3; font-weight: 500;">
                                    🎉 Your ${user.role} dashboard is now ready for you to explore
                                </p>
                            </div>
                        </div>
                        
                        <!-- Next Steps -->
                        <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 32px 0;">
                            <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px;">Getting Started</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #6b7280;">
                                <li style="margin-bottom: 8px;">Log in to your account to access your personalized dashboard</li>
                                <li style="margin-bottom: 8px;">Explore the tools and features available to ${user.role}s</li>
                                <li style="margin-bottom: 8px;">Check out our help center for tutorials and guides</li>
                            </ul>
                        </div>
                        
                        <p style="margin: 32px 0 0 0; font-size: 16px;">If you have any questions or need assistance getting started, please don't hesitate to reach out to our support team.</p>
                        
                        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; font-size: 16px;">Best regards,</p>
                            <p style="margin: 8px 0 0 0; font-weight: 600; color: #175cd3; font-size: 16px;">The Edity Team</p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                            This is an automated message. Please do not reply to this email.<br>
                            If you need assistance, please contact our support team.
                        </p>
                    </div>
                    
                </div>
            </body>
            </html>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:');
  } catch (error) {
    console.log(error);
    throw new Error('Error sending welcome email');
  }
};

export const sendOtpEmail = async (user: IUser, code: string) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset',
      html: `
           <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Your Password - Edity</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #256ff1 0%, #4a90e2 100%); padding: 40px 30px; text-align: center;">
                      <div style="margin-bottom: 16px;">
                          <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; padding: 16px;">
                              <div style="width: 32px; height: 32px; border: 3px solid white; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
                          </div>
                      </div>
                      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Password Reset Request</h1>
                  </div>
                  
                  <!-- Main Content -->
                  <div style="padding: 40px 30px; line-height: 1.6; color: #374151;">
                      <p style="font-size: 18px; margin: 0 0 24px 0; color: #111827;">Hello ${user.name},</p>
                      
                      <p style="margin: 0 0 24px 0; font-size: 16px;">We received a request to reset the password for your Edity account. If you did not make this request, please ignore this email and your password will remain unchanged.</p>
                      
                      <!-- Security Notice -->
                      <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 24px 0;">
                          <div style="display: flex; align-items: flex-start;">
                              <div style="margin-right: 12px; font-size: 20px;">⚠️</div>
                              <div>
                                  <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: 600;">Security Notice</h3>
                                  <p style="margin: 0; color: #92400e; font-size: 14px;">If you didn't request this password reset, please secure your account immediately and contact our support team.</p>
                              </div>
                          </div>
                      </div>
                      
                      <p style="margin: 24px 0 16px 0; font-size: 16px; font-weight: 600;">Your verification code is:</p>
                      
                      <!-- Verification Code -->
                      <div style="text-align: center; margin: 32px 0;">
                          <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 2px solid #d1d5db; border-radius: 12px; padding: 32px; display: inline-block;">
                              <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1f2937; font-family: 'Courier New', monospace; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                  ${code}
                              </div>
                          </div>
                      </div>
                      
                      <!-- Instructions -->
                      <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 24px; margin: 32px 0;">
                          <h3 style="margin: 0 0 16px 0; color: #0c4a6e; font-size: 18px; font-weight: 600;">How to Reset Your Password</h3>
                          <ol style="margin: 0; padding-left: 20px; color: #0c4a6e;">
                              <li style="margin-bottom: 8px;">Return to the password reset page</li>
                              <li style="margin-bottom: 8px;">Enter the verification code above</li>
                              <li style="margin-bottom: 8px;">Create a new strong password</li>
                              <li>Confirm your new password</li>
                          </ol>
                      </div>
                      
                      <!-- Expiration Warning -->
                      <div style="background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
                          <div style="font-size: 18px; margin-bottom: 8px;">⏰</div>
                          <p style="margin: 0; color: #dc2626; font-weight: 600; font-size: 16px;">This code expires in 5 minutes</p>
                          <p style="margin: 8px 0 0 0; color: #7f1d1d; font-size: 14px;">For your security, please complete the reset process promptly</p>
                      </div>
                      
                      <p style="margin: 32px 0 0 0; font-size: 16px;">If you continue to experience issues, please contact our support team for assistance.</p>
                      
                      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 16px;">Best regards,</p>
                          <p style="margin: 8px 0 0 0; font-weight: 600; color: #2563eb; font-size: 16px;">The Edity Team</p>
                      </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                          This is an automated security message. Please do not reply to this email.
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                          If you need assistance, please contact our support team at support@edity.com
                      </p>
                  </div>
                  
              </div>
              
              <!-- Inline CSS for animation -->
              <style>
                  @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                  }
              </style>
          </body>
          </html>
        `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error('Error sending password reset email');
  }
};

export const sendPasswordResetSuccessful = async (user: IUser) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Successful',
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Successful - Edity</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 30px; text-align: center;">
                      <div style="margin-bottom: 16px;">
                          <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; padding: 20px;">
                              <span style="color: #059669; font-size: 24px; font-weight: bold;">✔</span>
                          </div>
                      </div>
                      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Password Reset Successful</h1>
                  </div>
                  
                  <!-- Main Content -->
                  <div style="padding: 40px 30px; line-height: 1.6; color: #374151;">
                      <p style="font-size: 18px; margin: 0 0 24px 0; color: #111827;">Hello ${
                        user.name
                      },</p>
                      
                      <p style="margin: 0 0 32px 0; font-size: 16px;">We're writing to confirm that your password has been successfully reset for your Edity account. You can now log in using your new password.</p>
                      
                      <!-- Success Confirmation -->
                      <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 24px; margin: 32px 0; text-align: center;">
                          <div style="margin-bottom: 16px;">
                              <div style="display: inline-block; background-color: #10b981; border-radius: 50%; padding: 12px;">
                                  <span style="color: white; font-size: 24px; font-weight: bold;">✓</span>
                              </div>
                          </div>
                          <h3 style="margin: 0 0 8px 0; color: #065f46; font-size: 18px; font-weight: 600;">Password Reset Complete</h3>
                          <p style="margin: 0; color: #047857; font-size: 16px;">Your account is now secured with your new password</p>
                      </div>
                      
                      <!-- Security Alert -->
                      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 24px 0;">
                          <div style="display: flex; align-items: flex-start;">
                              <div style="margin-right: 12px; font-size: 20px;">🔒</div>
                              <div>
                                  <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: 600;">Security Notice</h3>
                                  <p style="margin: 0; color: #92400e; font-size: 14px;">If you did not initiate this password reset, please contact our support team immediately at support@edity.com</p>
                              </div>
                          </div>
                      </div>
                      
                      <!-- Security Recommendations -->
                      <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 24px; margin: 32px 0;">
                          <h3 style="margin: 0 0 16px 0; color: #0c4a6e; font-size: 18px; font-weight: 600;">🛡️ Security Best Practices</h3>
                          <p style="margin: 0 0 16px 0; color: #0c4a6e; font-size: 14px;">To keep your account secure, we recommend:</p>
                          <ul style="margin: 0; padding-left: 20px; color: #0c4a6e;">
                              <li style="margin-bottom: 8px;">Use a strong, unique password with a mix of letters, numbers, and symbols</li>
                              <li style="margin-bottom: 8px;">Enable two-factor authentication for an extra layer of security</li>
                              <li style="margin-bottom: 8px;">Avoid using the same password across multiple websites</li>
                              <li style="margin-bottom: 8px;">Consider using a reputable password manager</li>
                              <li>Regularly update your passwords every 3-6 months</li>
                          </ul>
                      </div>
                      
                      <!-- Next Steps -->
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 32px 0;">
                          <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px;">What's Next?</h3>
                          <div style="color: #6b7280;">
                              <p style="margin: 0 0 12px 0;">✅ Your password has been successfully updated</p>
                              <p style="margin: 0 0 12px 0;">🔐 You can now log in with your new password</p>
                              <p style="margin: 0">📱 Consider enabling additional security features in your account settings</p>
                          </div>
                      </div>
                      
                      <p style="margin: 32px 0 0 0; font-size: 16px;">Thank you for helping us keep your account secure. If you have any questions or concerns, please don't hesitate to contact our support team.</p>
                      
                      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 16px;">Best regards,</p>
                          <p style="margin: 8px 0 0 0; font-weight: 600; color: #2563eb; font-size: 16px;">The Edity Team</p>
                      </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                          This is an automated security notification. Please do not reply to this email.
                      </p>
                      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                          Questions? Contact our support team at support@edity.com
                      </p>
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                              Password reset completed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
                          </p>
                      </div>
                  </div>
                  
              </div>
          </body>
          </html>
        `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error('Error sending password reset success email');
  }
};
