import Link from "next/link";
import Title from "@/components/site/Title";
import { COPY } from "@/content/copy";

export default function NotFound() {
  const c = COPY.en.notFound;
  return (
    <section className="section section--page">
      <div className="wrap">
        <Title as="h1" text={c.title} reveal={false} className="page-head__title" />
        <p style={{ marginTop: 32 }}>
          <Link className="btn btn--light" href="/en">
            {c.back}
          </Link>
        </p>
      </div>
    </section>
  );
}
