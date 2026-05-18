import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `https://wasaffconsulting.vercel.app${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="container-w py-6">
      <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
        <li>
          <Link href="/" style={{ color: 'var(--blue)', textDecoration: 'none' }}>
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            <span style={{ color: 'var(--muted)', opacity: 0.5 }}>/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} style={{ color: 'var(--blue)', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--text)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
      />
    </nav>
  );
}
