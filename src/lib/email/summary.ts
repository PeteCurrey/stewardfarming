import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface FarmSummaryEmailProps {
  toEmail: string;
  farmName: string;
  advisorName: string;
  farmType: string;
  tasksCreated: { title: string; autonomy_tier: string; due_date?: string }[];
  alertsCreated: { message: string; severity: string }[];
}

export async function sendProactiveSummaryEmail(props: FarmSummaryEmailProps) {
  const { toEmail, farmName, advisorName, farmType, tasksCreated, alertsCreated } = props;

  if (tasksCreated.length === 0 && alertsCreated.length === 0) {
    return { skipped: true, reason: "No new tasks or alerts" };
  }

  const subject = `Steward Daily Agricultural Briefing: ${farmName}`;

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background-color: #F5F0E6; padding: 32px; border-radius: 8px; color: #2B2620;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #2C4A3B; margin: 0; font-size: 26px;">Steward Farming Advisory</h1>
        <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; color: #B5651D; margin-top: 4px; font-weight: bold;">Daily Holding Review</p>
      </div>

      <div style="background-color: #FFFFFF; padding: 24px; border-radius: 8px; border: 1px solid #E2D9C8; margin-bottom: 20px;">
        <p style="font-size: 15px; line-height: 1.6; color: #2B2620;">
          Good morning. Your dedicated advisor, <strong>${advisorName}</strong>, has completed the automated 06:00 review for <strong>${farmName}</strong>.
        </p>
      </div>

      ${
        alertsCreated.length > 0
          ? `
        <div style="margin-bottom: 24px;">
          <h3 style="color: #B5651D; font-size: 16px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Advisory Alerts (Action Required)</h3>
          ${alertsCreated
            .map(
              (alert) => `
            <div style="background-color: #FFFDF9; border-left: 4px solid #B5651D; padding: 12px 16px; margin-bottom: 8px; border-radius: 4px;">
              <span style="display: inline-block; font-size: 10px; font-weight: bold; text-transform: uppercase; padding: 2px 6px; border-radius: 3px; background: #FDE8D7; color: #8A3B0D; margin-bottom: 4px;">${alert.severity}</span>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #2B2620;">${alert.message}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        tasksCreated.length > 0
          ? `
        <div style="margin-bottom: 24px;">
          <h3 style="color: #2C4A3B; font-size: 16px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Proactive Tasks Prepared</h3>
          ${tasksCreated
            .map(
              (task) => `
            <div style="background-color: #FFFFFF; border-left: 4px solid #2C4A3B; padding: 12px 16px; margin-bottom: 8px; border-radius: 4px; border: 1px solid #E2D9C8;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 14px; color: #2C4A3B;">${task.title}</strong>
                <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; padding: 2px 6px; border-radius: 3px; background: #E8EFEA; color: #2C4A3B;">${task.autonomy_tier.toUpperCase()}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      <div style="text-align: center; padding-top: 16px;">
        <a href="https://steward.co.uk/dashboard/tasks" style="display: inline-block; background-color: #2C4A3B; color: #F5F0E6; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px;">
          Open Tasks &amp; Alerts in Dashboard &rarr;
        </a>
      </div>

      <div style="text-align: center; margin-top: 32px; border-top: 1px solid #E2D9C8; padding-top: 16px; font-size: 11px; color: #7A7265;">
        <p>Steward Agricultural Technologies Ltd &bull; Encrypted UK Farm Intelligence</p>
      </div>
    </div>
  `;

  if (!resend) {
    console.log(`[Resend Mock Email to ${toEmail}] Subject: ${subject}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Steward Advisory <advisory@steward.co.uk>",
      to: [toEmail],
      subject,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}
