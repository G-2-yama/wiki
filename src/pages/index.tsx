import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              G^2
            </Heading>
            <p className={styles.heroSubtitle}>
              一次創作サークル
            </p>
            <p className={styles.heroDescription}>
              私たちは山梨大学で一次創作を行っています．
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button', styles.primaryButton)}
                to="/docs/test">
                作品を見る 🎮
              </Link>
              <Link
                className={clsx('button', styles.secondaryButton)}
                to="/docs/test">
                サークルについて
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.gameController}>
              <div className={styles.controllerBody}>
                <div className={styles.dpad}>
                  <div className={styles.dpadCenter}></div>
                </div>
                <div className={styles.buttons}>
                  <div className={styles.buttonA}></div>
                  <div className={styles.buttonB}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2013年</div>
            <div className={styles.statLabel}>サークル設立</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>リリース作品</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>オリジナル</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function GameShowcase() {
  const games = [
    {
      title: "開発中の作品",
      description: "現在開発中の新作ゲーム",
      status: "開発中",
      color: "#dc2626"
    },
    {
      title: "人気作品",
      description: "G^2の顔となる代表作",
      status: "公開中",
      color: "#059669"
    },
  ];

  return (
    <section className={styles.gameShowcase}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          制作作品
        </Heading>
        <div className={styles.gameGrid}>
          {games.map((game, index) => (
            <div key={index} className={styles.gameCard}>
              <div className={styles.gameCardHeader}>
                <div
                  className={styles.gameStatus}
                  style={{ backgroundColor: game.color }}
                >
                  {game.status}
                </div>
              </div>
              <div className={styles.gameCardContent}>
                <h3 className={styles.gameTitle}>{game.title}</h3>
                <p className={styles.gameDescription}>{game.description}</p>
                <Link className={styles.gameLink} to="/docs/test">
                  詳細を見る →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 一次創作サークル`}
      description="私たちは山梨大学で一次創作を行っています．">
      <HomepageHeader />
      <main>
        <GameShowcase />
      </main>
    </Layout>
  );
}
