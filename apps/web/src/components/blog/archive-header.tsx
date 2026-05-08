import { Badge } from "@/components/system";

type ArchiveHeaderProps = {
  count?: number;
  description?: string;
  eyebrow?: string;
  heading: string;
};

export function ArchiveHeader({ count, description, eyebrow = "Blog", heading }: ArchiveHeaderProps) {
  return (
    <header className="blog-archive-header">
      <div className="blog-archive-header__eyebrow">
        <Badge variant="muted">{eyebrow}</Badge>
        {typeof count === "number" ? <span>{count} articles</span> : null}
      </div>
      <div className="blog-archive-header__copy">
        <h1>{heading}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
