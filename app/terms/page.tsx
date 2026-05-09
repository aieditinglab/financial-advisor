import Link from "next/link";
import LegalShell from "@/components/legal/LegalShell";

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      effectiveDate="May 9, 2025"
      nextPage={{ label: "Privacy Policy", href: "/privacy" }}
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of FlipLedger
        (the &ldquo;Service&rdquo;), operated by FlipLedger (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
        accessing or using the Service, you agree to be bound by these Terms. If you do
        not agree to these Terms, please do not use the Service.
      </p>

      <h2>1. Description of Service</h2>
      <p>
        FlipLedger is a financial tracking and analytics tool designed to help resellers
        monitor their cost of goods sold (COGS), profit margins, platform fees, tax
        estimates, and cash flow. The Service may include AI-powered features that
        provide summaries, insights, and suggestions based on your data.
      </p>
      <p>
        <strong>FlipLedger is not a licensed financial advisor, tax preparer, accountant, or legal counsel.</strong>{" "}
        The Service is a software tool, and nothing on the platform constitutes
        financial, tax, investment, or legal advice. See Section 6 and our{" "}
        <Link href="/disclaimer">AI &amp; Financial Disclaimer</Link> for full details.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 13 years old to use FlipLedger. If you are under 18, you
        represent that a parent or guardian has reviewed and agreed to these Terms on
        your behalf. By using the Service, you represent and warrant that you meet
        these eligibility requirements.
      </p>

      <h2>3. Account Registration</h2>
      <p>You may be required to create an account to access certain features. You agree to:</p>
      <ul>
        <li>Provide accurate and complete registration information</li>
        <li>Keep your account credentials confidential</li>
        <li>Notify us promptly of any unauthorized use of your account</li>
        <li>Be responsible for all activity that occurs under your account</li>
      </ul>
      <p>
        We reserve the right to terminate accounts that violate these Terms or are used
        for fraudulent purposes.
      </p>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
        <li>Attempt to access, tamper with, or disrupt any part of the Service or its infrastructure</li>
        <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
        <li>Use automated tools to scrape or extract data from the Service</li>
        <li>Impersonate any person or entity or misrepresent your affiliation</li>
        <li>Upload or transmit malicious code or anything that could harm the Service or its users</li>
      </ul>

      <h2>5. Your Data</h2>
      <p>
        You retain ownership of the data you input into FlipLedger. By using the Service,
        you grant us a limited, non-exclusive license to process your data solely for
        the purpose of providing and improving the Service. We will not sell your
        personal data to third parties. See our <Link href="/privacy">Privacy Policy</Link> for details.
      </p>
      <p>
        You are responsible for the accuracy of the data you provide. FlipLedger cannot
        guarantee the accuracy of calculations, estimates, or insights derived from
        inaccurate input data.
      </p>

      <h2>6. No Financial, Tax, or Legal Advice</h2>
      <p>
        <strong>The Service does not provide financial, tax, investment, or legal advice of any kind.</strong>{" "}
        All content, data, calculations, AI-generated insights, and information provided
        through FlipLedger are for general informational and organizational purposes only.
      </p>
      <p>
        FlipLedger is not a registered investment adviser, broker-dealer, tax preparer,
        certified public accountant (CPA), or attorney. We do not hold any fiduciary
        duty to you. No information provided by the Service should be relied upon as a
        substitute for professional advice from a licensed financial advisor, CPA, tax
        professional, or attorney.
      </p>
      <p>
        Tax estimates provided by the Service are approximations only and may not
        reflect your actual tax liability. Always consult a licensed tax professional
        before making tax-related decisions.
      </p>
      <p>
        See our full <Link href="/disclaimer">AI &amp; Financial Disclaimer</Link> for additional
        information about the limitations of AI-generated content.
      </p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT ANY WARRANTIES OF ANY
        KIND, EITHER EXPRESS OR IMPLIED. WE EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING
        BUT NOT LIMITED TO:
      </p>
      <ul>
        <li>WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
        <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE</li>
        <li>WARRANTIES AS TO THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY CONTENT OR DATA</li>
        <li>WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
      </ul>
      <p>
        We do not warrant that any financial estimates, tax projections, or AI-generated
        insights will be accurate, complete, or suitable for your specific situation.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FLIPLEDGER AND ITS OFFICERS,
        DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING BUT NOT
        LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES — ARISING
        OUT OF OR RELATED TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF
        THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS
        OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12)
        MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
      </p>

      <h2>9. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless FlipLedger and its officers,
        directors, employees, and agents from and against any claims, damages, losses,
        liabilities, costs, and expenses (including reasonable attorneys&apos; fees)
        arising out of or related to your use of the Service, your violation of these
        Terms, or your violation of any rights of a third party.
      </p>

      <h2>10. Third-Party Platforms and Services</h2>
      <p>
        FlipLedger may integrate with or display information from third-party platforms
        (e.g., eBay, StockX, Amazon, Depop, Whatnot). We are not affiliated with,
        endorsed by, or responsible for the accuracy of data from these platforms.
        Platform fee structures, policies, and rates are subject to change; always
        verify current fees directly with the relevant platform.
      </p>

      <h2>11. Termination</h2>
      <p>
        We may suspend or terminate your access to the Service at any time, with or
        without cause, with or without notice. You may stop using the Service at any
        time. Upon termination, your right to use the Service immediately ceases.
      </p>

      <h2>12. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will update the
        effective date at the top of this page. Your continued use of the Service after
        any changes constitutes your acceptance of the revised Terms. We encourage you
        to review these Terms periodically.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the
        United States. Any disputes arising under or related to these Terms shall be
        resolved through binding arbitration, except where prohibited by law.
      </p>

      <h2>14. Contact</h2>
      <p>
        If you have questions about these Terms, contact us at{" "}
        <a href="mailto:hello@flipledger.com">hello@flipledger.com</a>.
      </p>
    </LegalShell>
  );
}
