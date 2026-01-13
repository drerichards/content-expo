type TextBlockProps = {
  title?: string;
  body?: string;
  meta?: string;
};

export const TextBlock = ({ title, body, meta }: TextBlockProps) => {
  return (
    <div className="col-md">
      {title && <div className="text-title">{title}</div>}
      {body && <div className="text-body">{body}</div>}
      {meta && <div className="text-meta">{meta}</div>}
    </div>
  );
};
