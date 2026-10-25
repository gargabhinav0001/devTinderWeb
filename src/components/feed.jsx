import { useState } from "react";

const profiles = [
  {
    id: 1,
    name: "Sophia",
    age: 24,
    location: "New York, USA",
    bio: "Coffee lover ☕ | Traveling the world 🌎",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    interests: ["Travel", "Coffee", "Music"],
  },
  {
    id: 2,
    name: "Emma",
    age: 26,
    location: "London, UK",
    bio: "Adventure seeker. Always chasing sunsets 🌅",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    interests: ["Hiking", "Photography", "Art"],
  },
  {
    id: 3,
    name: "Olivia",
    age: 23,
    location: "Paris, France",
    bio: "Foodie by nature, artist by heart 🎨",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    interests: ["Food", "Art", "Movies"],
  },
  {
    id: 4,
    name: "Isabella",
    age: 25,
    location: "Toronto, Canada",
    bio: "Making memories, one trip at a time ✈️",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    interests: ["Travel", "Fitness", "Books"],
  },
  {
    id: 5,
    name: "Mia",
    age: 27,
    location: "Sydney, Australia",
    bio: "Beach days and good vibes only 🌊",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800",
    interests: ["Beach", "Music", "Fitness"],
  },
];

export default function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const currentProfile = profiles[currentIndex];
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  const handleSwipe = (direction) => {
    if (isAnimating || !currentProfile) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    if (direction === "right") {
      setAccepted((prev) => [...prev, currentProfile.id]);
    } else {
      setRejected((prev) => [...prev, currentProfile.id]);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 400);
  };

  const resetFeed = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
    setIsAnimating(false);
    setAccepted([]);
    setRejected([]);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Feed */}
      <main className="flex flex-col items-center px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Discover people</h1>
        <p className="text-base-content/60 mb-8">
          Swipe right to like, left to pass.
        </p>

        {currentIndex < profiles.length ? (
          <>
            {/* Stacked cards */}
            <div className="relative w-full max-w-sm h-[490px]">
              {[...visibleProfiles].reverse().map((profile) => {
                const offset = profile.id - currentProfile.id;
                const isCurrent = offset === 0;

                let animationClass = "";

                if (isCurrent && swipeDirection === "right") {
                  animationClass =
                    "translate-x-[150%] rotate-[25deg] opacity-0";
                } else if (isCurrent && swipeDirection === "left") {
                  animationClass =
                    "-translate-x-[150%] -rotate-[25deg] opacity-0";
                }

                return (
                  <div
                    key={profile.id}
                    className={`card absolute inset-0 overflow-hidden bg-base-100 shadow-xl transition-all duration-400 ease-out ${
                      isCurrent
                        ? `z-30 ${animationClass}`
                        : "pointer-events-none"
                    }`}
                    style={{
                      zIndex: 30 - offset,
                      transform: isCurrent
                        ? undefined
                        : `translateY(${offset * 12}px) scale(${
                            1 - offset * 0.045
                          })`,
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Profile image */}
                    <figure className="relative h-full w-full">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                        draggable="false"
                      />

                      {/* Image gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

                      {/* Profile details */}
                      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                        <div className="flex items-end gap-2">
                          <h2 className="text-4xl font-bold">{profile.name}</h2>
                          <span className="mb-1 text-2xl">{profile.age}</span>
                        </div>

                        <p className="mt-2 text-sm">📍 {profile.location}</p>

                        <p className="mt-3">{profile.bio}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {profile.interests.map((interest) => (
                            <span
                              key={interest}
                              className="badge badge-outline border-white/70 text-white"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Swipe labels */}
                      {isCurrent && swipeDirection && (
                        <div
                          className={`absolute top-8 ${
                            swipeDirection === "right"
                              ? "left-6 rotate-[-15deg] text-success"
                              : "right-6 rotate-[15deg] text-error"
                          } rounded-lg border-4 border-current px-4 py-2 text-3xl font-black`}
                        >
                          {swipeDirection === "right" ? "LIKE" : "NOPE"}
                        </div>
                      )}
                    </figure>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <button
                className="btn btn-circle btn-lg border-2 border-error bg-base-100 text-error shadow-md hover:bg-error hover:text-white"
                onClick={() => handleSwipe("left")}
                disabled={isAnimating}
                aria-label="Reject profile"
              >
                <span className="text-3xl">✕</span>
              </button>

              <button
                className="btn btn-circle btn-lg border-2 border-success bg-base-100 text-success shadow-md hover:bg-success hover:text-white"
                onClick={() => handleSwipe("right")}
                disabled={isAnimating}
                aria-label="Accept profile"
              >
                <span className="text-3xl">♥</span>
              </button>
            </div>

            <p className="mt-5 text-sm text-base-content/50">
              Profile {currentIndex + 1} of {profiles.length}
            </p>
          </>
        ) : (
          /* Empty state */
          <div className="card mt-10 w-full max-w-sm bg-base-100 shadow-xl">
            <div className="card-body items-center py-12 text-center">
              <div className="text-6xl">💖</div>
              <h2 className="card-title mt-3">You're all caught up!</h2>
              <p className="text-base-content/60">
                You've seen all the profiles.
              </p>

              <div className="mt-3 flex gap-3">
                <div className="badge badge-success badge-lg">
                  ♥ {accepted.length} liked
                </div>
                <div className="badge badge-error badge-lg">
                  ✕ {rejected.length} passed
                </div>
              </div>

              <button className="btn btn-primary mt-5" onClick={resetFeed}>
                Start Again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
