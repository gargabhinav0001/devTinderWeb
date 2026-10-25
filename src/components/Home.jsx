import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Users,
  Sparkles,
  Send,
  Menu,
  X,
  Camera,
  Compass,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find your people",
    description:
      "Discover people who share your interests and make every connection count.",
  },
  {
    icon: Camera,
    title: "Share your moments",
    description:
      "Post photos, stories, and little moments that make your world unique.",
  },
  {
    icon: MessageCircle,
    title: "Keep the conversation going",
    description:
      "Turn a simple hello into a meaningful friendship, one chat at a time.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="hero-glow min-h-screen text-base-content">
      {/* Navigation */}
      <header className="navbar mx-auto max-w-7xl px-5 py-5 md:px-10">
        <a href="#home" className="flex items-center gap-2 text-2xl font-black">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
            <MessageCircle size={23} />
          </span>
          mingle<span className="text-secondary">.</span>
        </a>

        <nav className="ml-auto hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-base-content/70 hover:text-white"
          >
            Features
          </a>
          <a
            href="#community"
            className="text-sm text-base-content/70 hover:text-white"
          >
            Community
          </a>
          <a
            href="#about"
            className="text-sm text-base-content/70 hover:text-white"
          >
            About
          </a>
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex md:ml-8">
          <a href="/login" className="btn btn-ghost btn-sm">
            Log in
          </a>
          <a href="/signup" className="btn btn-primary btn-sm rounded-xl px-5">
            Sign up <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          className="btn btn-ghost btn-square ml-auto md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <div className="absolute left-4 right-4 top-20 z-50 flex flex-col gap-4 rounded-2xl border border-white/10 bg-base-200 p-5 shadow-xl md:hidden">
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#community" onClick={() => setMenuOpen(false)}>
              Community
            </a>
            <a href="/login" className="btn btn-outline">
              Log in
            </a>
            <a href="/signup" className="btn btn-primary">
              Sign up
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20 lg:grid-cols-2"
      >
        <div className="relative z-10">
          <div className="badge badge-outline mb-7 gap-2 border-primary/50 px-4 py-4 text-primary-content/90">
            <Sparkles size={15} className="text-secondary" />
            YOUR PEOPLE. YOUR MOMENTS.
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Your world,
            <br />
            your people,
            <br />
            <span className="text-gradient">your Mingle.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-base-content/65 sm:text-lg">
            More than a social app. It’s where new friendships begin, stories
            come alive, and your everyday moments bring people closer. Find your
            people and make every connection matter.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="btn btn-primary btn-lg rounded-2xl px-7 shadow-lg shadow-primary/25"
            >
              Get started free <ArrowRight size={19} />
            </a>
            <a
              href="#community"
              className="btn btn-outline btn-lg rounded-2xl border-white/20 px-7"
            >
              Explore Mingle
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-base-content/55">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              Your space, your people
            </span>
            <span className="flex items-center gap-2">
              <Zap size={18} className="text-secondary" />
              Easy connections
            </span>
          </div>
        </div>

        {/* Social feed preview */}
        <div id="community" className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-6 rounded-[3rem] bg-primary/15 blur-3xl" />

          <div className="card relative border border-white/10 bg-base-200/90 shadow-2xl backdrop-blur-xl">
            <div className="card-body gap-5 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="w-11 rounded-full bg-primary text-white">
                      <Users size={21} />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold">Your community</h2>
                    <p className="text-xs text-base-content/50">
                      Good vibes, great people
                    </p>
                  </div>
                </div>
                <span className="badge badge-success badge-outline">
                  Online
                </span>
              </div>

              <article className="overflow-hidden rounded-2xl border border-white/10 bg-base-100">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85"
                  alt="Friends enjoying time together outdoors"
                  className="h-60 w-full object-cover sm:h-72"
                />

                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                      Community moments
                    </p>
                    <h3 className="mt-2 text-xl font-bold">
                      Little moments, big memories ✨
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-base-content/60">
                      Life feels better when it’s shared. Who’s making your day
                      better?
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-4 text-sm text-base-content/65">
                      <span className="flex items-center gap-1.5">
                        <Heart size={18} className="text-secondary" />
                        2.4k
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={18} className="text-primary" />
                        128
                      </span>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      aria-label="Share post"
                    >
                      <Send size={17} />
                    </button>
                  </div>
                </div>
              </article>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Connect", icon: Users },
                  { label: "Discover", icon: Compass },
                  { label: "Share", icon: Camera },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-base-100/70 p-3"
                  >
                    <Icon size={21} className="text-primary" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -right-3 top-12 hidden -rotate-6 rounded-2xl border border-white/10 bg-base-200 p-4 shadow-xl sm:block">
            <span className="text-2xl">💜</span>
            <p className="mt-1 text-xs font-semibold">Spread good vibes</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/10 bg-base-200/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-primary">
              Made for connection
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Good things happen when we{" "}
              <span className="text-gradient">mingle.</span>
            </h2>
            <p className="mt-5 leading-7 text-base-content/60">
              Everything you need to express yourself, find your community, and
              stay close to the people who matter.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="card border border-white/10 bg-base-200/80 transition duration-300 hover:-translate-y-2 hover:border-primary/50"
              >
                <div className="card-body p-7">
                  <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="card-title text-xl">{title}</h3>
                  <p className="mt-2 leading-7 text-base-content/60">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section id="about" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-base-200 to-secondary/10 p-8 text-center sm:p-14">
          <Sparkles size={32} className="mx-auto text-secondary" />
          <h2 className="mt-5 text-3xl font-black sm:text-5xl">
            Your next connection is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-base-content/65">
            Join Mingle and start sharing your world. Because the best stories
            are the ones we create together.
          </p>
          <a
            href="/signup"
            className="btn btn-primary btn-lg mt-8 rounded-2xl px-8"
          >
            Join Mingle today <ArrowRight size={19} />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-7 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-base-content/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Mingle. Made for meaningful
            connections.
          </p>
          <div className="flex gap-5">
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
