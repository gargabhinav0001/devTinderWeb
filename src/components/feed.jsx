import { useState, useEffect } from "react";
import { getFeed } from "../actions/feed";

const ANIMATION_DURATION = 500;

export default function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeeds = async () => {
      try {
        setLoading(true);

        const response = await getFeed({ page: 1, limit: 10 });

        if (response.status === 200) {
          setProfiles(response.data);
        } else {
          console.error("Failed to fetch feed:", response.message);
        }
      } catch (err) {
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false);
      }
    };

    getFeeds();
  }, []);

  const currentProfile = profiles[currentIndex];

  // Keep the original index while reversing the cards.
  const visibleProfiles = profiles
    .slice(currentIndex, currentIndex + 3)
    .map((profile, index) => ({
      profile,
      stackOffset: index,
    }))
    .reverse();

  const handleSwipe = (direction) => {
    if (isAnimating || !currentProfile) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    // MongoDB uses _id, so support both _id and id.
    const profileId = currentProfile._id ?? currentProfile.id;

    if (direction === "right") {
      setAccepted((prev) => [...prev, profileId]);
    } else {
      setRejected((prev) => [...prev, profileId]);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  const resetFeed = () => {
    setCurrentIndex(0);
    setSwipeDirection(null);
    setIsAnimating(false);
    setAccepted([]);
    setRejected([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-lg font-semibold text-base-content/70">
          Loading feed...
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-lg font-semibold text-base-content/70">
          No profiles available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <main className="flex flex-col items-center px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Discover people</h1>

        <p className="text-base-content/60 mb-8">
          Swipe right to like, left to pass.
        </p>

        {currentIndex < profiles.length ? (
          <>
            {/* Stacked cards */}
            <div className="relative w-full max-w-sm h-[490px]">
              {visibleProfiles.map(({ profile, stackOffset }) => {
                const isCurrent = stackOffset === 0;

                let animationClass = "";

                if (isCurrent && swipeDirection === "right") {
                  animationClass =
                    "translate-x-[150%] rotate-[25deg] opacity-0";
                }

                if (isCurrent && swipeDirection === "left") {
                  animationClass =
                    "-translate-x-[150%] -rotate-[25deg] opacity-0";
                }

                return (
                  <div
                    key={profile._id ?? profile.id}
                    className={`
                      card absolute inset-0 overflow-hidden
                      bg-base-100 shadow-xl
                      ${
                        isCurrent
                          ? `z-30 transition-all duration-500 ease-out will-change-transform ${animationClass}`
                          : "pointer-events-none transition-all duration-300 ease-out"
                      }
                    `}
                    style={{
                      zIndex: 30 - stackOffset,
                      transform: isCurrent
                        ? undefined
                        : `translateY(${stackOffset * 12}px) scale(${1 - stackOffset * 0.045})`,
                      transformOrigin: "top center",
                    }}
                  >
                    <figure className="relative h-full w-full">
                      <img
                        src={profile.photoUrl}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="h-full w-full object-cover"
                        draggable="false"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

                      {/* Profile details */}
                      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                        <div className="flex items-end gap-2">
                          <h2 className="text-4xl font-bold">
                            {profile.firstName} {profile.lastName}
                          </h2>

                          <span className="mb-1 text-2xl">{profile.age}</span>
                        </div>

                        <p className="mt-2 text-sm">
                          📍 {profile.location || "Location not specified"}
                        </p>

                        <p className="mt-3">{profile.about}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {(profile.skills ?? []).map((interest) => (
                            <span
                              key={interest}
                              className="badge badge-outline border-white/70 text-white"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* LIKE / NOPE labels */}
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
