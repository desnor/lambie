import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = '' }: Props) => (
  <div>
    <Head>
      <title>{`${title} | Bail Out!`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/profile">
          <a>Profile</a>
        </Link>{' '}
        |{' '}
        <Link href="/people">
          <a>List of People</a>
        </Link>{' '}
        | <a href="/api/people">People API</a>
      </nav>
    </header>
    {children}
    <footer style={{ position: 'fixed', bottom: 0 }}>
      <hr />
      <span>Footer Content</span>
    </footer>
  </div>
);

export default Layout;
