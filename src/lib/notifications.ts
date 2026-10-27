import nodemailer from "nodemailer";
import { Lead, ClientRequest } from "@/types";
import { formatCurrency } from "@/lib/utils";

export const NOTIFICATION_RECIPIENTS = ["precolat@gmail.com", "info@pdbhomes.com"];

/**
 * Creates a configured Nodemailer transporter using available environment variables.
 * Supports SMTP (Hostinger, cPanel, Zoho, Namecheap), Gmail App Passwords, or custom relays.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Fallback to Gmail service if GMAIL_APP_PASSWORD or user is configured
  if (user && pass && (user.includes("gmail.com") || process.env.GMAIL_APP_PASSWORD)) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  return null;
}

/**
 * Sends notification email to both precolat@gmail.com and info@pdbhomes.com.
 * Supports Resend API key or standard Nodemailer SMTP.
 */
export async function sendNotificationEmail(params: {
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const { subject, html, text } = params;

  // 1. Try Resend if RESEND_API_KEY is available in Vercel / environment
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "PDB Homes Notifications <notifications@pdbhomes.com>",
          to: NOTIFICATION_RECIPIENTS,
          subject,
          html,
          text,
        }),
      });

      if (resendRes.ok) {
        console.log(`[EMAIL DISPATCH - RESEND] Sent to ${NOTIFICATION_RECIPIENTS.join(", ")}`);
        return true;
      } else {
        const errJson = await resendRes.json();
        console.warn("[EMAIL DISPATCH - RESEND ERROR]:", errJson);
      }
    } catch (resendErr) {
      console.warn("[EMAIL DISPATCH - RESEND EXCEPTION]:", resendErr);
    }
  }

  // 2. Try Nodemailer with SMTP / Gmail
  const transporter = getTransporter();
  if (transporter) {
    try {
      const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "info@pdbhomes.com";
      await transporter.sendMail({
        from: `"PDB Homes Notifications" <${fromAddress}>`,
        to: NOTIFICATION_RECIPIENTS.join(", "),
        subject,
        html,
        text,
      });

      console.log(`[EMAIL DISPATCH - SMTP] Sent to ${NOTIFICATION_RECIPIENTS.join(", ")}`);
      return true;
    } catch (smtpErr) {
      console.warn("[EMAIL DISPATCH - SMTP EXCEPTION]:", smtpErr);
    }
  }

  // 3. Fallback / Local log: Details are always recorded and viewable on admin dashboard
  console.log(`\n======================================================`);
  console.log(`[FORM SUBMISSION NOTIFICATION FOR ADMINS]`);
  console.log(`Recipients: ${NOTIFICATION_RECIPIENTS.join(", ")}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content:\n${text}`);
  console.log(`======================================================\n`);

  return true;
}

/**
 * Dispatches notification for Leads, Consultations, Contact inquiries & Viewing appointments.
 */
export async function notifyNewLead(lead: Lead) {
  const isConsultation = lead.leadType === "CONSULTATION" || lead.message?.includes("CONSULTATION");
  const isViewing = lead.leadType === "SCHEDULE_VIEWING";
  const typeLabel = isConsultation
    ? "₦10,000 Consultation Booking"
    : isViewing
    ? "Property Viewing Appointment"
    : "Website Contact Inquiry";

  const subject = `[NEW ${typeLabel.toUpperCase()}] ${lead.firstName} ${lead.lastName} — ${lead.phone}`;

  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${lead.firstName}, thank you for contacting PDB Homes regarding your ${typeLabel}.`
  )}`;

  const text = `
PDB HOMES — NEW FORM SUBMISSION
==============================================
Type: ${typeLabel}
Client Name: ${lead.firstName} ${lead.lastName}
Phone / WhatsApp: ${lead.phone}
Email: ${lead.email}
Preferred Date: ${lead.preferredDate || "Not Specified"}
Preferred Time: ${lead.preferredTime || "Flexible"}
Details / Message:
${lead.message || "None provided"}

Quick WhatsApp Response Link:
${waLink}

Status: Recorded in PDB Homes Database & Viewable on Admin Dashboard (/admin).
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #10B981; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: #ecfdf5; color: #047857; font-weight: 700; font-size: 12px; margin-bottom: 16px; border: 1px solid #a7f3d0; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    .table td.label { width: 35%; color: #64748b; font-weight: 600; }
    .table td.value { color: #0f172a; font-weight: 700; }
    .message-box { background: #f8fafc; border-left: 4px solid #10B981; padding: 14px; border-radius: 8px; margin: 18px 0; font-size: 13px; line-height: 1.5; color: #334155; }
    .actions { text-align: center; margin: 24px 0 12px; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 10px; background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn-admin { display: inline-block; padding: 12px 24px; border-radius: 10px; background: #0A192F; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; margin-left: 8px; }
    .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PDB HOMES</h1>
      <p>${typeLabel}</p>
    </div>
    <div class="content">
      <span class="badge">${isConsultation ? "₦10,000 Commitment Fee Pending" : "New Client Inquiry"}</span>
      <table class="table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${lead.firstName} ${lead.lastName}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value"><a href="tel:${lead.phone}" style="color: #0A192F; text-decoration: none;">${lead.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${lead.email}" style="color: #0A192F; text-decoration: none;">${lead.email}</a></td>
        </tr>
        <tr>
          <td class="label">Preferred Date</td>
          <td class="value">${lead.preferredDate || "Anytime / Flexible"}</td>
        </tr>
        <tr>
          <td class="label">Preferred Time Slot</td>
          <td class="value">${lead.preferredTime || "Flexible"}</td>
        </tr>
      </table>

      <div class="message-box">
        <strong>Client Message / Purpose:</strong><br />
        ${(lead.message || "No specific details provided.").replace(/\n/g, "<br />")}
      </div>

      <div class="actions">
        <a href="${waLink}" class="btn" target="_blank">Reply on WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically sent to <strong>precolat@gmail.com</strong> and <strong>info@pdbhomes.com</strong>.<br />
      Responses are archived and viewable on your admin dashboard at <strong>/admin</strong>.
    </div>
  </div>
</body>
</html>
`;

  return sendNotificationEmail({ subject, html, text });
}

