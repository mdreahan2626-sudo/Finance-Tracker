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

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

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

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

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
                <Text style={styles.text}>Net</Text>
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
                <Heading style={styles.heading}>Welth Tips</Heading>
                {insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth. Keep tracking your finances for better
              financial health!
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
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {percentageUsed.toFixed(1)}% of your
              monthly budget.
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
              We received a request to verify your identity. Please use the following One-Time Passcode (OTP) to complete the verification process:
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

            <Text style={{ ...styles.text, fontSize: "14px", color: "#6b7280" }}>
              This code will expire in 10 minutes. If you did not request this verification, please ignore this email or secure your account.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "welcome-alert") {
    return (
      <Html>
        <Head />
        <Preview>Welcome to Welth!</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Welcome to Welth 🚀</Heading>
            <Text style={styles.text}>Hello {userName || "there"},</Text>
            <Text style={styles.text}>
              Thank you for signing up for Welth! We are excited to help you take control of your financial journey.
            </Text>
            
            <Section style={styles.section}>
              <Heading style={{ ...styles.heading, fontSize: "18px" }}>Here is what you can do with Welth:</Heading>
              <Text style={styles.text}>• 📊 <strong>Track Finances</strong>: Monitor accounts and transactions in one central dashboard.</Text>
              <Text style={styles.text}>• 🎯 <strong>Set Budgets</strong>: Control your expenses by setting monthly limits and getting notified when you reach 80% usage.</Text>
              <Text style={styles.text}>• 🧠 <strong>AI Receipt Scanner</strong>: Automatically extract transaction details from receipt images using Gemini AI.</Text>
              <Text style={styles.text}>• 🔄 <strong>Automate Recurring Bills</strong>: Let Inngest handle your monthly, weekly, or daily repeating transactions.</Text>
            </Section>

            <Text style={styles.text}>
              We have initialized your account and everything is ready to go.
            </Text>

            <Text style={styles.footer}>
              Welcome aboard! If you have any questions, feel free to contact our support team.
            </Text>
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
