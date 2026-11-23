import React from 'react';
import { useRouter } from '../../context/RouterContext';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  scrollToTop?: boolean;
  children: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, scrollToTop = true, onClick, children, className, ...rest }, ref) => {
    const { navigate } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      // Only handle standard left clicks without modifier keys (Cmd/Ctrl/Shift/Alt)
      if (
        !e.defaultPrevented &&
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        navigate(to, { replace, scrollToTop });
      }
    };

    return (
      <a ref={ref} href={to} onClick={handleClick} className={className} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
export default Link;
