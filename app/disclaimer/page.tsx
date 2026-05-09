import LegalShell from "@/components/legal/LegalShell";

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="AI &amp; Financial Disclaimer"
      effectiveDate="May 9, 2025"
      prevPage={{ label: "Privacy Policy", href: "/privacy" }}
    >
      <div className="callout">
        <p>
          <strong>Plain-English summary:</strong> FlipLedger is a tracking and analytics
          tool — not a financial advisor, tax preparer, or lawyer. The AI features can
          make mistakes. Nothing we show you is financial, tax, or legal advice. Before
          making important money or tax decisions, talk to a licensed professional.
        </p>
      </div>

      <h2>1. FlipLedger is Not a Financial Advisor</h2>
      <p>
        FlipLedger is a software tool that helps resellers organize and analyze their
        financial data. We are <strong>not</strong> a licensed financial advisor,
        investment adviser, broker-dealer, registered investment company, certified
        public accountant (CPA), enrolled agent, tax preparer, attorney, or any other
        type of licensed financial or legal professional.
      </p>
      <p>
        Nothing on or within the FlipLedger platform — including text, calculations,
        AI-generated insights, dashboards, reports, summaries, suggestions, or any
        other content — constitutes or should be construed as financial advice,
        investment advice, tax advice, accounting advice, or legal advice of any kind.
      </p>

      <h2>2. AI Can Make Mistakes</h2>
      <p>
        FlipLedger uses artificial intelligence (AI) — including large language models —
        to generate insights, summaries, trend analyses, and suggestions based on your
        data.{" "}
        <strong>
          AI systems can and do produce errors, hallucinations, and incorrect outputs.
        </strong>{" "}
        These outputs:
      </p>
      <ul>
        <li>May be factually incorrect, incomplete, or outdated</li>
        <li>May not account for your specific circumstances, tax jurisdiction, or business situation</li>
        <li>May reflect the limitations or biases present in AI training data</li>
        <li>May change in accuracy or behavior as the underlying AI model is updated</li>
        <li>Should never be relied upon as a substitute for professional judgment</li>
      </ul>
      <p>
        <strong>Always verify AI-generated outputs</strong> — especially any figures,
        calculations, tax estimates, or recommendations — before using them to make
        financial, business, or tax decisions.
      </p>

      <h2>3. No Fiduciary Relationship</h2>
      <p>
        FlipLedger does not owe you a fiduciary duty of any kind. We are not acting as
        your advisor, agent, or representative. No relationship is created between you
        and FlipLedger that would impose any duty to act in your best interest in a
        legally binding financial or advisory capacity.
      </p>

      <h2>4. Tax Estimates Are Approximations Only</h2>
      <p>
        Any tax-related figures, quarterly tax estimates, self-employment tax
        calculations, or year-end summaries provided by FlipLedger are{" "}
        <strong>rough approximations</strong> intended to help you organize your
        financial information. They are not:
      </p>
      <ul>
        <li>Prepared or reviewed by a licensed tax professional</li>
        <li>A substitute for a tax return prepared by a CPA or enrolled agent</li>
        <li>Guaranteed to reflect your actual federal, state, or local tax liability</li>
        <li>Accounting for every deduction, credit, or jurisdiction-specific rule that may apply to you</li>
      </ul>
      <p>
        Tax laws change frequently and vary by location. Always consult a licensed tax
        professional (CPA, enrolled agent, or tax attorney) before filing returns or
        making tax payments.
      </p>

      <h2>5. Informational Purposes Only</h2>
      <p>
        All content, data, charts, insights, suggestions, and any other output from
        FlipLedger is provided for{" "}
        <strong>general informational and organizational purposes only</strong>. It does
        not take into account your individual financial situation, goals, risk
        tolerance, tax situation, or any other personal circumstances.
      </p>
      <p>
        Information on FlipLedger may not be appropriate for your situation. Before
        acting on any information from FlipLedger, consider whether it is appropriate
        for your specific circumstances and consult a qualified professional.
      </p>

      <h2>6. Platform Fee Data and Third-Party Information</h2>
      <p>
        FlipLedger displays fee structures and data from third-party selling platforms
        (e.g., eBay, StockX, Amazon, Depop, Whatnot). This information:
      </p>
      <ul>
        <li>May not reflect the most current fee schedules, as platforms change fees without notice</li>
        <li>May vary based on your account tier, seller level, or subscription with those platforms</li>
        <li>Is provided for estimation purposes only — not as a guarantee of your actual payout</li>
      </ul>
      <p>
        Always verify current fees directly with the relevant platform before making
        pricing decisions.
      </p>

      <h2>7. Past Performance and Forward-Looking Information</h2>
      <p>
        Any historical data, trend analyses, or projections shown in FlipLedger do not
        guarantee future results. Resale markets are subject to fluctuations in supply,
        demand, platform policies, economic conditions, and other factors beyond our
        control. Past performance of any item category, platform, or strategy is not
        indicative of future performance.
      </p>

      <h2>8. No Warranty on Accuracy</h2>
      <p>
        FlipLedger makes no warranty, express or implied, regarding the accuracy,
        completeness, reliability, suitability, or availability of any information,
        calculations, or AI-generated content on the platform. The Service is provided
        &ldquo;as is,&rdquo; and you use it at your own risk.
      </p>
      <p>
        We do not verify the accuracy of data you input. Inaccurate input data will
        produce inaccurate outputs. You are responsible for ensuring the data you enter
        is correct.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FLIPLEDGER SHALL NOT BE
        LIABLE FOR ANY LOSSES, DAMAGES, OR COSTS (INCLUDING LOST PROFITS, TAX PENALTIES,
        FINES, OR INDIRECT DAMAGES) ARISING FROM YOUR RELIANCE ON ANY INFORMATION, AI
        OUTPUT, OR CALCULATIONS PROVIDED BY THE SERVICE — WHETHER SUCH RELIANCE IS
        DIRECT OR INDIRECT, REGARDLESS OF WHETHER WE HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES.
      </p>

      <h2>10. Seek Professional Advice</h2>
      <p>We strongly encourage you to seek advice from qualified licensed professionals for:</p>
      <ul>
        <li><strong>Tax matters:</strong> CPA, enrolled agent, or tax attorney</li>
        <li><strong>Legal matters:</strong> Licensed attorney in your jurisdiction</li>
        <li><strong>Financial planning:</strong> Registered investment adviser or certified financial planner (CFP®)</li>
        <li><strong>Business formation:</strong> Attorney or CPA familiar with business entity law</li>
      </ul>
      <p>
        A free tool can help you organize your numbers — but important decisions deserve
        professional eyes.
      </p>

      <h2>11. Questions</h2>
      <p>
        If you have questions about this disclaimer, contact us at{" "}
        <a href="mailto:hello@flipledger.com">hello@flipledger.com</a>.
      </p>
    </LegalShell>
  );
}
