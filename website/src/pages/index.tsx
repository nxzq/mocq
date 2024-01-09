import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <code>[{siteConfig.title}]</code>
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className='textWithTrailingIcon'>
          <p>built with <Link to='https://bun.sh'>bun</Link></p>
          <img src={useBaseUrl('img/bun.svg')}/>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description="data creation, connection & execution coordination utility">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