/**
 * Dispatches notification for Client Property Requests (Buy, Rent, Sell).
 */
export async function notifyNewPropertyRequest(req: ClientRequest) {
  const intentLabel =
    req.requestIntent === "BUY"
      ? "Buy Property / Land"
      : req.requestIntent === "RENT"
      ? "Rent Enquiry (Apartment / Self-Con / Duplex)"
      : "Sell Property / Land";

  const subject = `[NEW ${req.requestIntent} MANDATE] ${req.clientName} — ${req.propertyType} in ${req.targetLocation}`;

  const cleanPhone = req.phone.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${req.clientName}, thank you for submitting your ${intentLabel} mandate to PDB Homes.`
  )}`;

  let budgetDisplay = "Not specified";
  if (req.requestIntent === "SELL" && req.sellingPrice) {
    budgetDisplay = `Asking: ${formatCurrency(req.sellingPrice)}`;
  } else if (req.budgetMin && req.budgetMax) {
    budgetDisplay = `${formatCurrency(req.budgetMin)} – ${formatCurrency(req.budgetMax)}`;
  } else if (req.budgetMax) {
    budgetDisplay = `Up to ${formatCurrency(req.budgetMax)}`;
  } else if (req.budgetMin) {
    budgetDisplay = `From ${formatCurrency(req.budgetMin)}+`;
  }

  const text = `
PDB HOMES — NEW PROPERTY MANDATE (${req.requestIntent})
==============================================
Client Name: ${req.clientName}
Intent: ${intentLabel}
Property Type: ${req.propertyType}
Target Location: ${req.targetLocation}
Budget / Asking: ${budgetDisplay}
Bedrooms: ${req.bedrooms || "Any"} | Bathrooms: ${req.bathrooms || "Any"}
Timeline: ${req.preferredTimeline || "Immediate"}
Phone / WhatsApp: ${req.phone}
Email: ${req.email}

Additional Specifications:
${req.additionalNotes || "None provided"}

Quick WhatsApp Link:
${waLink}

Status: Archived in PDB Homes Database & Viewable on Admin Dashboard (/admin).
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #10B981; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 12px; margin-bottom: 16px; border: 1px solid #bfdbfe; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    .table td.label { width: 38%; color: #64748b; font-weight: 600; }
    .table td.value { color: #0f172a; font-weight: 700; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563EB; padding: 14px; border-radius: 8px; margin: 18px 0; font-size: 13px; line-height: 1.5; color: #334155; }
    .actions { text-align: center; margin: 24px 0 12px; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 10px; background: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PDB HOMES</h1>
      <p>New Property Mandate: ${req.requestIntent}</p>
    </div>
    <div class="content">
      <span class="badge">${intentLabel}</span>
      <table class="table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${req.clientName}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value"><a href="tel:${req.phone}" style="color: #0A192F; text-decoration: none;">${req.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${req.email}" style="color: #0A192F; text-decoration: none;">${req.email}</a></td>
        </tr>
        <tr>
          <td class="label">Property Type</td>
          <td class="value">${req.propertyType}</td>
        </tr>
        <tr>
          <td class="label">Target Location</td>
          <td class="value">${req.targetLocation}</td>
        </tr>
        <tr>
          <td class="label">Budget / Asking</td>
          <td class="value" style="color: #059669;">${budgetDisplay}</td>
        </tr>
        <tr>
          <td class="label">Bedrooms / Baths</td>
          <td class="value">${req.bedrooms || 0} Beds • ${req.bathrooms || 0} Baths</td>
        </tr>
        <tr>
          <td class="label">Timeline</td>
          <td class="value">${req.preferredTimeline || "Immediate"}</td>
        </tr>
      </table>

      <div class="message-box">
        <strong>Special Features & Requirements:</strong><br />
        ${(req.additionalNotes || "No extra specifications provided.").replace(/\n/g, "<br />")}
      </div>

      <div class="actions">
        <a href="${waLink}" class="btn" target="_blank">Reply on WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically sent to <strong>precolat@gmail.com</strong> and <strong>info@pdbhomes.com</strong>.<br />
      Responses are archived and viewable on your admin dashboard at <strong>/admin</strong>.
    </div>
  </div>
</body>
</html>
`;

  return sendNotificationEmail({ subject, html, text });
}
