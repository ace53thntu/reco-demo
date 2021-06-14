import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="title"
            content="Stora - React Ecommerce Template with NextJs, AntDesign, ReactHooks"
          />
          <meta
            name="description"
            content="Stora - React Ecommerce Template with NextJs, AntDesign, ReactHooks"
          />
          <link rel="icon" href="/fav.png" />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link href="/assets/css/elegant-icon.css" rel="stylesheet" />
          <link href="/assets/css/icomoon-icon.css" rel="stylesheet" />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
                process.env.NODE_ENV === "development"
                  ? "http://localhost:9081/aicactus-sdk.development.min.js"
                  : "https://cdn.aicactus.io/aicactus-sdk.min.js"
              }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: "reco"}),AicactusSDK.callMethodsFromContainer()});`,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <div id="subpages-sidebar" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
