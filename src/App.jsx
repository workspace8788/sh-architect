import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Star,
  Sun,
  X,
} from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { process, projects, reasons, services, stats, testimonials, trustIcons } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Process', '#process'],
  ['Contact', '#contact'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-ivory text-ink selection:bg-champagne/30 dark:bg-ink dark:text-ivory">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Header dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink text-ivory"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 h-px w-28 bg-champagne" />
        <p className="font-display text-4xl tracking-[0.18em]">SH</p>
        <p className="mt-3 text-xs uppercase tracking-[0.42em] text-stone">Architects</p>
      </motion.div>
    </motion.div>
  )
}

function Header({ dark, setDark, menuOpen, setMenuOpen }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/45 backdrop-blur-2xl dark:bg-ink/55">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center border border-champagne/60 font-display text-xl text-champagne">
            SH
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.26em] text-white">
              Architects
            </span>
            <span className="block text-xs text-stone">Designing Spaces That Inspire.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <Link to="/projects" className="nav-link">
            Portfolio
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setDark(!dark)}
            className="icon-button text-white"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="hidden rounded-full bg-champagne px-5 py-3 text-sm font-semibold text-ink shadow-glow sm:inline-flex">
            Book Consultation
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="icon-button text-white lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 lg:hidden"
          >
            <div className="grid gap-1 px-5 py-5">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-3 py-3 text-sm uppercase tracking-[0.2em] text-stone"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/projects"
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-3 text-sm uppercase tracking-[0.2em] text-stone"
              >
                Portfolio
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.main>
  )
}

function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160])

  useGsapReveals()

  return (
    <PageShell>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=82')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/66 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory dark:from-ink" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-champagne">
              SH Architects | Akola
            </p>
            <h1 className="font-display text-[clamp(3.25rem,8vw,8.8rem)] leading-[0.9] text-white">
              Designing Timeless Spaces with Precision and Creativity.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-stone sm:text-lg">
              We transform ideas into elegant homes, commercial buildings, interiors, and master
              plans through thoughtful architecture and innovative design.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#projects" className="primary-button">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="secondary-button">
                Book Consultation
              </a>
            </div>
          </motion.div>
          <div className="absolute bottom-8 left-5 flex items-center gap-4 text-white/80 sm:left-8">
            <span className="h-px w-16 bg-champagne" />
            <span className="text-xs uppercase tracking-[0.32em]">Scroll</span>
            <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown size={18} />
            </motion.span>
          </div>
        </div>
      </section>

      <About />
      <Services />
      <ProjectsPreview />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
    </PageShell>
  )
}

function useGsapReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 84%' },
          },
        )
      })

      gsap.utils.toArray('.image-reveal').forEach((item) => {
        gsap.fromTo(
          item,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 78%' },
          },
        )
      })
    })
    return () => ctx.revert()
  }, [])
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="image-reveal relative min-h-[520px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80"
            alt="Minimal architectural geometry"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-white/12 p-6 text-white shadow-soft backdrop-blur-xl">
            <p className="font-display text-4xl">Designing Spaces That Inspire.</p>
            <p className="mt-3 text-sm text-stone">Architecture, interiors, planning, and landscape design.</p>
          </div>
        </div>
        <div className="reveal">
          <p className="section-eyebrow text-left">Who we are</p>
          <h2 className="section-title text-left">A design studio for clients who value clarity, restraint, and detail.</h2>
          <p className="mt-6 text-lg leading-9 text-concrete dark:text-stone">
            SH Architects works across architecture, interiors, town planning, landscaping, 3D
            visualization, and construction consultation. Our philosophy is simple: every space
            should feel beautiful, functional, and carefully resolved before it reaches site.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <InfoPanel title="Mission" copy="To create timeless spaces through thoughtful design, transparent process, and dependable execution." />
            <InfoPanel title="Vision" copy="To be a trusted architecture studio known for refined design and long-term client confidence." />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="border-l border-champagne/60 pl-5">
                <Counter value={value} />
                <p className="mt-2 text-sm text-concrete dark:text-stone">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoPanel({ title, copy }) {
  return (
    <div className="border border-ink/10 bg-white/55 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <h3 className="font-display text-3xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-concrete dark:text-stone">{copy}</p>
    </div>
  )
}

