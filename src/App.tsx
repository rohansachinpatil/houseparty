import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  Clock,
  Heart,
  LockKeyhole,
  MapPin,
  Moon,
  Music2,
  Plus,
  Shirt,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Users,
  X,
} from "lucide-react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  DiyaIllustration,
  DiyaMark,
  MarigoldToran,
  PartyScene,
  RangoliHalo,
  VermilionSeal,
} from "@/components/artwork";
import djCrewArtwork from "@/img/desi-dance-party-dj-crew.webp";
import { AvatarGuide } from "@/components/avatar-guide";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PARTY_START = new Date(2026, 10, 8, 19, 0, 0);
const PHOTO_DAY_START = new Date(2026, 10, 8, 0, 0, 0);
const PHOTO_DAY_END = new Date(2026, 10, 9, 0, 0, 0);
const PARTY_DATE_LABEL = "Sunday, November 8, 2026";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, delay, ease: "easeOut" as const },
});

const vibeCards = [
  {
    icon: Shirt,
    title: "Fits",
    description: "Main-character energy, but make it festive. Retro kurtas and thrifted dupattas? Absolutely ate.",
    href: "#fits",
    className: "vibe-pink",
    link: "Fit check",
  },
  {
    icon: Music2,
    title: "Playlist",
    description: "Indie, Bollywood and throwbacks that still go hard. Bring one song for the aux queue.",
    href: "#sound",
    className: "vibe-teal",
    link: "Peek the queue",
  },
  {
    icon: UtensilsCrossed,
    title: "Feast",
    description: "Mithai, chaat, snacks and festive mocktails. The snack table will not survive long.",
    href: "#night",
    className: "vibe-red",
    link: "Snack intel",
  },
  {
    icon: Sparkles,
    title: "After hours",
    description: "Terrace yap sessions, unserious dance moves and the legendary 'one last song.'",
    href: "#night",
    className: "vibe-green",
    link: "Run the plan",
  },
];

const timeline = [
  ["7:00 PM", "Doors open, diyas lit, welcome drinks. The function has entered the chat."],
  ["8:00 PM", "Mithai, chaat and a very serious snack side quest."],
  ["9:00 PM", "Dance-floor era. Throwbacks get first dibs."],
  ["10:30 PM", "Terrace yap session and a little fresh air."],
  ["11:30 PM", "'One last song.' Famous last words."],
];

const fits = [
  { title: "Marigold pop", copy: "Bright kurtas, gold jhumkas, bold lips. The fit understood the assignment.", icon: Sparkles, color: "fit-gold" },
  { title: "Indie thrift", copy: "Block prints, vintage dupattas, chunky silver. Thrift-store main character.", icon: Heart, color: "fit-pink" },
  { title: "Midnight glam", copy: "Velvet, sequins and sharp bandhgalas. Extra? Correct.", icon: Starburst, color: "fit-violet" },
  { title: "Soft festive", copy: "Ivory chikankari with a pop of pink. Low-key, high impact.", icon: Shirt, color: "fit-teal" },
];

const tracks = [
  ["Iktara", "4:12", "soft start"],
  ["Aaj Jaane Ki Zid Na Karo", "5:21", "old-school feels"],
  ["Gul", "3:48", "indie moment"],
  ["Raataan Lambiyan", "3:30", "sing-it-loud"],
];

const partyQuestions = [
  {
    question: "Can I bring friends?",
    answer: "Friends and friends of friends are welcome. Add your group size to the RSVP preview so the host can plan.",
  },
  {
    question: "Is there food?",
    answer: "Mithai, chaat and snacks are on the plan, with vegetarian options. Come hungry; the snacks understood the assignment.",
  },
  {
    question: "What time should I head home?",
    answer: "The night winds down around midnight. If you're under 18, sort your ride home with someone you trust before you come. Safety first, always.",
  },
  {
    question: "Can I bring sparklers?",
    answer: "Check with the host first. Anything with a flame needs adult supervision and must follow local safety rules. No exceptions—cute pics aren't worth a risky situation.",
  },
];

