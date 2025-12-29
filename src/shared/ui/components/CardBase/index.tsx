"use client";

export type CardBaseProps = {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function CardBase({
  title,
  subtitle,
  onClick,
  children,
}: CardBaseProps) {
  return (
    <article onClick={onClick}>
      <header>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </header>
      {children}
    </article>
  );
}
