import Script from 'next/script'

const LoadScript = () => {

  return (
    <>
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: `function __googleMapsCallback() {}` }} />
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
              gtag('js', new Date());
        gtag('config', 'AW-10924165313');` }} />
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"></Script>
    </>
  )
}

export default LoadScript;