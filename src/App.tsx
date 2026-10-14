import { FormEvent, ReactNode, useEffect, useId, useState } from "react"

type Screen = "signin" | "create" | "forgot" | "reset-sent" | "setup" | "workspace"

const FACTORY_IMAGE =
  "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1400"

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 5h11v7H9v4h6v7H4V5Z" />
      <path d="M17 9h6v4h5v10H17v-6h6v-4h-6V9Z" />
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo-lockup">
      <div className="logo-row">
        <Mark />
        <span className="wordmark">ForgeFlow</span>
      </div>
      {!compact && (
        <span className="descriptor">Manufacturing project coordination</span>
      )}
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

function EyeIcon({ closed }: { closed: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2.5 10s2.7-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.7 4.5-7.5 4.5S2.5 10 2.5 10Z" />
      <circle cx="10" cy="10" r="2" />
      {closed && <path d="M3 3l14 14" className="eye-slash" />}
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5.5 10 3 3 6-6" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6.5v4.25M10 13.5v.1" />
    </svg>
  )
}

function Spinner() {
  return <span className="spinner" aria-hidden="true" />
}

type InputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  hint?: string
  autoComplete?: string
  action?: ReactNode
  placeholder?: string
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  hint,
  autoComplete,
  action,
  placeholder,
}: InputProps) {
  const id = useId()
  const messageId = `${id}-message`
  return (
    <div className={`field ${error ? "field-error" : ""}`}>
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
        {action}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? messageId : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {(error || hint) && (
        <div
          id={messageId}
          className={error ? "field-message error" : "field-message"}
        >
          {error && <AlertIcon />}
          <span>{error || hint}</span>
        </div>
      )}
    </div>
  )
}

function PasswordInput(
  props: Omit<InputProps, "type" | "action"> & { action?: ReactNode },
) {
  const [visible, setVisible] = useState(false)
  const visibility = (
    <button
      className="visibility"
      type="button"
      onClick={() => setVisible((current) => !current)}
      aria-label={visible ? "Hide password" : "Show password"}
      title={visible ? "Hide password" : "Show password"}
    >
      <EyeIcon closed={visible} />
    </button>
  )
  return (
    <TextInput
      {...props}
      type={visible ? "text" : "password"}
      action={
        <div className="field-actions">
          {props.action}
          {visibility}
        </div>
      }
    />
  )
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
}) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="select-wrap">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {children}
        </select>
        <span aria-hidden="true">⌄</span>
      </div>
    </div>
  )
}

function Button({
  children,
  loading = false,
  disabled = false,
  secondary = false,
}: {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  secondary?: boolean
}) {
  return (
    <button
      type="submit"
      className={`button ${secondary ? "button-secondary" : ""}`}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : <span>{children}</span>}
      {!loading && !secondary && <ArrowIcon />}
    </button>
  )
}

function Notice({
  children,
  success = false,
}: {
  children: ReactNode
  success?: boolean
}) {
  return (
    <div
      className={`notice ${success ? "notice-success" : ""}`}
      role={success ? "status" : "alert"}
    >
      {success ? <CheckIcon /> : <AlertIcon />}
      <span>{children}</span>
    </div>
  )
}

function BrandPanel() {
  return (
    <aside className="brand-panel">
      <header>
        <Logo />
      </header>
      <div className="brand-content">
        <div className="eyebrow">Projects move better together</div>
        <h1>
          Every project.
          <br />
          Under control.
        </h1>
        <p>
          One workspace for manufacturing progress, team coordination, and
          delivery commitments.
        </p>
        <figure>
          <img
            src={FACTORY_IMAGE}
            alt="Stainless-steel process tanks inside a manufacturing facility"
          />
          <figcaption>
            <span>Engineering</span>
            <span>Fabrication</span>
            <span>Installation</span>
          </figcaption>
        </figure>
      </div>
      <footer>© 2025 ForgeFlow Systems</footer>
    </aside>
  )
}

function PageFooter() {
  return (
    <footer className="form-footer">
      <span>© ForgeFlow</span>
      <div>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>
    </footer>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="auth-shell">
      <BrandPanel />
      <section className="form-panel">
        <div className="mobile-header">
          <Logo compact />
          <span>Manufacturing, in sync.</span>
        </div>
        <div className="form-stage">{children}</div>
        <PageFooter />
      </section>
    </main>
  )
}

function Header({ title, supporting }: { title: string; supporting: string }) {
  return (
    <div className="form-header">
      <div className="form-kicker">Secure workspace access</div>
      <h2>{title}</h2>
      <p>{supporting}</p>
    </div>
  )
}

function LinkButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button className="text-link" type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function SignIn({ navigate }: { navigate: (screen: Screen) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setAuthError(false)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid work email.")
      return
    }
    setEmailError("")
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      if (password.toLowerCase() === "incorrect") setAuthError(true)
      else navigate("workspace")
    }, 900)
  }

  return (
    <div className="form-container">
      <Header
        title="Welcome back"
        supporting="Sign in to continue to your workspace."
      />
      <form onSubmit={submit} noValidate>
        {authError && <Notice>Incorrect email or password. Try again.</Notice>}
        <TextInput
          label="Work email"
          value={email}
          onChange={setEmail}
          error={emailError}
          autoComplete="email"
          placeholder="name@company.com"
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          action={
            <LinkButton onClick={() => navigate("forgot")}>
              Forgot password?
            </LinkButton>
          }
        />
        <Button loading={loading} disabled={!email || !password}>
          Sign in
        </Button>
      </form>
      <div className="form-switch">
        <span>New to ForgeFlow?</span>
        <LinkButton onClick={() => navigate("create")}>
          Create an account
        </LinkButton>
      </div>
      <p className="demo-note">
        For a validation demo, use “incorrect” as the password.
      </p>
    </div>
  )
}