function Counter({ value }) {
  return <p className="font-display text-5xl text-champagne">{value}</p>
}

function Services() {
  return (
    <section id="services" className="section-pad bg-white/60 dark:bg-graphite">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Services"
          title="Complete design support from first conversation to final handover."
          copy="Each service is structured to reduce uncertainty, improve decisions, and make quality visible before work begins."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ title, copy, icon: Icon }) => (
            <motion.article
              key={title}
              whileHover={{ y: -8 }}
              className="reveal group border border-ink/10 bg-ivory/70 p-7 shadow-soft backdrop-blur transition dark:border-white/10 dark:bg-white/5"
            >
              <Icon className="mb-8 text-champagne" size={30} />
              <h3 className="font-display text-3xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-concrete dark:text-stone">{copy}</p>
              <span className="mt-8 block h-px w-12 bg-champagne transition-all group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsPreview() {
  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Featured Projects"
            title="A gallery of calm luxury, practical detail, and architectural confidence."
          />
          <Link to="/projects" className="secondary-button self-center lg:self-auto">
            Full Portfolio
          </Link>
        </div>
        <ProjectGrid compact />
      </div>
    </section>
  )
}

function ProjectGrid({ compact = false }) {
  const visibleProjects = compact ? projects : [...projects, ...projects].map((item, index) => ({
    ...item,
    title: index > 2 ? `${item.title} Study` : item.title,
    year: index > 2 ? '2023' : item.year,
  }))

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {visibleProjects.map((project, index) => (
        <motion.article
          key={`${project.title}-${index}`}
          whileHover={{ y: -10 }}
          className={`reveal group overflow-hidden bg-white shadow-soft dark:bg-white/5 ${
            index === 0 && compact ? 'lg:col-span-2' : ''
          }`}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/12 to-transparent opacity-90" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-champagne">{project.category}</p>
              <h3 className="mt-2 font-display text-4xl">{project.title}</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border border-t-0 border-ink/10 p-5 text-sm text-concrete dark:border-white/10 dark:text-stone">
            <span>{project.location}</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function WhyUs() {
  return (
    <section className="section-pad bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Why SH Architects"
          title="The confidence of a disciplined process with the softness of refined design."
        />
        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([reason, Icon]) => (
            <div key={reason} className="reveal bg-ink p-7">
              <Icon className="text-champagne" size={26} />
              <p className="mt-8 font-display text-2xl">{reason}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {trustIcons.map((Icon, index) => (
            <div key={index} className="reveal flex items-center gap-4 border-t border-white/10 pt-6">
              <Icon className="text-champagne" />
              <span className="text-sm uppercase tracking-[0.22em] text-stone">Trusted delivery</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="Our Process"
          title="A clear timeline keeps the project calm, accountable, and moving."
        />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-champagne/40 md:left-1/2 md:block" />
          <div className="grid gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: index % 2 ? 32 : -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`relative grid gap-6 md:grid-cols-2 ${index % 2 ? '' : 'md:text-right'}`}
              >
                <div className={index % 2 ? 'md:col-start-2' : ''}>
                  <div className="border border-ink/10 bg-white/60 p-7 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <span className="text-xs uppercase tracking-[0.28em] text-champagne">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-display text-4xl">{step}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 4200)
    return () => window.clearInterval(timer)
  }, [])

  const current = testimonials[active]

  return (
    <section className="section-pad bg-white/60 dark:bg-graphite">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionIntro eyebrow="Testimonials" title="Calm, considered feedback from clients." />
        <div className="reveal mt-14 border border-ink/10 bg-ivory/80 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-12">
          <div className="mb-8 flex justify-center gap-1 text-champagne" aria-label="Google rating 4.9 out of 5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={20} fill="currentColor" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-3xl leading-snug sm:text-5xl">"{current.quote}"</p>
              <p className="mt-8 text-sm uppercase tracking-[0.26em] text-concrete dark:text-stone">
                {current.name} | {current.role}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${active === index ? 'w-9 bg-champagne' : 'w-2 bg-concrete/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'Architecture', message: '' })

  const canSend = useMemo(() => form.name && form.phone && form.message, [form])

  const submit = async (event) => {
    event.preventDefault()
    if (!canSend) return
    setStatus('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, form, { publicKey })
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 650))
      }
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', service: 'Architecture', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <p className="section-eyebrow text-left">Contact</p>
          <h2 className="section-title text-left">Begin with a clear conversation.</h2>
          <p className="mt-6 text-lg leading-8 text-concrete dark:text-stone">
            Tell us what you are planning. We will help you understand the right design route,
            expected stages, and the first decisions that matter.
          </p>
          <div className="mt-10 space-y-5">
            <ContactLine icon={MapPin} text="Husaini Complex, Washim Bypass Road, Akola, Maharashtra 444001" />
            <ContactLine icon={Phone} text="+91 00000 00000" />
            <ContactLine icon={Mail} text="hello@sharchitects.in" />
          </div>
          <div className="mt-10 overflow-hidden border border-ink/10 shadow-soft dark:border-white/10">
            <iframe
              title="SH Architects office location"
              src="https://www.google.com/maps?q=Husaini%20Complex%2C%20Washim%20Bypass%20Road%2C%20Akola%2C%20Maharashtra%20444001&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="reveal border border-ink/10 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} required />
            <Field label="Phone" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} required />
            <Field label="Email" value={form.email} onChange={(email) => setForm({ ...form, email })} type="email" />
            <label className="field-label">
              Service
              <select
                value={form.service}
                onChange={(event) => setForm({ ...form, service: event.target.value })}
                className="field-input"
              >
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="field-label mt-5">
            Project brief
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              required
              rows="6"
              className="field-input resize-none"
            />
          </label>
          <button type="submit" disabled={!canSend || status === 'sending'} className="primary-button mt-7 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">
            {status === 'sending' ? 'Sending...' : 'Book Consultation'} <Send size={18} />
          </button>
          {status === 'sent' && <p className="mt-4 text-sm text-champagne">Inquiry received. The form is ready for EmailJS credentials.</p>}
          {status === 'error' && <p className="mt-4 text-sm text-red-500">Something went wrong. Please call or email the studio directly.</p>}
        </form>
      </div>
    </section>
  )
}

function Field({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="field-label">
      {label}
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      />
    </label>
  )
}

function ContactLine({ icon: Icon, text }) {
  return (
    <div className="flex gap-4 text-concrete dark:text-stone">
      <Icon className="mt-1 shrink-0 text-champagne" size={20} />
      <span className="leading-7">{text}</span>
    </div>
  )
}

function ProjectsPage() {
  useGsapReveals()

  return (
    <PageShell>
      <section className="bg-ink px-5 pb-20 pt-36 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-eyebrow text-left">Portfolio</p>
          <h1 className="max-w-4xl font-display text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.95]">
            Spaces shaped with discipline, elegance, and lasting value.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone">
            A curated selection across residences, commercial environments, interiors, and planning studies.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ProjectGrid />
        </div>
      </section>
    </PageShell>
  )
}

function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
        <div>
          <p className="font-display text-4xl text-champagne">SH</p>
          <p className="mt-3 text-sm text-stone">Designing Spaces That Inspire.</p>
        </div>
        <FooterColumn title="Quick Links" items={['About', 'Services', 'Projects', 'Process', 'Contact']} />
        <FooterColumn title="Services" items={services.slice(0, 4).map((service) => service.title)} />
        <div>
          <p className="footer-title">Office</p>
          <p className="mt-4 text-sm leading-7 text-stone">
            Husaini Complex, Washim Bypass Road, Akola, Maharashtra 444001
          </p>
          <p className="mt-6 text-sm text-stone">Instagram | Facebook | LinkedIn</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-xs uppercase tracking-[0.24em] text-stone">
        Copyright {new Date().getFullYear()} SH Architects. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <p className="footer-title">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <a key={item} href={`/#${item.toLowerCase().replaceAll(' ', '-')}`} className="text-sm text-stone transition hover:text-champagne">
            {item}
          </a>
        ))}
      </div>
    </div>
  )
}

export default App
