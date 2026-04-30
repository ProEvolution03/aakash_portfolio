import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import RevealSection from './RevealSection';
import '../styles/Contact.css';

const INFO = [
  { icon: Mail,    label: 'Email',    value: 'aakashiyer03@gmail.com'          },
  { icon: MapPin,  label: 'Location', value: 'Chennai, Tamil Nadu, India'       },
];

export default function Contact() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-80px' });
  const [sent,     setSent]     = useState(false);
  const [sending,  setSending]  = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form,     setForm]     = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name:       form.name,
          from_name:  form.name,
          email:      form.email,
          from_email: form.email,
          reply_to:   form.email,
          message:    form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <RevealSection id="contact" className="contact section" ref={ref}>
      <div className="container">

        {/* Memo header */}
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <p className="contact__sub">
            Have an idea, a project, or just want to say hello?<br />
            I read every message — usually reply within 24 hours.
          </p>
        </motion.div>

        <div className="contact__layout">
          {/* Info cards */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18 }}
          >
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="contact-info-card">
                <div className="contact-info-card__icon">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="contact-info-card__label">{label}</span>
                  <span className="contact-info-card__value">{value}</span>
                </div>
              </div>
            ))}

            <div className="contact__availability">
              <span className="contact__avail-dot" />
              <div>
                <span className="contact-info-card__label">Availability</span>
                <span className="contact-info-card__value">Open to freelancing!</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.22 }}
          >
            {sent ? (
              <motion.div
                className="contact__success"
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <CheckCircle size={44} color="var(--accent-navy)" />
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      className="form-input"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="form-input"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="form-input form-textarea"
                    placeholder="What's on your mind?…"
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary contact__submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={sending}
                  style={{ opacity: sending ? 0.72 : 1 }}
                >
                  {sending ? (
                    <>
                      Sending...
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ display: 'flex' }}
                      >
                        <Loader2 size={15} />
                      </motion.span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </motion.button>

                {errorMsg && (
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.82rem', marginTop: '0.5rem', textAlign: 'center' }}>
                    {errorMsg}
                  </p>
                )}
              </>
            )}
          </motion.form>
        </div>
      </div>
    </RevealSection>
  );
}
