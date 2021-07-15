import { useRouter } from 'next/router';
import Link from 'next/link';
import { IActiveLinkProps } from './interface';
import { cloneElement } from 'react';

export function ActiveLink({children, activeClassName, ...rest}: IActiveLinkProps){
  const {asPath} = useRouter();

  const className = asPath === rest.href
  ? activeClassName
  : '';



  return (
    <Link {...rest}>
      {cloneElement(children, { className})}
    </Link>
  )
}
