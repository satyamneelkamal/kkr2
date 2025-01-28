import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";
 
export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  gradientColors = {
    start: "#3b82f6",
    middle: "#60a5fa",
    end: "#93c5fd",
    base: "#1d4ed8"
  }
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const gradientStyle = `radial-gradient(circle farthest-side at 0 100%,${gradientColors.start},transparent),
                        radial-gradient(circle farthest-side at 100% 0,${gradientColors.middle},transparent),
                        radial-gradient(circle farthest-side at 100% 100%,${gradientColors.end},transparent),
                        radial-gradient(circle farthest-side at 0 0,${gradientColors.base},#141316)`;

  return (
    <div className={cn("relative p-[2px] group", containerClassName)}>
      {/* Outer glow */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background: gradientStyle
        }}
        className={cn(
          "absolute inset-0 rounded-xl z-[1] opacity-40 group-hover:opacity-75 blur-xl transition duration-500"
        )}
      />

      {/* Main border gradient */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          background: gradientStyle
        }}
        className={cn(
          "absolute inset-0 rounded-xl z-[1]"
        )}
      />

      {/* 3D effect layers */}
      <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/5 to-transparent z-[2]" />
      <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-t from-black/20 to-transparent z-[2]" />
      
      {/* Content container with inner shadow */}
      <div className={cn(
        "relative z-10 rounded-[11px] bg-gradient-to-b from-black/90 to-black/80",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.8)]",
        className
      )}>
        {children}
      </div>
    </div>
  );
};