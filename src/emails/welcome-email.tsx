type WelcomeEmailProps = {
  name?: string;
  appUrl: string;
};

export function WelcomeEmail({ name, appUrl }: WelcomeEmailProps) {
  const greeting = name?.trim() ? `Hi ${name.trim()},` : "Hi there,";

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#f4f4f5",
          color: "#18181b",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            margin: "0 auto",
            maxWidth: "560px",
            padding: "40px",
          }}
        >
          <p style={{ fontSize: "16px", lineHeight: "24px" }}>{greeting}</p>
          <h1
            style={{ fontSize: "28px", lineHeight: "36px", margin: "24px 0" }}
          >
            Welcome to SaaSSeed
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "24px" }}>
            Your account is ready. You can now open your dashboard and start
            building.
          </p>
          <a
            href={appUrl}
            style={{
              backgroundColor: "#18181b",
              borderRadius: "8px",
              color: "#ffffff",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: 600,
              marginTop: "20px",
              padding: "12px 20px",
              textDecoration: "none",
            }}
          >
            Open your dashboard
          </a>
          <p
            style={{
              color: "#71717a",
              fontSize: "13px",
              lineHeight: "20px",
              marginTop: "32px",
            }}
          >
            If you did not create this account, you can ignore this email.
          </p>
        </div>
      </body>
    </html>
  );
}
