import { useEffect, useRef, useState } from "react";
import type {
  AvatarAnimationDefinition,
  AvatarDefinition,
  AvatarExpressionDefinition,
} from "@bible-strong/avatar-core";
import { createAvatar } from "@bible-strong/avatar-react";
import { motion, useReducedMotion } from "framer-motion";
import oneeAvatarDefinition from "@/avatars/onee.avatar.json";

const sectionMessages = {
  home: "Nashik, Nov 8 at 7 PM. Diwali plans just dropped.",
  vibe: "Festive fits, bangers and elite mithai. Say less.",
  night: "Snacks at 8, dancing at 9. Timing's a vibe, not law.",
  fits: "Festive, not formal. Main-character fit? Pull it off.",
  sound: "Indie, Bollywood, throwbacks. Drop an aux pick.",
  photos: "Photo previews stay in this browser session. No uploads.",
  details: "Nashik; exact address after RSVP. Under 18? Plan a safe ride.",
  rsvp: "RSVP is a preview. Your details aren't sent or saved.",
  faq: "Tap for the tea. Quick answers, no group-chat archaeology.",
} as const;

type SectionId = keyof typeof sectionMessages;
const sectionIds = Object.keys(sectionMessages) as SectionId[];

const gazeDirections = [
  { key: "gaze-up-left", x: -1, y: -1 },
  { key: "gaze-up", x: 0, y: -1 },
  { key: "gaze-up-right", x: 1, y: -1 },
  { key: "gaze-left", x: -1, y: 0 },
  { key: "gaze-center", x: 0, y: 0 },
  { key: "gaze-right", x: 1, y: 0 },
  { key: "gaze-down-left", x: -1, y: 1 },
  { key: "gaze-down", x: 0, y: 1 },
  { key: "gaze-down-right", x: 1, y: 1 },
] as const;

type GazeAnimationKey = (typeof gazeDirections)[number]["key"];
type ReactionAnimationKey = "react-hype" | "react-curious" | "react-joy";
type GuideAnimationKey = GazeAnimationKey | ReactionAnimationKey;
type Waypoint = { x: number; y: number };
type Viewport = { width: number; height: number };
type Rect = { left: number; top: number; right: number; bottom: number };
const bubbleSize = { width: 188, height: 112, gap: 10 } as const;

const gazeByGrid: Record<string, GazeAnimationKey> = {
  "-1,-1": "gaze-up-left",
  "-1,0": "gaze-up",
  "-1,1": "gaze-up-right",
  "0,-1": "gaze-left",
  "0,0": "gaze-center",
  "0,1": "gaze-right",
  "1,-1": "gaze-down-left",
  "1,0": "gaze-down",
  "1,1": "gaze-down-right",
};

const reactionKeys: ReactionAnimationKey[] = ["react-hype", "react-curious", "react-joy"];
const baseDefinition = oneeAvatarDefinition as AvatarDefinition;
const neutralExpression = baseDefinition.expressions.neutral;

const gazeExpressions = Object.fromEntries(
  gazeDirections.map(({ key, x, y }) => [
    key,
    {
      ...neutralExpression,
      head: { x: -y * 8, y: x * 13, z: x * 2 },
      eyes: {
        ...neutralExpression.eyes,
        left: {
          ...neutralExpression.eyes.left,
          x: x * 7,
          y: neutralExpression.eyes.left.y + y * 8,
        },
        right: {
          ...neutralExpression.eyes.right,
          x: x * 7,
          y: neutralExpression.eyes.right.y + y * 8,
        },
      },
      motion: { eyes: "microSaccades", body: "none" },
    } satisfies AvatarExpressionDefinition,
  ]),
) as Record<GazeAnimationKey, AvatarExpressionDefinition>;

function gazeAnimation(expression: GazeAnimationKey): AvatarAnimationDefinition {
  return {
    playbackMode: "loop",
    steps: [{ expression, holdMs: 60_000, transitionMs: 220, transition: "smooth" }],
    blink: { enabled: true, initialDelayMs: 1800, minIntervalMs: 3200, maxIntervalMs: 5800, durationMs: 230 },
    metadata: { label: "Follow gaze", group: "Guide" },
  };
}

