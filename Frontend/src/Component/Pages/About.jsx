import React from 'react';
import { Card } from 'react-bootstrap';
import "../Styling/About.css";

import lakshyaImg from '../../assets/LAKSHYA.png';
import varadImg from '../../assets/varad.jpg';
import snehaImg from '../../assets/Sneha.png';
import ritikImg from '../../assets/Ritik.jpg';
import saloneeImg from '../../assets/Salonee.png';

/* ── LAKSHYA Brand Image ── */
const LakshyaIcon = () => (
  <img src={lakshyaImg} alt="LAKSHYA" className="lakshya-brand-icon" />
);

/* ── Default Avatar SVG ── */
const DefaultAvatar = ({ name }) => {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('');
  const uid = `grad-${initials}-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="default-avatar">
      <defs>
        <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7b5ea7" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="40" fill={`url(#${uid})`} />
      <text x="40" y="47" textAnchor="middle" fontSize="24" fontWeight="700"
        fontFamily="Rajdhani, sans-serif" fill="white" letterSpacing="1">
        {initials}
      </text>
    </svg>
  );
};

/* ── Social Icons ── */
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="social-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="social-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="social-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
  </svg>
);

const teamMembers = [
  {
    id: 1,
    name: 'Ritik Garhewal',
    role: 'Frontend Develpoer',
    photo: ritikImg,
    bio: 'Built responsive user interfaces and intuitive layouts for Lakshya. Developed dynamic React components, integrated APIs, and created seamless navigation to deliver an engaging examination experience.',
    email: 'ritik.garhewal.cmfeb26@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ritikgarhewal',
    github: 'https://github.com/ritikgarhewalcmfeb26',
  },
  {
    id: 2,
    name: 'Salonee Pravin Shirsat',
    role: 'Backend Developer',
    photo: saloneeImg,
    bio: 'Built backend infrastructure including APIs, quiz processing, and score calculation modules. Implemented secure server-side functionality and database operations to ensure reliable platform performance.',
    linkedin: 'https://www.linkedin.com/in/salonee-shirsat-325517248',
    github: 'https://github.com/89285-Salonee',
  },
  {
    id: 3,
    name: 'Shreya Jangid',
    role: 'Full Stack Developer',
    photo: 'member3.jpg',
    bio: 'Developed frontend and backend modules for the examination platform. Integrated APIs, managed database operations, and implemented application features to ensure smooth system functionality.',
    email: 'member3@example.com',
    linkedin: '#',
    github: '#',
  },
  {
    id: 4,
    name: 'Sneha Raja Ghongade',
    role: 'Full Stack Developer',
    photo: snehaImg,
    bio: 'Built end-to-end full-stack web applications by designing secure backend APIs with Node.js/Express and architecting MySQL databases. Developed responsive React frontends with AJAX integration, implemented authentication systems.',
    email: 'snehaghongade642@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sneha-ghongade',
    github: 'https://github.com/snehaghongadeDev',
  },
  {
    id: 5,
    name: 'Varad Nishant Patil',
    role: 'Backend Developer',
    photo: varadImg,
    bio: 'Built the core backend architecture for Lakshya by designing secure APIs, managing database operations, and implementing scalable server-side functionality for reliable system performance.',
    email: 'varadpatil466@gmail.com',
    linkedin: 'https://www.linkedin.com/in/varad-nishant-patil-4159822b0',
    github: 'https://github.com/Varadpatil1812',
  },
];

const About = () => {
  return (
    <div className="about-page">

      {/* ── Hero Info Card (Vidyarthi style) ── */}
      <div className="about-hero-card">
        <div className="about-hero-text">
          <p className="about-hero-lead">
            <i>LAKSHYA is an innovative online exam platform designed to make learning fun and engaging.</i>
          </p>
          <p className="about-para">
            <i>Our mission is to provide high-quality exams across various subjects to help people test their knowledge,
              prepare for exams, or simply learn something new in an interactive way.</i>
          </p>
          <p className="about-para">
            <i>Founded in 2026, we've grown to serve thousands of users worldwide with our constantly expanding library
              of exams created by subject matter experts.</i>
          </p>
        </div>

        {/* ── Brand icon panel ── */}
        <div className="about-hero-brand">
          <LakshyaIcon />
        </div>
      </div>

      {/* ── Team Section ── */}
      <div className="about-inner">
        <h2 className="team-heading">Meet The Team</h2>

        <div className="card-section">
          {teamMembers.map(member => (
            <div className="info-card" key={member.id}>
              {member.photo
                ? <img src={member.photo} alt={member.name} />
                : <DefaultAvatar name={member.name} />
              }
              <h4 className="member-name">{member.name}</h4>
              <h4 className="member-role">( {member.role} )</h4>
              <p className="about-para">{member.bio}</p>
              <div className="social-links">
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`} target="_blank" rel="noreferrer" title="Email">
                  <GmailIcon />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href={member.github} target="_blank" rel="noreferrer" title="GitHub">
                  <GitHubIcon />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mission Card ── */}
        <Card className="mission-card">
          <Card.Body>
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              Our mission is to make learning more accessible, interactive, and effective through smart exam technology.
              We aim to create an environment where individuals can test, track, and enhance their knowledge with ease.
              By combining innovation with education, we empower learners to grow confidently at their own pace.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default About;
