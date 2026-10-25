import { useState } from "react";
import {
  Mail,
  CalendarDays,
  Pencil,
  LockKeyhole,
  Sparkles,
  Heart,
  BriefcaseBusiness,
  Brain,
  Sun,
  Star,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const zodiacDates = {
  Aries: "Mar 21 – Apr 19",
  Taurus: "Apr 20 – May 20",
  Gemini: "May 21 – Jun 20",
  Cancer: "Jun 21 – Jul 22",
  Leo: "Jul 23 – Aug 22",
  Virgo: "Aug 23 – Sep 22",
  Libra: "Sep 23 – Oct 22",
  Scorpio: "Oct 23 – Nov 21",
  Sagittarius: "Nov 22 – Dec 21",
  Capricorn: "Dec 22 – Jan 19",
  Aquarius: "Jan 20 – Feb 18",
  Pisces: "Feb 19 – Mar 20",
};

const horoscopeContent = {
  Aries: {
    overview:
      "Take initiative, but leave room for other perspectives. Small, consistent steps can bring clarity this week.",
    love: "Honest conversations can help strengthen a connection.",
    career: "Focus on one important goal before taking on something new.",
    mood: "Energetic",
    luckyColor: "Red",
  },
  Taurus: {
    overview:
      "A steady pace may serve you better than rushing. Give yourself time to appreciate the progress you've made.",
    love: "Patience and thoughtful gestures can make a difference.",
    career: "Review your priorities and build on what already works.",
    mood: "Grounded",
    luckyColor: "Green",
  },
  Gemini: {
    overview:
      "Curiosity can lead to useful conversations and fresh ideas. Make space for listening as well as sharing.",
    love: "A playful conversation could open the door to connection.",
    career: "Brainstorming may help you find a new approach.",
    mood: "Curious",
    luckyColor: "Yellow",
  },
  Cancer: {
    overview:
      "Pay attention to your emotional needs and protect time for rest. Clear boundaries can make relationships easier.",
    love: "Being open about your feelings may bring greater understanding.",
    career: "Trust preparation more than last-minute pressure.",
    mood: "Reflective",
    luckyColor: "Silver",
  },
  Leo: {
    overview:
      "Let confidence guide you without overshadowing collaboration. Your creativity deserves room to grow.",
    love: "Warmth and appreciation can help a bond deepen.",
    career: "Share your ideas and stay open to feedback.",
    mood: "Confident",
    luckyColor: "Gold",
  },
  Virgo: {
    overview:
      "Organizing small details can free up energy for bigger ambitions. Remember that progress doesn't require perfection.",
    love: "Thoughtful attention matters more than grand gestures.",
    career: "A practical plan can make a complicated task manageable.",
    mood: "Focused",
    luckyColor: "Navy",
  },
  Libra: {
    overview:
      "Look for balance between your own needs and the needs of others. A calm decision can be more valuable than a quick one.",
    love: "Make room for mutual understanding and honest dialogue.",
    career: "Cooperation could help resolve a lingering issue.",
    mood: "Harmonious",
    luckyColor: "Pink",
  },
  Scorpio: {
    overview:
      "Give important decisions time to settle. A thoughtful approach may reveal options that aren't obvious at first.",
    love: "Trust grows through consistency and clear communication.",
    career: "Protect your focus and finish what matters most.",
    mood: "Determined",
    luckyColor: "Maroon",
  },
  Sagittarius: {
    overview:
      "Stay open to learning something unexpected. New ideas are useful when paired with realistic next steps.",
    love: "Shared experiences can create opportunities to connect.",
    career: "Explore a fresh idea while keeping your priorities clear.",
    mood: "Adventurous",
    luckyColor: "Purple",
  },
  Capricorn: {
    overview:
      "Your persistence can help you move forward. Leave some flexibility in your plans so you can adapt when needed.",
    love: "Reliability and honest expectations support closeness.",
    career: "Break a long-term ambition into achievable tasks.",
    mood: "Ambitious",
    luckyColor: "Charcoal",
  },
  Aquarius: {
    overview:
      "An unconventional idea may be worth exploring. Balance independence with input from people you trust.",
    love: "A meaningful conversation may begin with genuine curiosity.",
    career: "Try a different perspective on a familiar challenge.",
    mood: "Inventive",
    luckyColor: "Electric Blue",
  },
  Pisces: {
    overview:
      "Make space for imagination while staying connected to practical needs. Quiet reflection may help you clarify your priorities.",
    love: "Gentleness and direct communication can reduce misunderstandings.",
    career: "Creative thinking works best with a clear next step.",
    mood: "Imaginative",
    luckyColor: "Sea Green",
  },
};

function getWeekRange() {
  const now = new Date();
  const start = new Date(now);
  const day = (now.getDay() + 6) % 7;

  start.setDate(now.getDate() - day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const options = { month: "short", day: "numeric" };

  return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleDateString(
    "en-US",
    {
      ...options,
      year: "numeric",
    },
  )}`;
}

function HoroscopeCard({ zodiacSign, onZodiacChange }) {
  const prediction = horoscopeContent[zodiacSign];

  return (
    <section className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />

      <div className="card-body p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">
                Cosmic insights
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-2">Your weekly horoscope</h2>
            <p className="text-sm text-base-content/60 mt-1">
              {getWeekRange()}
            </p>
          </div>

          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
            <Star size={30} className="text-primary" />
          </div>
        </div>

        <div className="divider my-1" />

        <label className="form-control w-full max-w-xs">
          <span className="label-text font-medium mb-2">Your zodiac sign</span>

          <select
            className="select select-bordered w-full"
            value={zodiacSign}
            onChange={(e) => onZodiacChange(e.target.value)}
          >
            <option value="">Choose your zodiac sign</option>
            {zodiacSigns.map((sign) => (
              <option key={sign} value={sign}>
                {sign} · {zodiacDates[sign]}
              </option>
            ))}
          </select>
        </label>

        {!prediction ? (
          <div className="rounded-2xl bg-base-200 p-6 text-center mt-2">
            <Sparkles size={32} className="mx-auto text-primary mb-3" />
            <h3 className="font-bold">Discover your weekly forecast</h3>
            <p className="text-sm text-base-content/60 mt-2">
              Select your zodiac sign to explore this week's reading.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-primary/10 p-5 mt-2">
              <p className="text-sm text-primary font-semibold">
                {zodiacSign} · {zodiacDates[zodiacSign]}
              </p>

              <h3 className="text-xl font-bold mt-2">
                Your week, in the stars
              </h3>

              <p className="text-sm leading-6 mt-2 text-base-content/80">
                {prediction.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="rounded-xl border border-base-300 p-4">
                <Heart className="text-pink-500 mb-3" size={22} />
                <h3 className="font-bold">Love & connections</h3>
                <p className="text-sm text-base-content/70 mt-2 leading-6">
                  {prediction.love}
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <BriefcaseBusiness className="text-blue-500 mb-3" size={22} />
                <h3 className="font-bold">Career & goals</h3>
                <p className="text-sm text-base-content/70 mt-2 leading-6">
                  {prediction.career}
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <Brain className="text-violet-500 mb-3" size={22} />
                <h3 className="font-bold">Your energy</h3>
                <p className="text-sm text-base-content/70 mt-2">
                  This week's theme:{" "}
                  <span className="font-semibold">{prediction.mood}</span>
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <Sun className="text-amber-500 mb-3" size={22} />
                <h3 className="font-bold">Lucky color</h3>
                <p className="text-sm text-base-content/70 mt-2">
                  {prediction.luckyColor}
                </p>
              </div>
            </div>

            <p className="text-xs text-base-content/50 leading-5 mt-2">
              For fun and self-reflection only. Astrology is not a
              scientifically established way to predict the future.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [zodiacSign, setZodiacSign] = useState(user?.zodiacSign || "");

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Your Name";

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-base-200/60">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="mb-7">
          <p className="text-sm text-primary font-bold uppercase tracking-wider">
            Your space
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
            My profile
          </h1>
          <p className="text-base-content/60 mt-2">
            Your identity, your interests, your cosmic forecast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Profile */}
          <section className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 via-secondary/60 to-violet-400" />

            <div className="card-body p-5 sm:p-6 pt-0">
              <div className="flex justify-between items-end -mt-12">
                <div className="avatar placeholder">
                  <div className="w-24 h-24 rounded-2xl ring-4 ring-base-100 bg-primary text-primary-content">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={fullName}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold">{initials}</span>
                    )}
                  </div>
                </div>

                <div className="badge badge-success badge-outline mb-2">
                  <span className="w-2 h-2 bg-success rounded-full mr-1" />
                  My account
                </div>
              </div>

              <h2 className="text-2xl font-extrabold mt-3">{fullName}</h2>

              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <Mail size={15} />
                <span className="break-all">{user.email}</span>
              </div>

              {memberSince && (
                <div className="flex items-center gap-2 text-sm text-base-content/60 mt-1">
                  <CalendarDays size={15} />
                  <span>Member since {memberSince}</span>
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-2 text-sm text-base-content/60 mt-1">
                  <MapPin size={15} />
                  <span>{user.location}</span>
                </div>
              )}

              <div className="divider my-1" />

              <div>
                <h3 className="font-bold mb-2">About me</h3>
                <p className="text-sm leading-6 text-base-content/75 whitespace-pre-wrap">
                  {user.about || "You haven't added a bio yet."}
                </p>
              </div>

              <div className="mt-2">
                <h3 className="font-bold mb-3">Skills & interests</h3>

                {user.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="badge badge-lg bg-primary/10 text-primary border-0 py-4"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-base-content/50">
                    Add your skills to tell people more about yourself.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate("/settings")}
                >
                  <Pencil size={17} />
                  Update profile
                  <ArrowRight size={17} className="ml-auto" />
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => navigate("/settings")}
                >
                  <LockKeyhole size={17} />
                  Change password
                  <ArrowRight size={17} className="ml-auto" />
                </button>
              </div>
            </div>
          </section>

          {/* Horoscope */}
          <div className="lg:col-span-3">
            <HoroscopeCard
              zodiacSign={zodiacSign}
              onZodiacChange={setZodiacSign}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
