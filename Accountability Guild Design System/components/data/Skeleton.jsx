import React from "react";

export function Skeleton({ variant = "line", className }) {
  return <span className={["skel", `skel-${variant}`, className].filter(Boolean).join(" ")} />;
}

export function SkeletonRow({ className }) {
  return (
    <div className={["skel-row", className].filter(Boolean).join(" ")}>
      <Skeleton variant="circle" />
      <div>
        <Skeleton variant="line" />
        <Skeleton variant="short" />
      </div>
    </div>
  );
}
