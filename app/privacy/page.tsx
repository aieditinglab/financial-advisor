import Link from "next/link";
import LegalShell from "@/components/legal/LegalShell";

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      effectiveDate="May 9, 2025"
      prevPage={{ label: "Terms of Service", href: "/terms" }}
      nextPage={{ label: "AI Disclaimer", href: "/disclaimer" }}
    >
      <p>
        FlipLedger (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy
        Policy explains what information we collect when you use FlipLedger (the
        &ldquo;Service&rdquo;), how we use it, and your choices. By using the Service, you agree
        to the practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <p><strong>Information you provide directly:</strong></p>
      <ul>
        <li>Account registration details (name, email address)</li>
        <li>Financial data you input (COGS, item costs, sales records)</li>
        <li>Platform connection credentials or OAuth tokens (stored encrypted)</li>
        <li>Communications you send us (support emails, feedback forms)</li>
      </ul>
      <p><strong>Information collected automatically:</strong></p>
      <ul>
        <li>Log data (IP address, browser type, pages visited, time and date)</li>
        <li>Device information (device type, operating system)</li>
        <li>Usage data (features used, actions taken in the app)</li>
        <li>Cookies and similar tracking technologies (see Section 6)</li>
      </ul>
      <p><strong>Information from third-party platforms:</strong></p>
      <ul>
        <li>
          Sales data, order history, and platform metrics you authorize us to access via
          platform integrations (e.g., eBay API, Amazon SP-API, Depop)
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide, operate, and improve the Service</li>
        <li>Calculate profit margins, tax estimates, cash flow, and other analytics</li>
        <li>Generate AI-powered insights based on your data</li>
        <li>Send transactional communications (account confirmation, password reset, two-step verification codes)</li>
        <li>Respond to your support requests</li>
        <li>Detect and prevent fraud, abuse, and security incidents</li>
        <li>Comply with applicable legal obligations</li>
        <li>Improve and develop new features through aggregated, anonymized analysis</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>
        <strong>We do not sell your personal data.</strong> We may share information in
        the following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers:</strong> Third-party vendors who help us operate
          the Service (hosting, analytics, email delivery) under strict data processing
          agreements
        </li>
        <li>
          <strong>Legal requirements:</strong> When required by law, court order, or
          government authority
        </li>
        <li>
          <strong>Business transfers:</strong> In connection with a merger, acquisition,
          or sale of assets, with notice to you
        </li>
        <li>
          <strong>With your consent:</strong> Any other sharing we&apos;ll describe at the
          time and ask your permission first
        </li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed to
        provide the Service. You may request deletion of your account and associated
        data at any time by contacting us at hello@flipledger.com. We may retain certain
        data for a limited period afterward to comply with legal obligations or resolve
        disputes.
      </p>

      <h2>5. Security</h2>
      <p>
        We implement industry-standard technical and organizational measures to protect
        your data, including encryption in transit (TLS) and at rest, access controls,
        and regular security reviews. However, no system is perfectly secure. You use
        the Service at your own risk, and we cannot guarantee absolute security.
      </p>
      <p>
        If you believe your account has been compromised, contact us immediately at
        hello@flipledger.com.
      </p>

      <h2>6. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies to authenticate sessions, remember
        preferences, and understand how the Service is used. You can control cookies
        through your browser settings, but disabling cookies may affect Service
        functionality.
      </p>
      <p>
        We may use third-party analytics tools (such as anonymized usage tracking) to
        understand feature usage in aggregate. These tools do not receive personally
        identifiable information.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        The Service is intended for users aged 13 and older. We do not knowingly collect
        personal information from children under 13. If we discover we have collected
        information from a child under 13 without verifiable parental consent, we will
        delete it promptly. If you believe a child under 13 has provided us data,
        contact us at hello@flipledger.com.
      </p>

      <h2>8. Your Rights and Choices</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate data</li>
        <li>Delete your account and associated data</li>
        <li>Object to or restrict certain processing</li>
        <li>Data portability (receive a copy of your data in a common format)</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at hello@flipledger.com. We will
        respond within 30 days.
      </p>

      <h2>9. Third-Party Links and Platforms</h2>
      <p>
        The Service may link to or integrate with third-party platforms (eBay, StockX,
        Amazon, Depop, Whatnot, etc.). These platforms have their own privacy policies.
        We are not responsible for their privacy practices. We encourage you to review
        their policies before authorizing integrations.
      </p>

      <h2>10. AI and Automated Processing</h2>
      <p>
        FlipLedger uses AI and automated processing to generate financial insights,
        summaries, and suggestions. These outputs are based on the data you provide and
        are subject to error. See our <Link href="/disclaimer">AI &amp; Financial Disclaimer</Link>{" "}
        for important limitations. We do not make legally significant automated
        decisions about you based solely on automated processing.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will update the
        effective date above when we do. Material changes will be communicated by email
        or a notice in the Service. Continued use of the Service after changes
        constitutes your acceptance of the updated Policy.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        Questions about this Privacy Policy? Contact us at{" "}
        <a href="mailto:hello@flipledger.com">hello@flipledger.com</a>.
      </p>
    </LegalShell>
  );
}