function CreateAccount({ navigate }: { navigate: (screen: Screen) => void }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    org: "",
    password: "",
    confirm: "",
  })
  const [error, setError] = useState("")
  const set = (key: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }))

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Enter a valid work email.")
      return
    }
    if (values.password.length < 8) {
      setError("Use at least 8 characters for your password.")
      return
    }
    if (values.password !== values.confirm) {
      setError("Passwords do not match.")
      return
    }
    setError("")
    navigate("setup")
  }

  const complete = Object.values(values).every(Boolean)
  return (
    <div className="form-container form-container-wide">
      <Header
        title="Create your workspace"
        supporting="Bring your manufacturing projects and teams into one place."
      />
      <form onSubmit={submit} noValidate>
        {error && <Notice>{error}</Notice>}
        <div className="field-grid">
          <TextInput
            label="Full name"
            value={values.name}
            onChange={set("name")}
            autoComplete="name"
          />
          <TextInput
            label="Work email"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            placeholder="name@company.com"
          />
        </div>
        <TextInput
          label="Organization name"
          value={values.org}
          onChange={set("org")}
          autoComplete="organization"
        />
        <div className="field-grid">
          <PasswordInput
            label="Password"
            value={values.password}
            onChange={set("password")}
            autoComplete="new-password"
            hint="8+ characters"
          />
          <PasswordInput
            label="Confirm password"
            value={values.confirm}
            onChange={set("confirm")}
            autoComplete="new-password"
          />
        </div>
        <label className="agreement">
          <input type="checkbox" required />
          <span>
            I agree to the <a href="#terms">Terms of Service</a> and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </span>
        </label>
        <Button disabled={!complete}>Create account</Button>
      </form>
      <div className="form-switch">
        <span>Already have an account?</span>
        <LinkButton onClick={() => navigate("signin")}>Sign in</LinkButton>
      </div>
    </div>
  )
}

function ForgotPassword({ navigate }: { navigate: (screen: Screen) => void }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  function submit(event: FormEvent) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid work email.")
      return
    }
    navigate("reset-sent")
  }
  return (
    <div className="form-container">
      <Header
        title="Reset your password"
        supporting="Enter your work email and we’ll send instructions to reset your password."
      />
      <form onSubmit={submit} noValidate>
        <TextInput
          label="Work email"
          value={email}
          onChange={setEmail}
          error={error}
          autoComplete="email"
          placeholder="name@company.com"
        />
        <Button disabled={!email}>Send reset link</Button>
      </form>
      <div className="back-link">
        <LinkButton onClick={() => navigate("signin")}>
          ← Back to sign in
        </LinkButton>
      </div>
    </div>
  )
}

function ResetSent({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="form-container">
      <div className="success-badge">
        <CheckIcon />
      </div>
      <Header
        title="Check your email"
        supporting="If an account exists for that email, you’ll receive password reset instructions shortly."
      />
      <Notice success>
        Reset instructions can take a few minutes to arrive.
      </Notice>
      <form onSubmit={(event) => event.preventDefault()}>
        <Button secondary>Resend instructions</Button>
      </form>
      <div className="back-link">
        <LinkButton onClick={() => navigate("signin")}>
          ← Back to sign in
        </LinkButton>
      </div>
    </div>
  )
}

function OrganizationSetup({
  navigate,
}: {
  navigate: (screen: Screen) => void
}) {
  const [org, setOrg] = useState("")
  const [size, setSize] = useState("")
  const [activity, setActivity] = useState("")
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  return (
    <div className="form-container form-container-wide">
      <div className="step-label">
        <span>Organization setup</span>
        <span>Step 1 of 1</span>
      </div>
      <Header
        title="Set up your organization"
        supporting="Define the basics for your shared manufacturing workspace."
      />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          navigate("workspace")
        }}
      >
        <TextInput label="Organization name" value={org} onChange={setOrg} />
        <div className="field-grid">
          <SelectField
            label="Organization size"
            value={size}
            onChange={setSize}
          >
            <option value="">Select a range</option>
            <option>1–10 employees</option>
            <option>11–50 employees</option>
            <option>51–200 employees</option>
            <option>201–500 employees</option>
            <option>500+ employees</option>
          </SelectField>
          <SelectField
            label="Primary manufacturing activity"
            value={activity}
            onChange={setActivity}
          >
            <option value="">Select an activity</option>
            <option>Process equipment fabrication</option>
            <option>Pharmaceutical equipment</option>
            <option>Food and beverage systems</option>
            <option>Engineering and project services</option>
            <option>Other manufacturing</option>
          </SelectField>
        </div>
        <SelectField
          label="Default timezone"
          value={timezone}
          onChange={setTimezone}
        >
          <option value="Asia/Kolkata">India Standard Time (UTC+05:30)</option>
          <option value="Europe/London">London (UTC+00:00)</option>
          <option value="America/New_York">Eastern Time (UTC−05:00)</option>
          <option value="Asia/Singapore">Singapore (UTC+08:00)</option>
        </SelectField>
        <Button disabled={!org || !size || !activity}>Create workspace</Button>
      </form>
      <div className="join-note">
        <strong>Joining an existing organization?</strong>
        <span>Ask your workspace administrator to send you an invitation.</span>
      </div>
    </div>
  )
}

