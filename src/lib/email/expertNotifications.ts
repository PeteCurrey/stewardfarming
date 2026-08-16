import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const teamEmail = process.env.STEWARD_TEAM_EMAIL || "advisory-team@steward.co.uk";

export interface NewExpertRequestNotificationProps {
  requestId: string;
  farmName: string;
  farmType: string;
  farmerEmail: string;
  expertType: string;
  initialMessage: string;
}

export interface FarmerExpertUpdateNotificationProps {
  toEmail: string;
  farmName: string;
  expertType: string;
  newStatus?: string;
  teamReply?: string;
}

/**
 * 1. Send notification to internal Steward Team about a new farmer request
 */
export async function sendTeamNewRequestEmail(props: NewExpertRequestNotificationProps) {
  const { requestId, farmName, farmType, farmerEmail, expertType, initialMessage } = props;
  const adminUrl = `https://steward.co.uk/admin/experts#req-${requestId}`;

  const subject = `[New Specialist Request] ${expertType.toUpperCase()} needed for ${farmName}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5F0E6; padding: 24px; border-radius: 8px; color: #2B2620;">
      <h2 style="color: #2C4A3B; margin-top: 0;">New Human Specialist Request</h2>
      <div style="background-color: #FFFFFF; padding: 16px; border-radius: 6px; border: 1px solid #E2D9C8; margin-bottom: 16px;">
        <p><strong>Farm:</strong> ${farmName} (${farmType.toUpperCase()})</p>
        <p><strong>Farmer Contact:</strong> ${farmerEmail}</p>
        <p><strong>Specialist Required:</strong> <span style="background: #FDE8D7; color: #8A3B0D; font-weight: bold; padding: 2px 6px; border-radius: 3px;">${expertType.toUpperCase()}</span></p>
      </div>

      <div style="background-color: #FFFFFF; padding: 16px; border-radius: 6px; border-left: 4px solid #B5651D; margin-bottom: 20px;">
        <p style="font-style: italic; margin: 0; color: #2B2620;">"${initialMessage}"</p>
      </div>

      <div style="text-align: center;">
        <a href="${adminUrl}" style="background-color: #2C4A3B; color: #F5F0E6; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">
          Open in Steward Admin Panel &rarr;
        </a>
      </div>
    </div>
  `;

  if (!resend) {
    console.log(`[Resend Mock Email to Team (${teamEmail})] Subject: ${subject}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Steward Dispatch <notifications@steward.co.uk>",
      to: [teamEmail],
      subject,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to notify team via Resend:", error);
    return { success: false, error };
  }
}

/**
 * 2. Send notification to Farmer when team replies or status changes
 */
export async function sendFarmerExpertUpdateEmail(props: FarmerExpertUpdateNotificationProps) {
  const { toEmail, farmName, expertType, newStatus, teamReply } = props;
  const farmerDashboardUrl = "https://steward.co.uk/dashboard/expert";

  const subject = `Update on your ${expertType} consultation request — Steward`;

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background-color: #F5F0E6; padding: 24px; border-radius: 8px; color: #2B2620;">
      <h2 style="color: #2C4A3B; margin-top: 0;">Specialist Consultation Update</h2>
      <p>Hello from Steward Advisory. There is an update regarding your request for a <strong>${expertType}</strong> on <strong>${farmName}</strong>.</p>
      
      ${
        newStatus
          ? `
        <div style="background-color: #FFFFFF; padding: 12px 16px; border-radius: 6px; border: 1px solid #E2D9C8; margin-bottom: 16px;">
          <strong>Request Status:</strong> <span style="text-transform: uppercase; font-weight: bold; color: #2C4A3B;">${newStatus}</span>
        </div>
      `
          : ""
      }

      ${
        teamReply
          ? `
        <div style="background-color: #FFFFFF; padding: 16px; border-radius: 6px; border-left: 4px solid #2C4A3B; margin-bottom: 20px;">
          <p style="margin: 0; color: #2B2620; line-height: 1.5;">${teamReply}</p>
        </div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 20px;">
        <a href="${farmerDashboardUrl}" style="background-color: #2C4A3B; color: #F5F0E6; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">
          View Request Thread &rarr;
        </a>
      </div>
    </div>
  `;

  if (!resend) {
    console.log(`[Resend Mock Email to Farmer (${toEmail})] Subject: ${subject}`);
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
    console.error("Failed to notify farmer via Resend:", error);
    return { success: false, error };
  }
}
