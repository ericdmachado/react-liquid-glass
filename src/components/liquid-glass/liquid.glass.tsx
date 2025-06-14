import React, { forwardRef } from "react";
import { SVGFilterElement } from "./svg.filter";
import "./liquid-glass.css";

type LiquidGlassProps = {
  children: React.ReactNode;
  distortion?: number;
  radius?: number;
  distance?: number;
  depth?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ children, distortion, radius, distance, depth, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className="liquid-glass">
        <div className="inner">
          <div className="content">{children}</div>
          <div className="speculate" />
          <div className="filter">
            <SVGFilterElement
              distortion={distortion}
              radius={radius}
              distance={distance}
              depth={depth}
            />
          </div>
        </div>
      </div>
    );
  }
);
LiquidGlass.displayName = "LiquidGlass";