type WorkspaceView = "portfolio" | "project" | "tasks" | "issues" | "activity" | "reports" | "team"

type Tone = "neutral" | "blue" | "green" | "amber" | "red"

const projects = [
  {
    code: "FF-2408",
    name: "2 × 10 KL SS316L Fermenter System",
    customer: "Aster Biologics",
    stage: "Fabrication",
    owner: "Anita Rao",
    delivery: "18 Jun 2025",
    progress: 58,
    health: "At risk",
    reason: "Agitator seal delivery is 6 days late",
  },
  {
    code: "FF-2411",
    name: "5 KL Seed Fermenter & CIP Skid",
    customer: "Veda Enzymes",
    stage: "Procurement",
    owner: "Rohan Mehta",
    delivery: "02 Jul 2025",
    progress: 34,
    health: "On track",
    reason: "All critical POs acknowledged",
  },
  {
    code: "FF-2403",
    name: "20 KL Fermentation Vessel Upgrade",
    customer: "Kaveri Nutrients",
    stage: "Quality",
    owner: "Meera Shah",
    delivery: "29 May 2025",
    progress: 82,
    health: "Attention",
    reason: "Two weld map records pending review",
  },
  {
    code: "FF-2397",
    name: "3 × 2 KL Pilot Fermenter Train",
    customer: "Neogen Labs",
    stage: "Installation",
    owner: "Vikram Joshi",
    delivery: "16 May 2025",
    progress: 94,
    health: "On track",
    reason: "Site acceptance scheduled",
  },
  {
    code: "FF-2414",
    name: "15 KL Fermenter with Automation",
    customer: "Orchid BioPharma",
    stage: "Engineering",
    owner: "Anita Rao",
    delivery: "21 Aug 2025",
    progress: 16,
    health: "On track",
    reason: "P&ID review underway",
  },
]

const stageSteps = [
  { name: "Engineering", detail: "Approved 14 Mar", state: "done" },
  { name: "Procurement", detail: "23 of 26 POs", state: "done" },
  { name: "Fabrication", detail: "In progress · 62%", state: "current" },
  { name: "Quality", detail: "Planned 27 May", state: "next" },
  { name: "Installation", detail: "Planned 09 Jun", state: "next" },
]

const initialTasks = [
  {
    id: "TSK-1842",
    name: "Complete shell course-3 longitudinal weld",
    area: "Vessel fabrication",
    owner: "S. Patil",
    due: "Today",
    deadline: "Due today",
    status: "In progress",
    dependency: "Material PMI cleared",
  },
  {
    id: "TSK-1851",
    name: "Review agitator seal revised delivery plan",
    area: "Procurement",
    owner: "R. Mehta",
    due: "14 May",
    deadline: "3 days overdue",
    status: "Blocked",
    dependency: "Vendor confirmation",
  },
  {
    id: "TSK-1860",
    name: "Prepare jacket hydro-test procedure",
    area: "Quality planning",
    owner: "M. Shah",
    due: "16 May",
    deadline: "Due in 2 days",
    status: "In review",
    dependency: "Weld completion",
  },
  {
    id: "TSK-1864",
    name: "Release insulation support drawings",
    area: "Engineering",
    owner: "A. Rao",
    due: "17 May",
    deadline: "Due in 3 days",
    status: "Not started",
    dependency: "Client nozzle approval",
  },
  {
    id: "TSK-1827",
    name: "Verify MTCs for SS316L plates",
    area: "Incoming quality",
    owner: "N. Desai",
    due: "09 May",
    deadline: "Completed on time",
    status: "Complete",
    dependency: "None",
  },
]

const issues = [
  {
    id: "ISS-047",
    title: "Agitator mechanical seal shipment delayed",
    severity: "High",
    owner: "Rohan Mehta",
    age: "6 days",
    impact: "Blocks drive assembly and dry run",
    status: "Open",
  },
  {
    id: "ISS-052",
    title: "Client approval pending for N7 nozzle orientation",
    severity: "Medium",
    owner: "Anita Rao",
    age: "3 days",
    impact: "Insulation support drawing cannot be released",
    status: "Awaiting client",
  },
  {
    id: "ISS-039",
    title: "Surface finish reading outside tolerance at weld seam",
    severity: "Medium",
    owner: "Meera Shah",
    age: "8 days",
    impact: "Local repolishing required before final inspection",
    status: "In resolution",
  },
]

function AppIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    projects: (
      <>
        <path d="M3 5.5h14v11H3z" />
        <path d="M7 5.5V3.5h6v2" />
      </>
    ),
    tasks: (
      <>
        <path d="M6 5h11M6 10h11M6 15h11" />
        <path d="m2.5 5 .8.8L5 4m-2.5 6 .8.8L5 9m-2.5 6 .8.8L5 14" />
      </>
    ),
    issues: (
      <>
        <path d="M10 2.5 18 17H2z" />
        <path d="M10 7v4M10 14v.1" />
      </>
    ),
    activity: (
      <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 5.5v5l3 2" />
      </>
    ),
    reports: (
      <>
        <path d="M3 17V9m5 8V4m5 13v-6m4 6V7" />
      </>
    ),
    team: (
      <>
        <circle cx="7" cy="7" r="3" />
        <path d="M2 17c.5-3 2-5 5-5s4.5 2 5 5m1-9.5a2.5 2.5 0 0 1 0 5m1 0c2 .3 3.3 1.8 3.8 4.5" />
      </>
    ),
    search: (
      <>
        <circle cx="8.5" cy="8.5" r="5" />
        <path d="m12.5 12.5 4 4" />
      </>
    ),
    bell: (
      <>
        <path d="M4 14h12l-1.5-2V8a4.5 4.5 0 0 0-9 0v4zM8 16.5h4" />
      </>
    ),
    plus: <path d="M10 4v12M4 10h12" />,
    chevron: <path d="m7 4 6 6-6 6" />,
    menu: <path d="M3 5h14M3 10h14M3 15h14" />,
    dots: (
      <>
        <circle cx="4" cy="10" r=".8" fill="currentColor" />
        <circle cx="10" cy="10" r=".8" fill="currentColor" />
        <circle cx="16" cy="10" r=".8" fill="currentColor" />
      </>
    ),
  }
  return (
    <svg className="app-icon" viewBox="0 0 20 20" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function StatusTag({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: Tone
}) {
  return <span className={`status-tag status-${tone}`}>{children}</span>
}

function Person({ name, compact = false }: { name: string; compact?: boolean }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
  return (
    <span className={`person ${compact ? "person-compact" : ""}`}>
      <span className="person-avatar">{initials}</span>
      {!compact && <span>{name}</span>}
    </span>
  )
}

function ViewHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="view-header">
      <div>
        <span className="view-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  )
}

