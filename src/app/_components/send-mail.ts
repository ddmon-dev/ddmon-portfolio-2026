'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';
import { formSchema } from './contact-me';

type ActionResult<T = void> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      error: string;
      code?: string;
    };

export async function sendMail(data: z.infer<typeof formSchema>): Promise<ActionResult> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `[DDmon Portfolio] ${data.name}님의 Contact 메일입니다.`,
      html: `
      <table style="border-collapse: collapse; border: 1px solid #000;">
        <tr>
          <td style="border: 1px solid #000; padding: 10px;">Name</td>
          <td style="border: 1px solid #000; padding: 10px;">${data.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 10px;">Email</td>
          <td style="border: 1px solid #000; padding: 10px;">${data.email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 10px;">Message</td>
          <td style="border: 1px solid #000; padding: 10px;">${data.message}</td>
        </tr>
      </table>  
    `,
    };

    const { rejected } = await transporter.sendMail(mailOptions);

    if (rejected.length > 0) {
      console.error(rejected);
      throw new Error('이메일 전송에 실패했습니다.');
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

    console.error(`[nodemailer] ${error}`);

    return { success: false, error: errorMessage };
  }
}
