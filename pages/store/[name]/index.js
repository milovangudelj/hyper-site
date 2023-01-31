import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import { getPluginPreviewImage } from 'lib/plugin'
import Image from 'next/image'
import { WEBSITE_URL } from 'utils/constants'

export default function StoreIndexPage({ plugin, npmData }) {
  return (
    <Page
      title={`Hyper™ Store - ${plugin.name}`}
      description={plugin.description}
      image={plugin.preview}
    >
      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <div className={styles.imageContainer}>
          {plugin.preview && (
            <>
              {plugin.preview.isGIF ? (
                <img
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  className={styles.image}
                />
              ) : (
                <Image
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  layout="responsive"
                />
              )}
            </>
          )}
        </div>
        <PluginInfo variant="description" npmData={npmData} />
      </div>
    </Page>
  )
}

export const getStaticProps = async ({ params }) => {
   // const npmData = await (
  //   await fetch(`/api/getPackageMetadata?name=${params.name}`)
  // ).json()
  const npmData = {
    name: "hyper-gh-dark-default",
    publisher: {
      email: "milovan.gudelj@gmail.com",
      username: "i.like.martians",
    },
    downloads: "17",
    links: {
      homepage: "https://hyper.milovangudelj.com",
      repository: "https://github.com/milovangudelj/hyper-gh-dark-default",
    },
    version: "0.1.4",
  };

  const plugin = {
    ...plugins.find((e) => e.name === params.name),
    preview: getPluginPreviewImage(params.name),
  }

  return {
    props: {
      plugin,
      npmData,
    },
    revalidate: 60 * 60 * 24,
  }
}

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })),
  fallback: false,
})