function CompactButton({
  children,
  primary = false,
  onClick,
}: {
  children: ReactNode
  primary?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={`compact-button ${primary ? "compact-primary" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Toolbar({ children }: { children: ReactNode }) {
  return <div className="table-toolbar">{children}</div>
}

function Portfolio({ openProject }: { openProject: () => void }) {
  const [filter, setFilter] = useState("All projects")
  const visible = projects.filter((project) => {
    if (filter === "At risk")
      return project.health === "At risk" || project.health === "Attention"
    if (filter === "My projects") return project.owner === "Anita Rao"
    return true
  })
  return (
    <>
      <ViewHeader
        eyebrow="Project portfolio"
        title="Manufacturing projects"
        description="Current delivery position across active customer programs."
        action={
          <CompactButton primary>
            <AppIcon name="plus" />
            New project
          </CompactButton>
        }
      />
      <div className="portfolio-summary">
        <div>
          <strong>5</strong>
          <span>Active projects</span>
        </div>
        <div>
          <strong>₹8.4 Cr</strong>
          <span>Open contract value</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Project at risk</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Deliveries this month</span>
        </div>
      </div>
      <section className="data-section">
        <Toolbar>
          <div className="filter-tabs">
            {["All projects", "My projects", "At risk"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="toolbar-actions">
            <label className="table-search">
              <AppIcon name="search" />
              <input
                placeholder="Search projects"
                aria-label="Search projects"
              />
            </label>
            <CompactButton>Stage: All</CompactButton>
          </div>
        </Toolbar>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Stage</th>
                <th>Owner</th>
                <th>Delivery</th>
                <th>Progress</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((project) => (
                <tr
                  key={project.code}
                  onClick={openProject}
                  className="clickable-row"
                >
                  <td>
                    <strong>{project.name}</strong>
                    <small>
                      {project.code} · {project.customer}
                    </small>
                  </td>
                  <td>{project.stage}</td>
                  <td>
                    <Person name={project.owner} />
                  </td>
                  <td>{project.delivery}</td>
                  <td>
                    <div className="progress-cell">
                      <div>
                        <span style={{ width: `${project.progress}%` }} />
                      </div>
                      <small>{project.progress}%</small>
                    </div>
                  </td>
                  <td>
                    <StatusTag
                      tone={
                        project.health === "At risk"
                          ? "red"
                          : project.health === "Attention"
                            ? "amber"
                            : "green"
                      }
                    >
                      {project.health}
                    </StatusTag>
                    <small className="health-reason">{project.reason}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function ProjectDetail({
  setView,
}: {
  setView: (view: WorkspaceView) => void
}) {
  return (
    <>
      <ViewHeader
        eyebrow="FF-2408 · Aster Biologics"
        title="2 × 10 KL SS316L Fermenter System"
        description="Delivery commitment: 18 June 2025 · Project manager: Anita Rao"
        action={
          <div className="header-actions">
            <CompactButton>Export summary</CompactButton>
            <CompactButton primary>Update project</CompactButton>
          </div>
        }
      />
      <div className="risk-banner">
        <AlertIcon />
        <div>
          <strong>Delivery at risk by 4 working days</strong>
          <span>
            Agitator mechanical seal shipment is 6 days late, blocking drive
            assembly and dry run. Owner: Rohan Mehta · recovery plan due today.
          </span>
        </div>
        <button type="button" onClick={() => setView("issues")}>
          View blocker
        </button>
      </div>
      <section className="stage-panel">
        <div className="section-heading">
          <div>
            <h2>Manufacturing progression</h2>
            <p>Current position against the approved project baseline.</p>
          </div>
          <span>
            Overall progress <strong>58%</strong>
          </span>
        </div>
        <div className="stage-track">
          {stageSteps.map((stage, index) => (
            <div className={`stage-step stage-${stage.state}`} key={stage.name}>
              <div className="stage-line">
                <span>
                  {stage.state === "done" ? <CheckIcon /> : index + 1}
                </span>
              </div>
              <strong>{stage.name}</strong>
              <small>{stage.detail}</small>
            </div>
          ))}
        </div>
      </section>
      <div className="detail-grid">
        <section className="data-section">
          <div className="section-heading section-heading-padded">
            <div>
              <h2>Priority work</h2>
              <p>Tasks requiring attention in the next five days.</p>
            </div>
            <button type="button" onClick={() => setView("tasks")}>
              View all tasks
            </button>
          </div>
          <div className="compact-list">
            {initialTasks.slice(0, 4).map((task) => (
              <div className="compact-row" key={task.id}>
                <div>
                  <strong>{task.name}</strong>
                  <small>
                    {task.id} · {task.area}
                  </small>
                </div>
                <Person name={task.owner} compact />
                <StatusTag
                  tone={
                    task.status === "Blocked"
                      ? "red"
                      : task.status === "In review"
                        ? "amber"
                        : "blue"
                  }
                >
                  {task.status}
                </StatusTag>
                <span
                  className={
                    task.deadline.includes("overdue") ? "deadline-late" : ""
                  }
                >
                  {task.deadline}
                </span>
              </div>
            ))}
          </div>
        </section>
        <aside className="side-stack">
          <section className="data-section side-panel">
            <div className="section-heading">
              <h2>Open blockers</h2>
              <button type="button" onClick={() => setView("issues")}>
                View all
              </button>
            </div>
            {issues.slice(0, 2).map((issue) => (
              <button
                className="issue-summary"
                type="button"
                key={issue.id}
                onClick={() => setView("issues")}
              >
                <StatusTag tone={issue.severity === "High" ? "red" : "amber"}>
                  {issue.severity}
                </StatusTag>
                <strong>{issue.title}</strong>
                <small>
                  {issue.owner} · Open {issue.age}
                </small>
              </button>
            ))}
          </section>
          <section className="data-section side-panel">
            <div className="section-heading">
              <h2>Next milestone</h2>
            </div>
            <div className="milestone-date">
              <strong>27</strong>
              <span>
                May
                <br />
                2025
              </span>
            </div>
            <h3>Fabrication release to quality</h3>
            <p>
              5 of 7 exit criteria complete. Hydro-test procedure and drive
              assembly remain pending.
            </p>
          </section>
        </aside>
      </div>
      <section className="data-section recent-activity">
        <div className="section-heading section-heading-padded">
          <div>
            <h2>Recent project activity</h2>
            <p>Latest operational changes for FF-2408.</p>
          </div>
          <button type="button" onClick={() => setView("activity")}>
            Full activity log
          </button>
        </div>
        <ActivityRows limit={4} />
      </section>
    </>
  )
}

function TasksView() {
  const [tasks, setTasks] = useState(initialTasks)
  const cycleStatus = (id: string) => {
    const order = ["Not started", "In progress", "In review", "Complete"]
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id || task.status === "Blocked") return task
        return {
          ...task,
          status: order[(order.indexOf(task.status) + 1) % order.length],
        }
      }),
    )
  }
  return (
    <>
      <ViewHeader
        eyebrow="Operations"
        title="Tasks"
        description="Work ownership, deadlines, and dependencies across active projects."
        action={
          <CompactButton primary>
            <AppIcon name="plus" />
            Add task
          </CompactButton>
        }
      />
      <section className="data-section">
        <Toolbar>
          <div className="filter-tabs">
            <button className="active">
              Open <span>14</span>
            </button>
            <button>Completed</button>
            <button>All tasks</button>
          </div>
          <div className="toolbar-actions">
            <CompactButton>Project: FF-2408</CompactButton>
            <CompactButton>Owner: All</CompactButton>
          </div>
        </Toolbar>
        <div className="table-scroll">
          <table className="data-table task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Dependency</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <strong>{task.name}</strong>
                    <small>
                      {task.id} · {task.area}
                    </small>
                  </td>
                  <td>
                    <Person name={task.owner} />
                  </td>
                  <td>
                    <button
                      className="status-button"
                      onClick={() => cycleStatus(task.id)}
                    >
                      <StatusTag
                        tone={
                          task.status === "Blocked"
                            ? "red"
                            : task.status === "Complete"
                              ? "green"
                              : task.status === "In review"
                                ? "amber"
                                : "blue"
                        }
                      >
                        {task.status}
                      </StatusTag>
                    </button>
                  </td>
                  <td>
                    <strong
                      className={
                        task.deadline.includes("overdue")
                          ? "deadline-late"
                          : "deadline-normal"
                      }
                    >
                      {task.due}
                    </strong>
                    <small>{task.deadline}</small>
                  </td>
                  <td>{task.dependency}</td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label={`Actions for ${task.name}`}
                    >
                      <AppIcon name="dots" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="interaction-note">
        Select a status to move work to its next state. Blocked tasks must be
        resolved through Issues.
      </p>
    </>
  )
}

function IssuesView() {
  const [selected, setSelected] = useState(issues[0])
  return (
    <>
      <ViewHeader
        eyebrow="Operations"
        title="Issues & blockers"
        description="Exceptions affecting scope, quality, cost, or committed delivery dates."
        action={
          <CompactButton primary>
            <AppIcon name="plus" />
            Log issue
          </CompactButton>
        }
      />
      <div className="issues-layout">
        <section className="data-section issue-list">
          <Toolbar>
            <div className="filter-tabs">
              <button className="active">
                Open <span>3</span>
              </button>
              <button>Resolved</button>
            </div>
            <CompactButton>Severity: All</CompactButton>
          </Toolbar>
          {issues.map((issue) => (
            <button
              type="button"
              className={`issue-row ${
                selected.id === issue.id ? "selected" : ""
              }`}
              onClick={() => setSelected(issue)}
              key={issue.id}
            >
              <div>
                <span>{issue.id}</span>
                <strong>{issue.title}</strong>
                <small>{issue.impact}</small>
              </div>
              <div>
                <StatusTag tone={issue.severity === "High" ? "red" : "amber"}>
                  {issue.severity}
                </StatusTag>
                <small>{issue.age}</small>
              </div>
            </button>
          ))}
        </section>
        <aside className="data-section issue-detail">
          <div className="issue-detail-head">
            <span>{selected.id}</span>
            <StatusTag tone={selected.severity === "High" ? "red" : "amber"}>
              {selected.severity} severity
            </StatusTag>
          </div>
          <h2>{selected.title}</h2>
          <p>
            {selected.impact}. This item is included in the customer delivery
            risk calculation.
          </p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{selected.status}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>
                <Person name={selected.owner} />
              </dd>
            </div>
            <div>
              <dt>Project</dt>
              <dd>FF-2408 · Aster Biologics</dd>
            </div>
            <div>
              <dt>Reported</dt>
              <dd>08 May 2025</dd>
            </div>
          </dl>
          <div className="resolution-block">
            <h3>Resolution history</h3>
            <div>
              <span className="timeline-dot" />
              <strong>Vendor escalation completed</strong>
              <small>Rohan Mehta · 13 May, 16:20</small>
              <p>
                Vendor committed to air freight and shared revised dispatch date
                of 15 May.
              </p>
            </div>
            <div>
              <span className="timeline-dot" />
              <strong>Recovery plan requested</strong>
              <small>Anita Rao · 12 May, 09:10</small>
            </div>
          </div>
          <label className="comment-box">
            <span>Add operational note</span>
            <textarea placeholder="Record a decision, update, or next action…" />
          </label>
          <CompactButton primary>Add comment</CompactButton>
        </aside>
      </div>
    </>
  )
}

const activityItems = [
  {
    time: "Today, 16:20",
    actor: "Rohan Mehta",
    action: "updated issue ISS-047",
    detail: "Vendor dispatch revised to 15 May; air freight confirmed.",
    type: "Issue",
  },
  {
    time: "Today, 14:05",
    actor: "Suresh Patil",
    action: "moved task TSK-1842 to In progress",
    detail: "Shell course-3 longitudinal weld started at Bay 2.",
    type: "Task",
  },
  {
    time: "Today, 11:40",
    actor: "Meera Shah",
    action: "approved inspection record IR-118",
    detail: "Material PMI results accepted for vessel shell plates.",
    type: "Quality",
  },
  {
    time: "Today, 09:10",
    actor: "Anita Rao",
    action: "changed project health to At risk",
    detail: "Forecast delivery impact recorded as four working days.",
    type: "Project",
  },
  {
    time: "Yesterday, 17:35",
    actor: "Nikhil Desai",
    action: "completed task TSK-1827",
    detail: "SS316L material certificates verified and filed.",
    type: "Task",
  },
  {
    time: "Yesterday, 13:15",
    actor: "Client reviewer",
    action: "commented on drawing GA-2408-07",
    detail: "Requested confirmation of N7 nozzle access clearance.",
    type: "Document",
  },
]

function ActivityRows({ limit }: { limit?: number }) {
  return (
    <div className="activity-list">
      {activityItems.slice(0, limit).map((item, index) => (
        <div className="activity-row" key={`${item.time}-${index}`}>
          <span className="activity-time">{item.time}</span>
          <span className="activity-marker" />
          <div>
            <p>
              <strong>{item.actor}</strong> {item.action}
            </p>
            <small>{item.detail}</small>
          </div>
          <StatusTag>{item.type}</StatusTag>
        </div>
      ))}
    </div>
  )
}

function ActivityView() {
  return (
    <>
      <ViewHeader
        eyebrow="Audit trail"
        title="Activity log"
        description="Timestamped operational changes across projects, tasks, quality, and issues."
      />
      <section className="data-section">
        <Toolbar>
          <div className="filter-tabs">
            <button className="active">All activity</button>
            <button>My projects</button>
          </div>
          <div className="toolbar-actions">
            <CompactButton>Project: FF-2408</CompactButton>
            <CompactButton>Date: Last 30 days</CompactButton>
          </div>
        </Toolbar>
        <ActivityRows />
      </section>
    </>
  )
}

function ReportsView() {
  const bars = [
    { label: "FF-2397", planned: 92, actual: 94, status: "Ahead by 2%" },
    { label: "FF-2403", planned: 86, actual: 82, status: "Behind by 4%" },
    { label: "FF-2408", planned: 66, actual: 58, status: "Behind by 8%" },
    { label: "FF-2411", planned: 35, actual: 34, status: "Behind by 1%" },
    { label: "FF-2414", planned: 15, actual: 16, status: "Ahead by 1%" },
  ]
  return (
    <>
      <ViewHeader
        eyebrow="Operational reporting"
        title="Delivery performance"
        description="Schedule position and unresolved work across active customer projects."
        action={<CompactButton>Export PDF</CompactButton>}
      />
      <div className="report-strip">
        <div>
          <span>On-time forecast</span>
          <strong>3 of 5</strong>
          <small>Active projects</small>
        </div>
        <div>
          <span>Overdue tasks</span>
          <strong>7</strong>
          <small>3 critical-path</small>
        </div>
        <div>
          <span>Open issues</span>
          <strong>11</strong>
          <small>2 high severity</small>
        </div>
        <div>
          <span>Average progress</span>
          <strong>57%</strong>
          <small>Across portfolio</small>
        </div>
      </div>
      <div className="reports-grid">
        <section className="data-section report-panel">
          <div className="section-heading section-heading-padded">
            <div>
              <h2>Planned vs actual progress</h2>
              <p>
                Which active projects are falling behind their approved
                baseline?
              </p>
            </div>
          </div>
          <div className="bar-chart">
            {bars.map((bar) => (
              <div className="bar-row" key={bar.label}>
                <strong>{bar.label}</strong>
                <div className="bar-track">
                  <span
                    className="bar-plan"
                    style={{ width: `${bar.planned}%` }}
                  />
                  <span
                    className="bar-actual"
                    style={{ width: `${bar.actual}%` }}
                  />
                </div>
                <small
                  className={
                    bar.actual < bar.planned - 3 ? "deadline-late" : ""
                  }
                >
                  {bar.status}
                </small>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="legend-plan">Planned</span>
            <span className="legend-actual">Actual</span>
          </div>
        </section>
        <section className="data-section report-panel">
          <div className="section-heading section-heading-padded">
            <div>
              <h2>Overdue work by function</h2>
              <p>Where is overdue work currently concentrated?</p>
            </div>
          </div>
          <div className="function-list">
            <div>
              <span>Procurement</span>
              <strong>3</strong>
              <i style={{ width: "75%" }} />
            </div>
            <div>
              <span>Engineering</span>
              <strong>2</strong>
              <i style={{ width: "50%" }} />
            </div>
            <div>
              <span>Fabrication</span>
              <strong>1</strong>
              <i style={{ width: "25%" }} />
            </div>
            <div>
              <span>Quality</span>
              <strong>1</strong>
              <i style={{ width: "25%" }} />
            </div>
          </div>
        </section>
      </div>
      <section className="data-section report-table">
        <div className="section-heading section-heading-padded">
          <div>
            <h2>Projects requiring management attention</h2>
            <p>
              Projects with schedule variance or unresolved high-severity
              issues.
            </p>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Schedule variance</th>
              <th>Overdue tasks</th>
              <th>Open issues</th>
              <th>Primary cause</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>FF-2408</strong>
                <small>Aster Biologics</small>
              </td>
              <td className="deadline-late">−8%</td>
              <td>3</td>
              <td>3</td>
              <td>Agitator seal delivery delay</td>
            </tr>
            <tr>
              <td>
                <strong>FF-2403</strong>
                <small>Kaveri Nutrients</small>
              </td>
              <td className="deadline-late">−4%</td>
              <td>2</td>
              <td>2</td>
              <td>Weld map review backlog</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

function TeamView() {
  const members = [
    ["Anita Rao", "Project Director", "Administrator", "5 projects", "Active"],
    [
      "Rohan Mehta",
      "Procurement Lead",
      "Project member",
      "3 projects",
      "Active",
    ],
    ["Meera Shah", "Quality Manager", "Project member", "4 projects", "Active"],
    [
      "Suresh Patil",
      "Fabrication Supervisor",
      "Contributor",
      "2 projects",
      "Active",
    ],
    ["Nikhil Desai", "Quality Engineer", "Contributor", "2 projects", "Active"],
    [
      "Vikram Joshi",
      "Site Installation Lead",
      "Project member",
      "1 project",
      "Active",
    ],
  ]
  return (
    <>
      <ViewHeader
        eyebrow="Administration"
        title="Team & access"
        description="Workspace membership, roles, and project access."
        action={
          <CompactButton primary>
            <AppIcon name="plus" />
            Invite member
          </CompactButton>
        }
      />
      <div className="access-note">
        <div>
          <strong>Role-based access</strong>
          <span>
            Administrators manage workspace settings. Project members can manage
            assigned projects. Contributors update assigned work.
          </span>
        </div>
        <button type="button">Review role permissions</button>
      </div>
      <section className="data-section">
        <Toolbar>
          <div className="filter-tabs">
            <button className="active">
              Members <span>24</span>
            </button>
            <button>
              Pending invites <span>2</span>
            </button>
          </div>
          <label className="table-search">
            <AppIcon name="search" />
            <input placeholder="Search members" aria-label="Search members" />
          </label>
        </Toolbar>
        <div className="table-scroll">
          <table className="data-table team-table">
            <thead>
              <tr>
                <th>Team member</th>
                <th>Role</th>
                <th>Access level</th>
                <th>Project access</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member[0]}>
                  <td>
                    <Person name={member[0]} />
                    <small>
                      {member[0].toLowerCase().replace(" ", ".")}@northstar.in
                    </small>
                  </td>
                  <td>{member[1]}</td>
                  <td>{member[2]}</td>
                  <td>{member[3]}</td>
                  <td>
                    <StatusTag tone="green">{member[4]}</StatusTag>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label={`Actions for ${member[0]}`}
                    >
                      <AppIcon name="dots" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Workspace({ navigate }: { navigate: (screen: Screen) => void }) {
  const [view, setView] = useState<WorkspaceView>("project")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const labels: Record<WorkspaceView, string> = {
    portfolio: "Projects",
    project: "FF-2408",
    tasks: "Tasks",
    issues: "Issues & blockers",
    activity: "Activity log",
    reports: "Reports",
    team: "Team & access",
  }
  const nav = [
    { view: "portfolio" as WorkspaceView, label: "Projects", icon: "projects" },
    {
      view: "tasks" as WorkspaceView,
      label: "Tasks",
      icon: "tasks",
      count: "14",
    },
    {
      view: "issues" as WorkspaceView,
      label: "Issues & blockers",
      icon: "issues",
      count: "3",
    },
    {
      view: "activity" as WorkspaceView,
      label: "Activity log",
      icon: "activity",
    },
    { view: "reports" as WorkspaceView, label: "Reports", icon: "reports" },
  ]
  const choose = (next: WorkspaceView) => {
    setView(next)
    setSidebarOpen(false)
  }
  return (
    <main className="app-shell">
      <aside className={`app-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Logo compact />
        </div>
        <div className="org-switcher">
          <span className="org-monogram">NS</span>
          <div>
            <strong>Northstar Process</strong>
            <small>Manufacturing workspace</small>
          </div>
          <span>⌄</span>
        </div>
        <nav className="primary-nav" aria-label="Primary navigation">
          <span className="nav-label">Operations</span>
          {nav.map((item) => (
            <button
              key={item.view}
              className={
                view === item.view ||
                (view === "project" && item.view === "portfolio")
                  ? "active"
                  : ""
              }
              onClick={() => choose(item.view)}
            >
              <AppIcon name={item.icon} />
              <span>{item.label}</span>
              {item.count && <small>{item.count}</small>}
            </button>
          ))}
          <span className="nav-label nav-label-spaced">Workspace</span>
          <button
            className={view === "team" ? "active" : ""}
            onClick={() => choose("team")}
          >
            <AppIcon name="team" />
            <span>Team & access</span>
          </button>
        </nav>
        <div className="sidebar-foot">
          <div className="system-state">
            <span />
            <div>
              <strong>All systems operational</strong>
              <small>Last sync 2 min ago</small>
            </div>
          </div>
          <small>ForgeFlow v1.0</small>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <section className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <AppIcon name="menu" />
            </button>
            <div className="breadcrumbs">
              <button onClick={() => choose("portfolio")}>
                Northstar Process
              </button>
              <AppIcon name="chevron" />
              <span>{labels[view]}</span>
            </div>
          </div>
          <div className="topbar-right">
            <button className="global-search">
              <AppIcon name="search" />
              <span>Search projects, tasks, issues</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="notification-button" aria-label="Notifications">
              <AppIcon name="bell" />
              <span />
            </button>
            <div className="user-control">
              <button
                className="user-button"
                onClick={() => setUserOpen(!userOpen)}
              >
                <span className="person-avatar">AR</span>
                <span>
                  <strong>Anita Rao</strong>
                  <small>Project Director</small>
                </span>
                <span>⌄</span>
              </button>
              {userOpen && (
                <div className="user-menu">
                  <button>Profile settings</button>
                  <button>Workspace settings</button>
                  <button onClick={() => navigate("signin")}>Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="app-content">
          {view === "portfolio" && (
            <Portfolio openProject={() => setView("project")} />
          )}
          {view === "project" && <ProjectDetail setView={setView} />}
          {view === "tasks" && <TasksView />}
          {view === "issues" && <IssuesView />}
          {view === "activity" && <ActivityView />}
          {view === "reports" && <ReportsView />}
          {view === "team" && <TeamView />}
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("workspace")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [screen])

  if (screen === "workspace") return <Workspace navigate={setScreen} />

  return (
    <Shell>
      {screen === "signin" && <SignIn navigate={setScreen} />}
      {screen === "create" && <CreateAccount navigate={setScreen} />}
      {screen === "forgot" && <ForgotPassword navigate={setScreen} />}
      {screen === "reset-sent" && <ResetSent navigate={setScreen} />}
      {screen === "setup" && <OrganizationSetup navigate={setScreen} />}
    </Shell>
  )
}
