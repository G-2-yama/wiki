import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {useEffect, useState} from 'react';
import styles from './index.module.css';

// Particle system for background
function ParticleSystem() {
  return (
    <div className={styles.particleContainer}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
}

// Interactive logo component
function InteractiveLogo() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={styles.logoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        width="120" 
        height="80" 
        viewBox="0 0 300 200" 
        className={styles.logo}
      >
        {/* G2 Logo Recreation */}
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* House roof (red) */}
        <path
          d="M 150 30 L 120 60 L 180 60 Z"
          fill="url(#redGradient)"
          className={isHovered ? styles.logoHovered : ''}
          filter={isHovered ? "url(#glow)" : "none"}
        />
        
        {/* G letter */}
        <path
          d="M 50 70 C 20 70 20 100 20 130 C 20 160 50 170 80 170 C 100 170 110 160 110 140 L 110 120 L 80 120 L 80 140 L 90 140 C 90 150 85 150 80 150 C 60 150 40 140 40 130 C 40 110 60 90 80 90 C 90 90 100 95 105 105 L 125 95 C 115 75 95 70 80 70 C 65 70 50 70 50 70 Z"
          fill="var(--ifm-color-emphasis-800)"
          className={isHovered ? styles.logoHovered : ''}
        />
        
        {/* 2 number */}
        <path
          d="M 160 90 C 140 90 130 100 130 110 C 130 120 140 130 160 130 L 190 130 C 200 130 200 140 190 140 L 160 140 C 150 140 140 150 150 160 L 220 160 L 220 170 L 140 170 C 130 170 120 160 130 150 C 130 140 140 130 160 130 L 190 130 C 200 130 210 120 210 110 C 210 100 200 90 190 90 L 160 90 Z"
          fill="var(--ifm-color-emphasis-800)"
          className={isHovered ? styles.logoHovered : ''}
        />
        
        {/* Gray accent elements */}
        <circle cx="250" cy="100" r="15" fill="var(--ifm-color-emphasis-400)" className={styles.accent} />
        <rect x="200" y="160" width="40" height="15" rx="7" fill="var(--ifm-color-emphasis-400)" className={styles.accent} />
      </svg>
    </div>
  );
}

// Animated typing effect
function TypeWriter({text, speed = 100}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}<span className={styles.cursor}>|</span></span>;
}

// Interactive project cards
function ProjectCard({title, description, status, technologies, index}) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={clsx(styles.projectCard, {[styles.visible]: isVisible})}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={clsx(styles.statusBadge, styles[status.toLowerCase()])}>
          {status}
        </div>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.techStack}>
          {technologies.map((tech, i) => (
            <span key={i} className={styles.techTag}>{tech}</span>
          ))}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link className={styles.cardLink} to="/">
          詳細を見る →
        </Link>
      </div>
    </div>
  );
}

// Stats counter animation
function StatCounter({end, label, suffix = ''}) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return (
    <div className={styles.statItem}>
      <div className={styles.statNumber}>{count}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.heroBanner}>
      <ParticleSystem />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroText}>
              <Heading as="h1" className={styles.heroTitle}>
                {mounted && <TypeWriter text="G^2            / Original creation circle" speed={80} />}
              </Heading>
              <p className={styles.heroSubtitle}>
                山梨大学 一次創作サークル
              </p>
              <div className={styles.heroDescription}>
                <p>山梨大学甲府キャンパスで活動している一次創作サークルです．</p>
                <p>ゲームを中心に，イラスト，小説，音楽，プログラムなど，</p>
                <p>多種多様な作品を創作しています．</p>
              </div>
              <div className={styles.actionButtons}>
                <Link className={styles.primaryButton} to="/">
                  <span>作品一覧</span>
                </Link>
                <Link className={styles.secondaryButton} to="/">
                  <span>サークル紹介</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className={styles.heroRight}>
            <div className={styles.floatingElements}>
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <div className={styles.codeDots}>
                    <span></span><span></span><span></span>
                  </div>
                  <span>game.cpp</span>
                </div>
                <div className={styles.codeContent}>
                  <div className={styles.codeLine}>
                    <span className={styles.keyword}>class</span> <span className={styles.class}>Game</span> {`{`}
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.keyword}>public</span>:
                  </div>
                  <div className={styles.codeLine}>
                    &nbsp;&nbsp;<span className={styles.function}>void</span> <span className={styles.method}>create</span>();
                  </div>
                  <div className={styles.codeLine}>
                    &nbsp;&nbsp;<span className={styles.function}>void</span> <span className={styles.method}>inspire</span>();
                  </div>
                  <div className={styles.codeLine}>
                    {`};`}
                  </div>
                </div>
              </div>
              
              <div className={styles.designTool}>
                <div className={styles.colorPalette}>
                  <div className={styles.colorSwatch} style={{backgroundColor: '#ffffff'}}></div>
                  <div className={styles.colorSwatch} style={{backgroundColor: '#000000'}}></div>
                  <div className={styles.colorSwatch} style={{backgroundColor: '#dc2626'}}></div>
                </div>
                <div className={styles.toolIcons}>
                  <div className={styles.toolIcon}>🎨</div>
                  <div className={styles.toolIcon}>🎮</div>
                  <div className={styles.toolIcon}>💻</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.statsContainer}>
          <StatCounter end={2013} label="サークル設立" suffix="年" />
          <StatCounter end={15} label="制作作品" suffix="+" />
          <StatCounter end={20} label="メンバー" suffix="+" />
          <StatCounter end={0} label="部費" suffix="円" />
        </div>
      </div>
    </header>
  );
}

function ProjectShowcase() {
  const projects = [
    {
      title: "Tydying up",
      description: "難易度高めの3Dアクションゲーム．様々な場所にあるおもちゃを操作しておもちゃ箱に片づけるゲームです．",
      status: "開発中",  // 開発中 | 公開中 | 企画中
      technologies: ["Unity", "C#", "Blender"]
    },
  ];

  return (
    <section className={styles.projectShowcase}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            プロジェクト
          </Heading>
          <p className={styles.sectionDescription}>
            G^2が生み出した（生み出そうとしている）作品たち
          </p>
        </div>
        
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              status={project.status}
              technologies={project.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  return (
    <section className={styles.joinSection}>
      <div className="container">
        <div className={styles.joinContent}>
          <div className={styles.joinText}>
            <Heading as="h2" className={styles.joinTitle}>
              随時メンバー募集中
            </Heading>
            <p className={styles.joinDescription}>
              G^2では、プログラミング・デザイン・音楽・シナリオなど、
              様々な分野のメンバーを随時募集しています．
            </p>
          </div>
          <div className={styles.joinActions}>
            <Link className={styles.joinButton} to="/">
              参加
            </Link>
            <Link className={styles.contactButton} to="/">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title} - 山梨大学 一次創作サークル`}
      description="山梨大学の一次創作サークルG2です。">
      <HomepageHeader />
      <main>
        <ProjectShowcase />
        <JoinSection />
      </main>
    </Layout>
  );
}
