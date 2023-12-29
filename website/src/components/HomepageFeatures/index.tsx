import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
//<img src={useBaseUrl('/img/docusaurus.png')} />;
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
      <div  className="row" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <p style={{ fontSize: 20 }}>
            data models often have many connections between various data objects,
          </p>
          <ThemedImage
            // alt="Docusaurus themed image"
            width='400'
            sources={{
              light: useBaseUrl('/img/mocq-data-connections.png'),
              dark: useBaseUrl('/img/mocq-data-connections-dark.png'),
            }}
          />
        </div>
        <br />
        <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <ThemedImage
            // alt="Docusaurus themed image"
            width='450'
            sources={{
              light: useBaseUrl('/img/mocq-config.png'),
              dark: useBaseUrl('/img/mocq-config-dark.png'),
            }}
          />
          <p style={{ fontSize: 20 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <br />
        <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <p style={{ fontSize: 20 }}>mocq takes care of the execution order</p>
          <ThemedImage
            // alt="Docusaurus themed image"
            width='350'
            sources={{
              light: useBaseUrl('/img/mocq-execution-order.png'),
              dark: useBaseUrl('/img/mocq-execution-order-dark.png'),
            }}
          />
        </div>
        <br />
        <div className="row" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <ThemedImage
            // alt="Docusaurus themed image"
            width='450'
            sources={{
              light: useBaseUrl('/img/mocq-data-resolution.png'),
              dark: useBaseUrl('/img/mocq-data-resolution-dark.png'),
            }}
          />
          <p style={{ fontSize: 20 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        {/* <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div> */}
      </div>
    </section>
  );
}