function reactionAnimation(expressions: string[]): AvatarAnimationDefinition {
  return {
    playbackMode: "once",
    steps: expressions.map((expression) => ({
      expression,
      holdMs: 480,
      transitionMs: 180,
      transition: "spring",
    })),
    blink: { enabled: true, initialDelayMs: 1200, minIntervalMs: 1800, maxIntervalMs: 3400, durationMs: 220 },
    metadata: { label: "Party reaction", group: "Reactions" },
  };
}

const reactionAnimations: Record<ReactionAnimationKey, AvatarAnimationDefinition> = {
  "react-hype": reactionAnimation(["joyful-wide", "playful-right"]),
  "react-curious": reactionAnimation(["curious-left", "upward-side-glance"]),
  "react-joy": reactionAnimation(["joyful-down-right", "joyful-wide"]),
};

const avatarDefinition: AvatarDefinition = {
  ...baseDefinition,
  expressions: { ...baseDefinition.expressions, ...gazeExpressions },
  expressionOrder: [...baseDefinition.expressionOrder, ...gazeDirections.map(({ key }) => key)],
  animations: {
    ...baseDefinition.animations,
    ...Object.fromEntries(gazeDirections.map(({ key }) => [key, gazeAnimation(key)])),
    ...reactionAnimations,
  },
  animationOrder: [
    ...baseDefinition.animationOrder,
    ...gazeDirections.map(({ key }) => key),
    ...reactionKeys,
  ],
};

const OneeAvatar = createAvatar(avatarDefinition);

const blockerSelector = [
  ".top-nav", ".hero-sticker", ".scene-wrap", ".event-pill", ".countdown", ".marquee", ".record-art",
  ".photo-tile", ".photo-empty", ".locked-art", "h1", "h2", "h3", "p", "a", "button", "input", "select", "textarea", "summary",
  ".vibe-card", ".timeline-card", ".fit-card", ".record-stack", ".photo-status-bar", ".photo-gallery",
  ".photo-locked", ".detail-item", ".rsvp-panel", ".faq-item",
].join(",");

function randomWaypoint(previous?: Waypoint): Waypoint {
  let next = { x: 0.5, y: 0.5 };
  let attempts = 0;

  do {
    next = { x: 0.1 + Math.random() * 0.8, y: 0.1 + Math.random() * 0.8 };
    attempts += 1;
  } while (
    previous &&
    attempts < 12 &&
    Math.abs(next.x - previous.x) + Math.abs(next.y - previous.y) < 0.32
  );

  return next;
}

function waypointRects(
  x: number,
  y: number,
  viewport: Viewport,
  bubbleOpen: boolean,
) {
  const avatarSize = 56;
  const avatar = { left: x, top: y, right: x + avatarSize, bottom: y + avatarSize };
  const rects: Rect[] = [avatar];
  let outsideArea = 0;
  let placement: "top" | "bottom" = "top";
  const side = x + avatarSize / 2 >= viewport.width / 2 ? "right" : "left";

  if (bubbleOpen) {
    const gutter = 12;
    const width = Math.min(bubbleSize.width, viewport.width - gutter * 2);
    const height = Math.min(bubbleSize.height, viewport.height * 0.35);
    const gap = bubbleSize.gap;
    placement = y - height - gap >= (viewport.width <= 560 ? 124 : 88) ? "top" : "bottom";
    const left = side === "right" ? x + avatarSize - width : x;
    const top = placement === "top" ? y - height - gap : y + avatarSize + gap;
    const bubble = { left, top, right: left + width, bottom: top + height };
    rects.push(bubble);

    const overflowLeft = Math.max(0, -bubble.left);
    const overflowRight = Math.max(0, bubble.right - viewport.width);
    const overflowTop = Math.max(0, -bubble.top);
    const overflowBottom = Math.max(0, bubble.bottom - viewport.height);
    outsideArea = (overflowLeft + overflowRight) * height + (overflowTop + overflowBottom) * width;
  }

  return { rects, outsideArea, side, placement };
}

