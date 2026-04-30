import { Heart } from 'lucide-react';
import { Github, Twitter, Instagram } from './Icons';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Portfolio</span>
          <p className="footer__tagline">Crafting experiences, one pixel at a time.</p>
        </div>

        <nav className="footer__nav">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(l => (
            <a key={l} href={l === 'Home' ? '#hero' : `#${l.toLowerCase()}`} className="footer__link">{l}</a>
          ))}
        </nav>

        <div className="footer__socials">
          {[
            { icon: Github, color: '#e2e8f0', href: 'https://github.com/ProEvolution03' },
            { icon: Twitter, color: '#1DA1F2', href: 'https://x.com/aakashtm_03' },
            { icon: Instagram, color: '#E1306C', href: 'https://www.instagram.com/aakashsivakumar_/' }
          ].map(({ icon: Icon, color, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              style={{ '--brand-color': color }}
              aria-label="Social Link"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>Made with <Heart size={12} fill="#ff6b6b" color="#ff6b6b" /> by Aakash Sivakumar · {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