function Starburst() {
  return (
    <svg aria-hidden="true" className="starburst-icon" fill="none" viewBox="0 0 64 64">
      <path d="m32 3 7 19 19-7-11 17 14 13-21-1-8 17-7-19-20 6 12-17L3 38l21 1L32 3Z" fill="currentColor" stroke="var(--ink)" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-ribbon fixed inset-x-0 top-0 z-[70] h-1 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "night" : "day"} colors`}
      aria-pressed={theme === "dark"}
      className="theme-toggle"
      onClick={onToggle}
      type="button"
    >
      {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      <span>{theme === "light" ? "Night vibe" : "Day vibe"}</span>
    </button>
  );
}

function SiteNav({ theme, onThemeToggle }: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  return (
    <nav aria-label="Main navigation" className="top-nav">
      <a aria-label="Diwali house party, back to top" className="brand" href="#home">
        <span>Diwali house party</span>
      </a>
      <div className="nav-links">
        <a href="#vibe">Vibe check</a>
        <a href="#night">The plan</a>
        <a href="#fits">Fits</a>
        <a href="#photos">Photo drop</a>
      </div>
      <div className="nav-actions">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <Button asChild className="party-btn nav-rsvp" size="sm">
          <a href="#rsvp">RSVP <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </Button>
      </div>
    </nav>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, PARTY_START.getTime() - Date.now()));

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, PARTY_START.getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = Math.floor(remaining / 1000);
  const values = [
    ["d", Math.floor(seconds / 86400)],
    ["h", Math.floor((seconds % 86400) / 3600)],
    ["m", Math.floor((seconds % 3600) / 60)],
    ["s", seconds % 60],
  ] as const;

  return (
    <div aria-label="Countdown to the party" className="countdown" role="timer">
      <p className="countdown-label">The function starts in</p>
      <div className="countdown-grid">
        {values.map(([unit, value]) => (
          <div className="countdown-unit" key={unit}>
            <b>{String(value).padStart(2, "0")}</b>
            <small>{unit === "d" ? "days" : unit === "h" ? "hrs" : unit === "m" ? "mins" : "secs"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoBall() {
  return (
    <svg aria-hidden="true" className="disco-ball" viewBox="0 0 80 132">
      <path d="M40 0v25" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="40" cy="69" r="34" fill="#dce2ff" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="40" cy="69" r="26" fill="none" stroke="var(--blue)" strokeDasharray="2 5" strokeWidth="8" />
      <path d="M9 69h62M40 38v62" stroke="var(--ink)" strokeOpacity=".65" strokeWidth="2" />
      <circle cx="40" cy="69" r="6" fill="var(--gold)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 72]);

  return (
    <header id="home" ref={heroRef} className="poster hero s te ht">
      <motion.div aria-hidden="true" className="rays-layer" style={{ y: drift }}>
        <div className="rays" />
      </motion.div>
      <div aria-hidden="true" className="lights" />
      <DiscoBall />
      <MarigoldToran className="hero-toran" />
      <div className="hero-sticker">Teens +<br />Gen Z<br />pull up</div>
      <motion.div {...fadeUp(0.05)} className="hero-copy">
        <p className="hero-kicker"><span />Diwali plans just dropped<span /></p>
        <h1>Ghar Pe.</h1>
        <span className="hero-tag">Your people. Your Diwali era.</span>
        <p className="hero-lede">Good people. Banger playlist. <em>Elite mithai situation.</em></p>
        <p className="hero-note">Pull up in a fit. Stay till the aux says "one more."</p>
      </motion.div>

      <motion.div {...fadeUp(0.14)} className="scene-wrap">
        <img
          alt="Friends in vibrant festive outfits dancing around a DJ deck"
          className="scene"
          decoding="async"
          draggable={false}
          fetchPriority="high"
          src={djCrewArtwork}
        />
      </motion.div>

      <motion.div {...fadeUp(0.22)} className="event-pill-row">
        <span className="event-pill"><CalendarDays aria-hidden="true" />{PARTY_DATE_LABEL}</span>
        <span className="event-pill"><Clock aria-hidden="true" />7:00 PM onwards</span>
        <span className="event-pill"><MapPin aria-hidden="true" />Nashik · exact address after RSVP</span>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="hero-bottom">
        <Countdown />
        <Button asChild className="party-btn party-btn-large">
          <a href="#rsvp">Okay, I&apos;m in <ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
        </Button>
      </motion.div>
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading-row">
      <motion.div {...fadeUp(0)}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </motion.div>
      {description ? <motion.p {...fadeUp(0.08)} className="section-copy">{description}</motion.p> : null}
    </div>
  );
}

function IntroSection() {
  return (
    <section className="s pk ht">
      <div className="w intro-banner">
        <motion.h2 {...fadeUp(0)}>Good people.<br />Banger playlist.<br />No mithai left.</motion.h2>
        <motion.div {...fadeUp(0.1)} className="intro-side">
          <p>Diyas are getting lit, the aux is warming up and the mithai is about to be gone. Come for the fits, stay for the unserious dancing, leave with a new inside joke. The vibes? Immaculate. The choreography? Allegedly.</p>
          <Button asChild className="party-btn">
            <a href="#rsvp">Say less, RSVP <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = "Fit check, obviously ✦ Stay for one more song ✦ Take the pics ✦ Save room for gulab jamun ✦ Make a new inside joke ✦ ";
  return (
    <div className="marquee" aria-label={words}>
      <div aria-hidden="true" className="marquee-track"><span>{words}{words}</span></div>
    </div>
  );
}

function VibeSection() {
  return (
    <section className="s bl ht" id="vibe">
      <div className="w">
        <SectionHeading
          title={<>The <span className="text-gold">vibe.</span></>}
          description="Festive friends, familiar faces and memories that become lore by breakfast. Vibe check: passed."
        />
        <div className="vibe-cards">
          {vibeCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                {...fadeUp(index * 0.07)}
                className={`vibe-card ${card.className}`}
                href={card.href}
              >
                <div className="vibe-art">
                  <Icon aria-hidden="true" className="vibe-icon" strokeWidth={1.5} />
                  {index === 0 ? <VermilionSeal className="vibe-stamp" /> : null}
                  {index === 1 ? <span className="equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></span> : null}
                  {index === 2 ? <DiyaIllustration className="vibe-diya" /> : null}
                  {index === 3 ? <RangoliHalo className="vibe-rangoli" /> : null}
                </div>
                <h3>{card.title}<ArrowRight aria-hidden="true" className="h-5 w-5" /></h3>
                <p>{card.description}</p>
                <span className="vibe-link">{card.link}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NightSection() {
  return (
    <section className="s cr" id="night">
      <div className="w">
        <SectionHeading
          title={<>How the <span className="text-crim">night goes.</span></>}
          description="No one's clock-watching. Here's the loose plan for when the good stuff happens—mainly so you can time the snack side quest."
        />
        <div className="timeline-grid">
          {timeline.map(([time, description], index) => (
            <motion.article {...fadeUp(index * 0.06)} className="timeline-card" key={time}>
              <b>{time}</b>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FitsSection() {
  return (
    <section className="s cr fits-section" id="fits">
      <div className="w">
        <SectionHeading
          title={<>Festive fits,<br /><span className="text-blue">your way.</span></>}
          description="Festive, not formal. Extra if you want, comfy if you want. Wear the fit you've been waiting to hard-launch."
        />
        <div className="fits-grid">
          {fits.map((fit, index) => {
            const Icon = fit.icon;
            return (
              <motion.article {...fadeUp(index * 0.08)} className={`fit-card ${fit.color}`} key={fit.title}>
                <div className="fit-art"><Icon aria-hidden="true" strokeWidth={1.3} /></div>
                <h3>{fit.title}</h3>
                <p>{fit.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SoundSection() {
  return (
    <section className="s gn ht" id="sound">
      <div className="w sound-grid">
        <motion.div {...fadeUp(0)}>
          <h2>Soundtrack<br />to the night.</h2>
          <p className="sound-copy">Indie, Bollywood and throwbacks that still go hard. Got a must-play? Drop it in the RSVP preview and let the aux queue cook.</p>
          <Button asChild className="party-btn">
          <a href="#rsvp">Claim your aux moment <Music2 aria-hidden="true" className="h-4 w-4" /></a>
          </Button>
        </motion.div>
        <motion.div {...fadeUp(0.12)} className="record-stack">
          <div aria-hidden="true" className="record-art">
            <div className="record-disc"><span /></div>
            <div className="record-arm" />
            <span className="record-star">✦</span>
          </div>
          <ol className="playlist" aria-label="Playlist picks">
            {tracks.map(([title, duration, mood], index) => (
              <li key={title}>
                <span className="track-number">0{index + 1}</span>
                <span className="track-name"><b>{title}</b><small>{mood}</small></span>
                <span className="track-duration">{duration}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

type PhotoPreview = { id: string; src: string; name: string };
type PhotoWindow = "before" | "open" | "closed";

function getPhotoWindow(): PhotoWindow {
  const now = Date.now();
  if (now < PHOTO_DAY_START.getTime()) return "before";
  if (now < PHOTO_DAY_END.getTime()) return "open";
  return "closed";
}

function PhotoDropSection() {
  const [photoWindow, setPhotoWindow] = useState<PhotoWindow>(getPhotoWindow);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<PhotoPreview[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const refresh = () => setPhotoWindow(getPhotoWindow());
    const timer = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => {
    photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.src));
  }, []);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const currentWindow = getPhotoWindow();
    if (currentWindow !== "open") {
      setPhotoWindow(currentWindow);
      return;
    }
    const files = Array.from(event.currentTarget.files ?? []);
    const accepted = files.filter((file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024);
    if (accepted.length !== files.length) {
      setNotice("Image files only, up to 10 MB each. Keep it cute—and local: this is just a browser preview.");
    } else {
      setNotice("");
    }
    const added = accepted.map((file, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
      src: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((current) => {
      const next = [...current, ...added];
      photosRef.current = next;
      return next;
    });
    event.currentTarget.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const removed = current.find((photo) => photo.id === id);
      const next = current.filter((photo) => photo.id !== id);
      if (removed) URL.revokeObjectURL(removed.src);
      photosRef.current = next;
      return next;
    });
  }

  function scrollGallery(direction: -1 | 1) {
    galleryRef.current?.scrollBy({ left: direction * 330, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section className="s cm ht photo-section" id="photos">
      <div className="w">
        <div className="photo-title-row">
          <div>
            <p className="eyebrow eyebrow-light"><Camera aria-hidden="true" /> The photo drop</p>
            <h2>The camera roll<br />has <span>lore.</span></h2>
            <p className="photo-intro">Drop your favorite moments here. The photo wall opens on party day only—no early-access plot twists.</p>
          </div>
          <DiyaIllustration className="photo-diya" />
        </div>

        <div className="photo-status-bar">
          {photoWindow === "before" ? (
            <p><LockKeyhole aria-hidden="true" /> Photo drop opens Sunday, Nov 8, at midnight in your local time zone.</p>
          ) : photoWindow === "open" ? (
            <p><Sparkles aria-hidden="true" /> It&apos;s party day. Drop the pics (with permission, please)!</p>
          ) : (
            <p><LockKeyhole aria-hidden="true" /> Photo drop is closed. The memories are now officially lore.</p>
          )}
          <div className="gallery-arrows">
            <button aria-label="Scroll photos left" disabled={photoWindow !== "open" || photos.length < 2} onClick={() => scrollGallery(-1)} type="button"><ArrowLeft /></button>
            <button aria-label="Scroll photos right" disabled={photoWindow !== "open" || photos.length < 2} onClick={() => scrollGallery(1)} type="button"><ArrowRight /></button>
          </div>
        </div>

        {photoWindow === "open" ? (
          <>
            <input
              ref={inputRef}
              accept="image/*"
              aria-label="Choose party photos from this device"
              className="sr-only"
              multiple
              onChange={handleFiles}
              type="file"
            />
            <div aria-label="Party photo gallery. Scroll horizontally to see more." className="photo-gallery" ref={galleryRef} role="list" tabIndex={0}>
              {photos.length === 0 ? (
                <div className="photo-empty" role="listitem">
                  <VermilionSeal className="photo-empty-seal" />
                  <Camera aria-hidden="true" />
                  <b>First pic? Yours.</b>
                  <span>Start the camera-roll lore.</span>
                </div>
              ) : photos.map((photo, index) => (
                <figure className="photo-tile" key={photo.id} role="listitem">
                  <img alt={`Party photo ${index + 1}`} loading="lazy" src={photo.src} />
                  <figcaption><span>{photo.name}</span><button aria-label={`Remove photo ${index + 1}`} onClick={() => removePhoto(photo.id)} type="button"><X /></button></figcaption>
                </figure>
              ))}
              <button className="photo-add-tile" onClick={() => inputRef.current?.click()} role="listitem" type="button">
                <span className="add-circle"><Plus aria-hidden="true" /></span>
                <b>Add photos</b>
                <small>This device only</small>
              </button>
            </div>
            <p aria-live="polite" className="photo-notice">{notice}</p>
            <p className="photo-privacy"><Heart aria-hidden="true" /> Ask before sharing someone else&apos;s face. This demo keeps photo previews in this browser session; nothing is uploaded.</p>
          </>
        ) : (
          <div className={`photo-locked ${photoWindow === "closed" ? "is-closed" : ""}`}>
            <div className="locked-art"><PartyScene /></div>
            <div>
              {photoWindow === "before" ? <LockKeyhole aria-hidden="true" /> : <Check aria-hidden="true" />}
              <b>{photoWindow === "before" ? "The wall is on standby." : "The memories are now lore."}</b>
              <p>{photoWindow === "before" ? "Come back on party day to add pics. No early uploads—we mean it." : "The photo drop only runs on party day. Hope the night was iconic."}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DetailsSection() {
  const facts = [
    { icon: CalendarDays, label: "Date", value: PARTY_DATE_LABEL },
    { icon: Clock, label: "Time", value: "7:00 PM onwards" },
    { icon: MapPin, label: "Where", value: "Nashik · exact address shared after RSVP" },
    { icon: Shirt, label: "Dress code", value: "Festive fits. Come as you are." },
    { icon: Users, label: "Who’s invited", value: "Friends and friends of friends. Teens + Gen Z." },
    { icon: Sparkles, label: "Bring", value: "A fit, an appetite and one aux-worthy song." },
  ];

  return (
    <section className="s cr" id="details">
      <div className="w">
        <SectionHeading title={<>No cap: the <span className="text-pink">details.</span></>} />
        <div className="detail-grid">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div {...fadeUp(index * 0.04)} className="detail-item" key={fact.label}>
                <Icon aria-hidden="true" />
                <div><b>{fact.label}</b><span>{fact.value}</span></div>
              </motion.div>
            );
          })}
        </div>
        <p className="safety-note"><Heart aria-hidden="true" /> Under 18? Make sure someone you trust knows your plan and how you&apos;re getting home. Safe ride home = non-negotiable.</p>
      </div>
    </section>
  );
}

function RsvpSection() {
  const [submittedName, setSubmittedName] = useState("");

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setSubmittedName(String(values.get("name") ?? "friend").trim() || "friend");
  }

  return (
    <section className="s pk ht rsvp-section" id="rsvp">
      <div className="w rsvp-wrap">
        <motion.div {...fadeUp(0)} className="rsvp-copy">
          <p className="eyebrow"><DiyaMark className="eyebrow-diya" /> Your move</p>
          <h2>Are you in<br />or are you in?</h2>
          <p>Help the host plan the mithai math. Fill in the RSVP preview—just a heads-up, this demo doesn't send or save your details.</p>
          <div className="rsvp-sticker"><span>Nov</span><b>08</b><span>2026</span></div>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="rsvp-panel">
          <form onSubmit={submitRsvp}>
            <label>Your name<Input autoComplete="name" name="name" placeholder="Name, please" required /></label>
            <label>Phone or Instagram<Input autoComplete="off" name="contact" placeholder="So the host can reach you" required /></label>
            <label>Are you pulling up?
              <select defaultValue="yes" name="coming">
                <option value="yes">Yes, say less</option>
                <option value="maybe">Maybe—still deciding</option>
              </select>
            </label>
            <label>Bringing your people?
              <select defaultValue="solo" name="guests">
                <option value="solo">Just me</option>
                <option value="plus-one">+1</option>
                <option value="plus-two">+2</option>
              </select>
            </label>
            <label className="form-full">Your aux pick<Input name="song" placeholder="Optional: the song we have to play" /></label>
            <Button className="party-btn form-full" size="lg" type="submit">
              {submittedName ? "Preview is ready" : "Run the RSVP preview"}
              {submittedName ? <Check aria-hidden="true" className="h-5 w-5" /> : <ArrowRight aria-hidden="true" className="h-5 w-5" />}
            </Button>
          </form>
          <p className="form-note">Demo disclaimer: this form doesn't send or store your details. The host shares the address after RSVP; this preview doesn't notify them.</p>
          <p aria-live="polite" className="rsvp-status">{submittedName ? `Preview ready, ${submittedName}! This demo didn't send your info, so the host won't get a notification.` : ""}</p>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="s cr faq-section" id="faq">
      <div className="w">
        <SectionHeading title={<>The tea, answered.</>} />
        <div className="faq-list">
          {partyQuestions.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}<span>+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="#home"><DiyaMark className="footer-mark" /><b>Ghar Pe.</b></a>
      <p>This Diwali plan? It ate.</p>
      <a className="back-top" href="#home">Back to the top <ArrowRight aria-hidden="true" /></a>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">
      <>
        <div className="site-frame">
          <ScrollProgress />
          <SiteNav theme={theme} onThemeToggle={() => setTheme((current) => current === "light" ? "dark" : "light")} />
          <main>
            <Hero />
            <IntroSection />
            <Marquee />
            <VibeSection />
            <NightSection />
            <FitsSection />
            <SoundSection />
            <PhotoDropSection />
            <DetailsSection />
            <RsvpSection />
            <FaqSection />
          </main>
          <SiteFooter />
        </div>
        <AvatarGuide />
      </>
    </MotionConfig>
  );
}
