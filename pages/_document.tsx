import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

type Props = {};

class MyDocument extends NextDocument<Props> {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <link href='http://fonts.cdnfonts.com/css/public-sans' rel='stylesheet'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
