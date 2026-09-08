'use client';

import React from 'react';

interface CallLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  phoneNumber?: string;
}

export default function CallLink({
  href,
  phoneNumber,
  onClick,
  children,
  ...props
}: CallLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const number = phoneNumber ?? (href?.replace('tel:', '') ?? '');
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_to_call',
        send_to: 'AW-998417390/qbFXClqz8sscEO7HitwD',
        phone_number: number,
      });
    }
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