function findSafeWaypoint(previous: Waypoint, viewport: Viewport, bubbleOpen: boolean): Waypoint {
  const avatarSize = 56;
  const gutter = 12;
  const topGap = viewport.width <= 560 ? 124 : 88;
  const maxY = Math.max(gutter, viewport.height - avatarSize - gutter);
  const safeTop = Math.min(topGap, maxY);
  const availableX = Math.max(0, viewport.width - avatarSize - gutter * 2);
  const availableY = Math.max(0, viewport.height - avatarSize - safeTop - gutter);
  const obstacles = Array.from(document.querySelectorAll(blockerSelector))
    .filter((element) => !element.closest(".avatar-guide") && element.getClientRects().length > 0)
    .map((element) => element.getBoundingClientRect())
    .filter((rect) => rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < viewport.width && rect.bottom > 0 && rect.top < viewport.height);
  const bestArea = Math.max(1, bubbleOpen ? 56 * 56 + bubbleSize.width * bubbleSize.height : 56 * 56);
  let best = randomWaypoint(previous);
  let bestScore = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < 96; attempt += 1) {
    const candidate = randomWaypoint(previous);
    const x = gutter + availableX * candidate.x;
    const y = safeTop + availableY * candidate.y;
    const { rects, outsideArea } = waypointRects(x, y, viewport, bubbleOpen);
    const overlapArea = rects.reduce((total, moving) => total + obstacles.reduce((area, obstacle) => {
      const width = Math.max(0, Math.min(moving.right, obstacle.right) - Math.max(moving.left, obstacle.left));
      const height = Math.max(0, Math.min(moving.bottom, obstacle.bottom) - Math.max(moving.top, obstacle.top));
      return area + width * height;
    }, 0), 0);
    const travel = Math.abs(candidate.x - previous.x) * availableX + Math.abs(candidate.y - previous.y) * availableY;
    const score = Math.min(1, (overlapArea + outsideArea) / bestArea) + (travel < 120 ? (120 - travel) / 120 * 0.08 : 0);

    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
    if (overlapArea === 0 && outsideArea === 0 && travel >= 120) return candidate;
  }

  return best;
}

function getClickMessage(element: Element, currentSection: SectionId) {
  if (element.closest("summary")) return "Tap to see the tea.";
  if (element.closest("input, select, textarea")) return "This RSVP preview doesn't send your details.";

  const link = element.closest<HTMLAnchorElement>("a[href^='#']");
  if (link) {
    const sectionId = link.hash.slice(1) as SectionId;
    if (sectionId in sectionMessages) return sectionMessages[sectionId];
  }

  const control = element.closest("button, a, [role='button']");
  if (control) {
    const label = (control.getAttribute("aria-label") || control.textContent || "").trim();
    if (/photo|upload/i.test(label)) return "Photo previews stay in this browser session. No uploads.";
    if (/rsvp|save my spot|coming/i.test(label)) return sectionMessages.rsvp;
  }

  return sectionMessages[currentSection];
}

