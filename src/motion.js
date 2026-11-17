// Parallax building blocks. Everything here runs on Motion values, so scrolling and
// pointer movement never re-render React. All of it switches off under prefers-reduced-motion.
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

const STILL = [0, 0];
const PointerContext = createContext(null);

// Tracks the pointer as -0.5..0.5 across the viewport, smoothed with a spring.
export function PointerProvider({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const move = (e) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y, reduce]);

  return <PointerContext.Provider value={{ x: sx, y: sy }}>{children}</PointerContext.Provider>;
}

export const usePointer = () => useContext(PointerContext);

// Shifts its child against the pointer. A bigger depth reads as nearer to the viewer.
export function Depth({ depth, className, children }) {
  const pointer = usePointer();
  const x = useTransform(pointer.x, (v) => v * -depth);
  const y = useTransform(pointer.y, (v) => v * -depth);
  return <motion.div className={className} style={{ x, y }}>{children}</motion.div>;
}

// True from 721px up, where the wall has room for the wider parallax moves.
export function useWide() {
  const query = '(min-width: 721px)';
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia(query);
    const update = () => setWide(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return wide;
}

// Moves, turns or slides its element while it crosses the viewport.
// x, y and rotate are [from, to] pairs; `live` styles apply only while the motion is on.
export function Travel({ as = 'div', x, y, rotate, when = true, offset = ['start end', 'end start'], base, live, className, children, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const tx = useTransform(scrollYProgress, [0, 1], x || STILL);
  const ty = useTransform(scrollYProgress, [0, 1], y || STILL);
  const tr = useTransform(scrollYProgress, [0, 1], rotate || STILL);
  const on = when && !reduce;
  const style = on
    ? { ...base, ...live, ...(x ? { x: tx } : null), ...(y ? { y: ty } : null), ...(rotate ? { rotate: tr } : null) }
    : base;
  const Tag = motion[as];
  return <Tag ref={ref} className={className} style={style} {...rest}>{children}</Tag>;
}

// A sheet being pasted up: it arrives leaning away from the wall and presses flat.
// `tilt` is the [from, to] resting rotation of the sheet in degrees.
export function Paste({ className, tilt = STILL, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], tilt);
  const style = reduce ? undefined : { rotateX, y, rotate, transformPerspective: 1600, transformOrigin: '50% 0%' };
  return <motion.div ref={ref} className={className} style={style}>{children}</motion.div>;
}

// Leans its child toward the pointer by a few degrees.
export function Lean({ className, rest = 0, children }) {
  const pointer = usePointer();
  const reduce = useReducedMotion();
  const rotateX = useTransform(pointer.y, (v) => v * -4);
  const rotateY = useTransform(pointer.x, (v) => v * 5);
  const style = reduce ? undefined : { rotateX, rotateY, rotate: rest, transformPerspective: 1400 };
  return <motion.div className={className} style={style}>{children}</motion.div>;
}

// One plane of the hero: `progress` runs 0..1 as the hero scrolls away.
// Positive `to` lags behind the scroll (far), negative runs ahead of it (near).
export function Plane({ progress, to, twist = 0, on, className, children }) {
  const y = useTransform(progress, [0, 1], ['0vh', `${to}vh`]);
  const rotate = useTransform(progress, [0, 1], [0, twist]);
  return <motion.div className={className} style={on ? { y, rotate } : undefined}>{children}</motion.div>;
}
