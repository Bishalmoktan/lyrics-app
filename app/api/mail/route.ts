import { BisaricReceiveEmail } from '@/emails/receive';
import { BisaricSendEmail } from '@/emails/send';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
    const {email, name, message} = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'Bisaric <noreply@bisaric.com>',
      to: ['bishalmoktan270@gmail.com'],
      subject: 'Message from Bisaric',
      react: BisaricReceiveEmail({ name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    const { data : response, error: err } = await resend.emails.send({
      from: 'Bisaric <noreply@bisaric.com>',
      to: [email],
      subject: 'Message from Bisaric',
      react: BisaricSendEmail({ name}),
    });

    if (err) {
      return Response.json({ err }, { status: 500 });
    }



    return Response.json({
      send: response,
      receive: data
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
