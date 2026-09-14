import React from "react";

const AVATAR_TONES = ["", "av-ink", "av-accent", "av-dust", "av-shadow", "av-sage"];

function toneForId(id) {
  if (!id) return AVATAR_TONES[0];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % AVATAR_TONES.length;
  return AVATAR_TONES[hash];
}

export function Avatar({ initial, userId, size = "md", className }) {
  const tone = toneForId(userId);
  return (
    <span className={["av", `av-${size}`, tone, className].filter(Boolean).join(" ")}>
      {initial}
    </span>
  );
}

export function AvatarStack({ children, more, className }) {
  return (
    <span className={["av-stack", className].filter(Boolean).join(" ")}>
      {children}
      {more ? <span className="av av-md av-more">+{more}</span> : null}
    </span>
  );
}
