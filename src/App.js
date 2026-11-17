import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Facebook, Instagram, Moon, Play, Sun, Youtube } from 'lucide-react';
import { contact, contactOlds, heroOlds, heroPosters, latest, projects, stats, techniques, toolkit, wall } from './data';
import { Depth, Lean, Paste, Plane, PointerProvider, Travel, useWide } from './motion';
import Player from './Player';

const socialIcons = { Instagram, YouTube: Youtube, Facebook };

// One edit as a poster: paper margin, tape, caption on the margin. The image drifts inside its frame.
function Poster({ index, tilt, meta = false, eager = false, onPlay }) {
  const project = projects[index];
  return (
    <button
      type="button"
      className={`p ${project.shape}`}
      style={{ '--rot': `${tilt}deg` }}
      onClick={() => onPlay(index)}
      aria-label={`Play ${project.title}`}
    >
      <span className="win">
        <Travel
          as="img"
          y={['-6%', '6%']}
          live={{ scale: 1.16 }}
          src={project.img}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          onError={(e) => e.currentTarget.classList.add('gone')}
        />
      </span>
      <span className="cap">
        {project.short}
        <span><Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />{project.year}</span>
      </span>
      {meta && <span className="meta">{project.category}, {project.software}<br />{project.description}</span>}
    </button>
  );
}

function Nav({ theme, onToggleTheme }) {
  return (
    <header className="top">
      <a className="mark" href="#top">xeka.</a>
      <nav className="tags" aria-label="Sections">
        <a className="tag" href="#work">Work</a>
        <a className="tag" href="#kit">Toolkit</a>
        <a className="tag k" href="#contact">Get in touch</a>
        <button
          type="button"
          className="tag icon"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to the day wall' : 'Switch to the night wall'}
        >
          {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
        </button>
      </nav>
    </header>
  );
}

// The hero has planes. As it scrolls away, far things (old posters, the lettering) lag behind
// and the taped posters run ahead and twist. The pointer shifts each plane by its depth.
function Hero({ onPlay }) {
  const ref = useRef(null);
  const wide = useWide();
  const reduce = useReducedMotion();
  const on = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="back">
        <div aria-hidden="true">
          {heroOlds.map(([index, left, top, width, tilt]) => (
            <div className="old" key={index} style={{ left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, rotate: `${tilt}deg` }}>
              <Plane progress={scrollYProgress} to={32} on={on}>
                <Depth depth={3}><img src={projects[index].img} alt="" /></Depth>
              </Plane>
            </div>
          ))}
        </div>
        <h1>
          <Plane className="xeka" progress={scrollYProgress} to={42} on={on}><Depth depth={6}>XEKA</Depth></Plane>
          <Plane className="creative" progress={scrollYProgress} to={22} on={on}><Depth depth={12}>Creative</Depth></Plane>
        </h1>
      </div>

      <div className="hposters">
        {heroPosters.map(([index, left, top, width, tilt, to, depth, twist]) => (
          <div className="hp" key={index} style={{ left: `${left}vw`, top: `${top}vw`, width: `${width}vw` }}>
            <Plane progress={scrollYProgress} to={to} twist={twist} on={on}>
              <Depth depth={depth}><Poster index={index} tilt={tilt} eager onPlay={onPlay} /></Depth>
            </Plane>
          </div>
        ))}
      </div>

      <Plane className="offer" progress={scrollYProgress} to={8} on={on}>
        <p>Video editor. <b>Open for commissions.</b><br />Short-form edits, YouTube videos, motion and 2D animation.</p>
        <div className="btns">
          <a className="btn" href="#contact">Get in touch</a>
          <button type="button" className="btn hollow" onClick={() => onPlay(latest)}>
            <Play size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />Play latest edit
          </button>
        </div>
      </Plane>
    </section>
  );
}

// Three columns of posters that travel at different speeds. From 721px up the heading is painted on
// the wall: it holds its place and fades back while the posters pass in front of it.
function Work({ onPlay }) {
  const ref = useRef(null);
  const wide = useWide();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const recede = useTransform(scrollYProgress, [0, 0.09], [1, 0.2]);
  const columnTravel = [[80, -80], [-70, 70], [160, -160]];

  return (
    <section className="work" id="work" ref={ref}>
      <motion.div className="wh" style={wide && !reduce ? { opacity: recede } : undefined}>
        <h2>The work</h2>
        <p>Nine edits, pasted up at full size. Pick a poster and it plays right here.</p>
      </motion.div>
      <div className="cols">
        {wall.map((column, n) => (
          <Travel className="col" key={n} y={columnTravel[n]} when={wide}>
            {column.map(([index, tilt], k) => (
              <Travel
                className={`slot${projects[index].shape === 'wide' ? ' w' : ''}`}
                key={index}
                rotate={k % 2 ? [2.2, -2.2] : [-1.8, 1.8]}
                when={wide}
              >
                <Poster index={index} tilt={tilt} meta onPlay={onPlay} />
              </Travel>
            ))}
          </Travel>
        ))}
      </div>
    </section>
  );
}