export function AvatarGuide() {
  const reduceMotion = useReducedMotion();
  const guideRef = useRef<HTMLElement>(null);
  const currentSectionRef = useRef<SectionId>("home");
  const [viewport, setViewport] = useState<Viewport>(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const viewportRef = useRef(viewport);
  const [waypoint, setWaypoint] = useState<Waypoint>(() => randomWaypoint());
  const waypointRef = useRef(waypoint);
  const [message, setMessage] = useState<string>(sectionMessages.home);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const [animation, setAnimation] = useState<GuideAnimationKey>("gaze-center");
  const gazeAnimationRef = useRef<GazeAnimationKey>("gaze-center");
  const isReactingRef = useRef(false);
  const reactionIndexRef = useRef(0);
  const bubbleTimerRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const updateGazeRef = useRef<() => void>(() => {});

  function setSafeWaypoint(bubbleOpen: boolean) {
    const current = waypointRef.current;
    const next = findSafeWaypoint(current, viewportRef.current, bubbleOpen);
    waypointRef.current = next;
    setWaypoint(next);
  }

  function showMessage(nextMessage: string) {
    setMessage(nextMessage);
    setIsBubbleOpen(true);
    setSafeWaypoint(true);
    if (bubbleTimerRef.current !== null) window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => {
      setIsBubbleOpen(false);
      bubbleTimerRef.current = null;
      setSafeWaypoint(false);
    }, 4200);
  }

  function triggerReaction() {
    const nextReaction = reactionKeys[reactionIndexRef.current % reactionKeys.length];
    reactionIndexRef.current += 1;
    isReactingRef.current = true;
    setAnimation(nextReaction);
  }

  function updateGazeFromPointer() {
    const pointer = lastPointerRef.current;
    if (!pointer || isReactingRef.current) return;
    const avatar = guideRef.current?.querySelector<HTMLElement>(".avatar-guide-render");
    if (!avatar) return;

    const bounds = avatar.getBoundingClientRect();
    const dx = pointer.x - (bounds.left + bounds.width / 2);
    const dy = pointer.y - (bounds.top + bounds.height / 2);
    const column = dx < -bounds.width * 0.45 ? -1 : dx > bounds.width * 0.45 ? 1 : 0;
    const row = dy < -bounds.height * 0.45 ? -1 : dy > bounds.height * 0.45 ? 1 : 0;
    const next = gazeByGrid[`${row},${column}`];

    if (next === gazeAnimationRef.current) return;
    gazeAnimationRef.current = next;
    setAnimation(next);
  }
  updateGazeRef.current = updateGazeFromPointer;

  useEffect(() => {
    setSafeWaypoint(false);
    const updateViewport = () => {
      const next = { width: window.innerWidth, height: window.innerHeight };
      viewportRef.current = next;
      setViewport(next);
      setSafeWaypoint(guideRef.current?.dataset.bubble === "open");
      updateGazeRef.current();
    };
    window.addEventListener("resize", updateViewport, { passive: true });
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      updateGazeRef.current();
    }

    function handlePointerLeave(event: MouseEvent) {
      if (event.relatedTarget !== null) return;
      lastPointerRef.current = null;
      gazeAnimationRef.current = "gaze-center";
      if (!isReactingRef.current) setAnimation("gaze-center");
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseout", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseout", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!active) return;

        const nextSection = active.target.id as SectionId;
        if (nextSection === currentSectionRef.current) return;

        currentSectionRef.current = nextSection;
        showMessage(sectionMessages[nextSection]);
        triggerReaction();
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handlePageClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element) || guideRef.current?.contains(target)) return;

      showMessage(getClickMessage(target, currentSectionRef.current));
      triggerReaction();
    }

    document.addEventListener("click", handlePageClick, true);
    return () => document.removeEventListener("click", handlePageClick, true);
  }, []);

  useEffect(() => {
    updateGazeRef.current();
  }, [waypoint]);

  useEffect(() => () => {
    if (bubbleTimerRef.current !== null) window.clearTimeout(bubbleTimerRef.current);
  }, []);

  const gutter = 12;
  const topGap = viewport.width <= 560 ? 124 : 88;
  const availableX = Math.max(0, viewport.width - 56 - gutter * 2);
  const maxY = Math.max(gutter, viewport.height - 56 - gutter);
  const safeTop = Math.min(topGap, maxY);
  const availableY = Math.max(0, viewport.height - 56 - safeTop - gutter);
  const x = gutter + availableX * waypoint.x;
  const y = safeTop + availableY * waypoint.y;
  const side = x + 28 >= viewport.width / 2 ? "right" : "left";
  const placement = y - bubbleSize.height - bubbleSize.gap >= topGap ? "top" : "bottom";

  return (
    <motion.aside
      animate={{ x, y }}
      aria-label="Onee, your party guide"
      className="avatar-guide"
      data-bubble={isBubbleOpen ? "open" : "closed"}
      data-placement={placement}
      data-side={side}
      initial={false}
      onUpdate={() => updateGazeRef.current()}
      ref={guideRef}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 165, damping: 28, mass: 0.9 }}
    >
      <div
        aria-live="polite"
        className="avatar-guide-bubble"
        hidden={!isBubbleOpen}
        id="onee-guide-message"
        role="status"
      >
        <span className="avatar-guide-caption">Onee's take</span>
        <p>{message}</p>
      </div>
      <button
        aria-controls="onee-guide-message"
        aria-expanded={isBubbleOpen}
        aria-label={isBubbleOpen ? "Hide Onee's message" : "Ask Onee for the tea on this page"}
        className="avatar-guide-button"
        onClick={() => {
          if (isBubbleOpen) {
            if (bubbleTimerRef.current !== null) window.clearTimeout(bubbleTimerRef.current);
            bubbleTimerRef.current = null;
            setIsBubbleOpen(false);
            setSafeWaypoint(false);
          } else {
            showMessage(sectionMessages[currentSectionRef.current]);
          }
          triggerReaction();
        }}
        type="button"
      >
        <OneeAvatar
          animation={animation}
          ariaLabel="Onee, the party guide"
          className="avatar-guide-render"
          onAnimationEnd={(endedAnimation) => {
            if (endedAnimation === animation && reactionKeys.includes(endedAnimation as ReactionAnimationKey)) {
              isReactingRef.current = false;
              updateGazeRef.current();
            }
          }}
          size={52}
        />
      </button>
    </motion.aside>
  );
}
