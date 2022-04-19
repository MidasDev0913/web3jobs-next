import Script from 'next/script';
import Head from 'next/head';
import { TITLE, DESCRIPTION } from '../../utils/constants';

const LoadScript = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="keywords" content="Keywords" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="og:title" content={TITLE} />
        <meta name="description" content={DESCRIPTION} />
        <meta name="og:description" content={DESCRIPTION} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
      </Head>
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `function __googleMapsCallback() {}`,
        }}
      />
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?callback=__googleMapsCallback&amp;key=AIzaSyABjeZnSnoEubAX5H6YgelDYVsPmyOi2Ng&amp;libraries=places&amp;v=weekly&amp;language=en"
      ></Script>

      <Script
        strategy="beforeInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-10924165313"
      ></Script>
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'AW-10924165313');`,
        }}
      />
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"
      ></Script>
    </>
  );
};

export default LoadScript;
