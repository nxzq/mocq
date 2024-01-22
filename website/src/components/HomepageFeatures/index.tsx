import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import ThemedImage from '@theme/ThemedImage'
import CodeBlock from '@theme/CodeBlock'
import styles from './styles.module.css'

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.heroRow)}>
          <div className={clsx('col col--4', styles.heroCol)}>
            <p>
            Data models have many growing relationships, making the programmatic creation of traversable data sets cumbersome
            </p>
          </div>
          <ThemedImage
            alt="Data Relationships Graph"
            width='400'
            sources={{
              light: useBaseUrl('/img/mocq-data-connections.png'),
              dark: useBaseUrl('/img/mocq-data-connections-dark.png'),
            }}
          />
        </div>
        <div className={clsx(styles.heroRow, 'row')}>
          <ThemedImage
            alt="mocq Config Visual"
            width='450'
            sources={{
              light: useBaseUrl('/img/mocq-config.png'),
              dark: useBaseUrl('/img/mocq-config-dark.png'),
            }}
          />
          <div className={clsx('col col--4', styles.heroCol)}>
            <p><code>[mocq]</code> makes the process more transparent and extendable
              <br/>
              <br/>
            Data objects are configured in isolation as a series of generic <i><b>generator</b></i> and <i><b>connection</b></i> functions
              <br/>
              <br/>
            In any context, devs are only concerned with immediate parent connections, lightening the mental load
            </p>
          </div>
        </div>
        <div className={clsx('row', styles.heroRow)}>
          <div className={clsx('col col--4', styles.heroCol)}>
            <p><code>[mocq]</code> derives the execution order from connections, flagging cyclic dependencies</p>
          </div>
          <ThemedImage
            alt="Execution Order Visual"
            width='350'
            sources={{
              light: useBaseUrl('/img/mocq-execution-order.png'),
              dark: useBaseUrl('/img/mocq-execution-order-dark.png'),
            }}
          />
        </div>
        <div className={clsx('row', styles.heroRow)}>
          <ThemedImage
            alt="Data Resolution Visual"
            width='450'
            sources={{
              light: useBaseUrl('/img/mocq-data-resolution.png'),
              dark: useBaseUrl('/img/mocq-data-resolution-dark.png'),
            }}
          />
          <div className={clsx('col col--4', styles.heroCol)}>
            <p>Data is fully resolved before being passed to a connection function
              <br />
              <br />
            Allowing data to be defined once and cascade throughout the data model resulting in traversable datasets</p>
          </div>
        </div>
        <div className={clsx('row', styles.heroRow)}>
          <div className={clsx('col col--4', styles.heroCol)}>
            <p>
              <Link to='docs/#generate'><code>generate</code></Link> data on the fly or add <i><b>handler</b></i> functions to the configuration
              and <Link to='docs/#execute'><code>execute</code></Link> against generated data utilizing derived execution order
            </p>
          </div>
          <div className={clsx('col col--4', styles.heroCol)}>
            <CodeBlock language="ts">
              {'const { generate, execute } = mocq(config);'}
            </CodeBlock>
          </div>
        </div>
        <div className={clsx('row', styles.heroRow)}>
          <div className={clsx('col col--8', styles.heroCol)}>
            <p>
              Check out the <Link to='docs'><b>docs</b></Link>, try out the <Link to='docs/tutorial'><b>tutorial</b></Link> or 
              <br/>
              browse the <Link to='docs/examples'><b>examples</b></Link> to get started using <code>[mocq]</code> today 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
