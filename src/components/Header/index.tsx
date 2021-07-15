import imgLogo from 'assets/images/logo.svg';
import { ActiveLink } from 'components/ActiveLink';
import Image from 'next/image';
import { SignInButton } from '../SignInButton/index';
import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={imgLogo} alt={"ig.news"} />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
