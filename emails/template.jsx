import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  const stats = data?.stats || {};
  const totalIncome = Number(stats.totalIncome || data?.totalIncome || 0);
  const totalExpenses = Number(stats.totalExpenses || data?.totalExpenses || 0);
  const byCategory = stats.byCategory || data?.byCategory || {};
  const insights = Array.isArray(data?.insights) ? data.insights : [];
  const budgetAmount = Number(data?.budgetAmount || 0);
  const budgetExpenses = Number(data?.totalExpenses || 0);
  const percentageUsed = Number(data?.percentageUsed || 0);

  if (type === "transaction-alert") {
    const { amount, description, category, date, transactionType } = data;
    return (
      <Html>
        <Head />
        <Preview>Transaction Confirmation - {formatCurrency(amount)}</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Transaction Alert 💳</Heading>
            <Text style={styles.text}>Hello {userName || "User"},</Text>
            <Text style={styles.text}>
              A new transaction has been logged on your Welth account:
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Type</Text>
                <Text style={{ ...styles.heading, color: transactionType === "INCOME" ? "#10b981" : "#ef4444" }}>
                  {transactionType || "EXPENSE"}
                </Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Amount</Text>
                <Text style={styles.heading}>{formatCurrency(amount)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Category & Details</Text>
                <Text style={styles.heading}>{category} • {description || "Direct Transaction"}</Text>
              </div>
            </Section>
            <Text style={styles.footer}>
              Thank you for tracking your finances with Welth!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report 📊</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for {data?.month || "last month"}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>{formatCurrency(totalIncome)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>{formatCurrency(totalExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net Savings</Text>
                <Text style={styles.heading}>
                  {formatCurrency(totalIncome - totalExpenses)}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {Object.keys(byCategory).length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>{formatCurrency(amount)}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {insights.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Welth AI Insights</Heading>
                {insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth. Keep tracking your finances for better financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert ⚠️</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {percentageUsed.toFixed(1)}% of your monthly budget limit.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>{formatCurrency(budgetAmount)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>{formatCurrency(budgetExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  {formatCurrency(budgetAmount - budgetExpenses)}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "otp-alert") {
    const otp = data?.otp || "000000";
    return (
      <Html>
        <Head />
        <Preview>Your Verification Code</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Security Verification</Heading>
            <Text style={styles.text}>Hello {userName || "User"},</Text>
            <Text style={styles.text}>
              We received a request to verify your identity. Please use the following One-Time Passcode (OTP):
            </Text>
            
            <Section style={{ margin: "24px 0", textAlign: "center" }}>
              <div style={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px 24px",
                display: "inline-block",
                fontSize: "32px",
                fontWeight: "bold",
                letterSpacing: "4px",
                color: "#2563eb",
                fontFamily: "monospace"
              }}>
                {otp}
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
