import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export const SplitLines = ({
  lines,
  as: Tag = "h1",
  className,
  lineClassName,
  accentIndex,
  delay = 0,
  stagger = 0.11,
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <Tag ref={ref} className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName, i === accentIndex && "text-copper")}
            initial={{ y: "112%", rotate: 1.5 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const Reveal = ({ children, className, delay = 0, y = 28, ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }}
    transition={{ duration: 1, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Rule = ({ className, light }) => (
  <motion.div
    className={cn("h-px w-full origin-left", light ? "bg-black/15" : "bg-white/10", className)}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, ease: EASE }}
  />
);

export { EASE };