// One strip of tape with the techniques on it, pulled sideways by the scroll.
function Band() {
  const words = Array.from({ length: 5 }, () => techniques).flat();
  return (
    <div className="band" aria-hidden="true">
      <Travel x={['8vw', '-56vw']}>
        {words.map((word, n) => <span key={n}>{word}</span>)}
      </Travel>
    </div>
  );
}

// A printed bill pasted on the wall. Billing order is the skill level.
function Toolkit() {
  const lineTravel = [[-14, 14], [22, -22], [-28, 28], [32, -32]];
  return (
    <section className="kit" id="kit">
      <Paste className="sheet">
        <Lean className="bill" rest={0.7}>
          <h2>Toolkit</h2>
          {toolkit.map((group, n) => (
            <div className={`line l${n + 1}`} key={group.label}>
              <small>{group.label}</small>
              <Travel x={lineTravel[n]}>
                {group.items.map((item, k) => (
                  <React.Fragment key={item}>{k > 0 && <i>/</i>}{item}</React.Fragment>
                ))}
              </Travel>
            </div>
          ))}
        </Lean>
      </Paste>
      <p className="facts">
        {stats.map(([number, label]) => <span key={label}><b>{number}</b> {label}</span>)}
      </p>
    </section>
  );
}

// A tear-off flyer. Eight tabs to tear, but only the first is a tab stop,
// so a keyboard or a screen reader meets the address once.
function Contact() {
  const mailto = `mailto:${contact.email}`;
  const flutter = [4, -5, 2.5];
  return (
    <section className="contact" id="contact">
      <Travel className="ghost" x={['-10vw', '10vw']} aria-hidden="true">xeka.</Travel>
      <div aria-hidden="true">
        {contactOlds.map(([index, left, top, width, tilt]) => (
          <Travel
            className="old"
            key={index}
            y={[22, -22]}
            base={{ left: `${left}%`, top: `${top}%`, width: `${width}vw`, rotate: tilt }}
          >
            <img src={projects[index].img} alt="" loading="lazy" />
          </Travel>
        ))}
      </div>
      <Travel className="flyer-w" y={[60, -60]}>
        <Paste className="flyer sheet" tilt={[-6, -1.6]}>
          <div className="flyer-b">
            <h2>Have a project <em>in mind?</em></h2>
            <p>I'm always excited to collaborate on new creative projects. Write to me, or tear off a tab.</p>
            <a className="mail" href={mailto}>{contact.email}</a>
            <div className="soc">
              {contact.social.map(({ name, href }) => {
                const Icon = socialIcons[name];
                return (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon size={18} aria-hidden="true" />{name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="tabs">
            {Array.from({ length: 8 }, (_, n) => (
              <Travel
                as="a"
                key={n}
                href={mailto}
                rotate={[-flutter[n % 3], flutter[n % 3]]}
                base={{ transformOrigin: '50% 0%' }}
                whileHover={{ y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                tabIndex={n === 0 ? undefined : -1}
                aria-hidden={n === 0 ? undefined : true}
                aria-label={n === 0 ? 'Email Xeka' : undefined}
              >
                <span>{contact.email}</span>
              </Travel>
            ))}
          </div>
        </Paste>
      </Travel>
      <footer><span>© 2026 Xeka Creative</span><span>Video editor</span></footer>
    </section>
  );
}

// The crimson day wall is the default look. The choice of night wall is remembered on this device.
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return window.localStorage.getItem('xeka-theme') === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem('xeka-theme', theme); } catch (e) { /* private mode: the choice just lasts for this visit */ }
  }, [theme]);
  return [theme, () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))];
}

export default function App() {
  const [playing, setPlaying] = useState(null);
  const [theme, toggleTheme] = useTheme();

  return (
    <PointerProvider>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero onPlay={setPlaying} />
        <Work onPlay={setPlaying} />
        <Band />
        <Toolkit />
        <Contact />
      </main>
      <Player index={playing} onClose={() => setPlaying(null)} />
    </PointerProvider>
  );
}
