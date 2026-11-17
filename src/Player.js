import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { projects } from './data';

// Plays one edit in place, in the shape it was made in. `index` is null when nothing is playing.
// A native <dialog> gives us focus trapping, Escape to close and a backdrop for free.
export default function Player({ index, onClose }) {
  const ref = useRef(null);
  const project = index === null ? null : projects[index];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open && dialog.showModal) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const onYouTube = project && !!project.yt;
  const src = project && (onYouTube
    ? `https://www.youtube-nocookie.com/embed/${project.yt}?autoplay=1&rel=0&playsinline=1`
    : `${project.ig}embed/`);
  const shape = project && (project.ig ? 'ig' : project.vertical ? 'tall' : 'wide');

  return (
    <dialog
      ref={ref}
      className="player"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {project && (
        <>
          <div className={`box ${shape}`}>
            <iframe
              src={src}
              title={project.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <div className="bar">
            <strong>{project.title}</strong>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Open on {onYouTube ? 'YouTube' : 'Instagram'} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={onClose} aria-label="Close player"><X size={20} aria-hidden="true" /></button>
          </div>
        </>
      )}
    </dialog>
  );
}
