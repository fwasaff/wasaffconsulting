# Auditoría Técnica Wasaff Consulting — Kimi Code CLI

**Fecha:** 2026-05-18
**Rol:** Desarrollador Senior / Abogado del Diablo
**Stack auditado:** Next.js 14, React 18, TypeScript, Tailwind CSS, Vercel

---

## Resumen Ejecutivo

Build inicial: ✅ Compilaba, pero con bugs funcionales, problemas de SEO, accesibilidad deficiente, código duplicado masivo, y fuga de PII en logs. Tras 3 rondas de corrección, el proyecto pasa build con 10 rutas estáticas, rate limiting, cookie banner, eventos GA4, páginas de blog reales, y sistema de diseño consolidado.

---

## 🔴 P0 — Críticos (8 correcciones)

| # | Problema | Archivo(s) | Solución |
|---|----------|------------|----------|
| 1 | `.btn-ghost` duplicado con `border-radius` piseado | `globals.css` | Eliminada la segunda definición. Todos los botones recuperan `border-radius: 2px`. |
| 2 | `CasosUso` importado pero nunca renderizado | `app/page.tsx` | Agregado `<CasosUso />` al flujo de la home entre Proyectos y Diferenciadores. |
| 3 | Dominios inconsistentes (`.cl` vs `.vercel.app`) | `lib/site.ts`, `layout.tsx`, `robots.ts`, `sitemap.ts` | Creada constante `SITE_URL` centralizada. Todos los archivos usan el mismo dominio de fallback. |
| 4 | Sitemap con solo la home | `sitemap.ts` | Agregadas `/calculadora`, `/privacidad`, `/terminos` y posteriormente los 3 artículos de blog. |
| 5 | Imágenes sin optimizar (`<img>` nativo) | `Hero.tsx`, `Proyectos.tsx`, `Quien.tsx`, `CasosUso.tsx` | Migradas a `next/image` con `width/height`, `priority` en hero LCP, y lazy loading automático. |
| 6 | Variable CSS inexistente `--accent` | `privacidad/page.tsx`, `terminos/page.tsx` | Reemplazado por `var(--blue)` en todos los links legales. |
| 7 | Newsletter fantasma sin funcionalidad | `Blog.tsx`, `Footer.tsx` | Formularios vacíos reemplazados por CTAs honestos a `#contacto`. |
| 8 | `index.html` e imágenes duplicadas en raíz | Raíz del proyecto | Eliminados 7 archivos basura (`index.html`, 6 imágenes duplicadas). |

---

## 🟠 P1 — Altos (8 correcciones)

| # | Problema | Archivo(s) | Solución |
|---|----------|------------|----------|
| 1 | IntersectionObserver duplicado en 9 componentes | `lib/useFadeIn.ts` + 9 archivos | Creado hook `useFadeIn` reutilizable con `threshold`, `rootMargin` y `staggerMs`. Eliminadas ~120 líneas de `useEffect` copiadas. |
| 2 | Contenido invisible sin JavaScript | `globals.css`, `layout.tsx` | Agregado `@media (prefers-reduced-motion: reduce)` + `<noscript>` que fuerza `opacity: 1` y `transform: none`. |
| 3 | Hash links rotos desde páginas internas | `Navbar.tsx` | Implementado `usePathname`. Los hash links (`#servicios`) ahora redirigen correctamente a `/#servicios` cuando se está en `/calculadora`. Agregados `aria-expanded`, `aria-controls`, `aria-label` dinámico. |
| 4 | API `/api/leads` sin rate limiting | `app/api/leads/route.ts` | Rate limiting en memoria por IP: 5 req/min. Retorna HTTP `429` si se excede. |
| 5 | Webhook sin timeout | `app/api/leads/route.ts` | `AbortController` con 8s de timeout. El usuario no se bloquea si el webhook de Make/Zapier falla. |
| 6 | PII expuesta en logs de servidor | `app/api/leads/route.ts` | `console.log` ahora muestra `email: '[REDACTED]'` y `telefono: '[REDACTED]'`. |
| 7 | Menú móvil sin estados ARIA | `Navbar.tsx` | Agregados `aria-expanded`, `aria-controls`, `aria-label` dinámico (Abrir/Cerrar). |
| 8 | Formulario calculadora sin a11y | `calculadora/page.tsx` | Todos los inputs tienen `aria-invalid`, `aria-describedby` vinculado a mensajes de error con `role="alert"`. |

---

## 🟡 P2 — Medios (6 correcciones)

| # | Problema | Archivo(s) | Solución |
|---|----------|------------|----------|
| 1 | Fuentes Google bloqueando render (`@import`) | `layout.tsx`, `globals.css` | Migrado a `next/font/google` con `display: 'swap'`. Eliminado `@import` bloqueante del CSS. |
| 2 | Calendly cargado globalmente en todas las páginas | `layout.tsx` | Script pasado a `strategy="lazyOnload"`. El CSS se mantiene en `<head>` (liviano). |
| 3 | Timeline roto en mobile (`160px` fijo) | `Quien.tsx` | Grid fijo reemplazado por `grid` en mobile + `md:grid-cols-[160px_1fr]`. |
| 4 | Página 404 default de Next.js | `app/not-found.tsx` | Creada página 404 custom con navegación de recuperación (Inicio / Contacto). |
| 5 | `target: ES2017` obsoleto | `tsconfig.json` | Subido a `ES2020` para bundles más limpios. |
| 6 | `--accent` inexistente en páginas legales | `privacidad/page.tsx`, `terminos/page.tsx` | Reemplazado por `var(--blue)` (ya cubierto en P0). |

---

## 🔵 P3 — Estratégicos (4 correcciones)

| # | Problema | Archivo(s) | Solución |
|---|----------|------------|----------|
| 1 | GA4 carga sin consentimiento del usuario | `components/Analytics.tsx`, `lib/gtag.ts`, `layout.tsx` | Banner de cookies inferior con opciones **Aceptar** / **Rechazar**. GA4 solo carga si el usuario acepta. Preferencia persistida en `localStorage`. Incluye `PageTracker` para enviar `pageview` en navegaciones SPA. |
| 2 | Sin tracking de conversiones | Múltiples componentes | Eventos personalizados implementados vía `lib/gtag.ts`:<br>• `calculadora_submit` (con industria y consumo)<br>• `calendly_click` (con location)<br>• `contact_email_click`<br>• `contact_phone_click` |
| 3 | Sin breadcrumbs ni Schema.org BreadcrumbList | `components/Breadcrumbs.tsx`, páginas internas | Breadcrumbs visuales + JSON-LD `BreadcrumbList` en calculadora, privacidad, términos y artículos de blog. |
| 4 | Blog abandonado (placeholders "Próximamente") | `lib/blog.ts`, `components/home/Blog.tsx`, `app/blog/[slug]/page.tsx` | Creadas 3 páginas de artículos con contenido técnico real, metadata dinámica (`generateMetadata`), puntos clave y CTAs. Sitemap actualizado con las 3 rutas. |

---

## 📊 Métricas Finales

| Métrica | Antes | Después |
|---------|-------|---------|
| **Build** | ✅ | ✅ |
| **Rutas estáticas** | 7 | 10 (+3 artículos blog) |
| **Home First Load JS** | 107 kB | 116 kB |
| **Imágenes optimizadas** | ❌ `<img>` nativo | ✅ `next/image` con WebP/AVIF |
| **Fuentes** | `@import` bloqueante | `next/font/google` + swap |
| **GA4** | Carga forzada | Consentimiento explícito |
| **Rate limiting API** | ❌ | ✅ 5 req/min por IP |
| **a11y formularios** | ❌ | ✅ `aria-invalid/describedby` |
| **Página 404** | Default Next.js | Custom con recovery CTAs |
| **Sitemap** | 1 URL | 8 URLs |
| **IntersectionObserver** | 9 copias pegadas | 1 hook reutilizable |
| **Fade-in sin JS** | Contenido invisible | Fallback `<noscript>` + CSS |
| **Newsletter fantasmas** | Formularios vacíos | CTAs honestos a contacto |
| **PII en logs** | Email + teléfono visibles | Redactados `[REDACTED]` |
| **Cookie banner** | ❌ No existía | ✅ Aceptar / Rechazar |
| **Eventos GA4** | Solo pageview | 4 eventos de conversión |
| **Breadcrumbs** | ❌ | ✅ Visuales + Schema.org |
| **Blog** | 3 placeholders | 3 artículos con contenido real |

---

## 🚧 Pendientes identificados (no ejecutados)

| # | Tema | Razón |
|---|------|-------|
| 1 | **Payback de calculadora agresivo** | Es lógica de negocio, no bug técnico. El modelo matemático es correcto; la interpretación comercial depende del usuario. |
| 2 | **CMS para blog** | Actualmente los artículos están hardcodeados en `lib/blog.ts`. Para escalar a >5 artículos, se recomienda Contentful, Sanity o Notion CMS. |
| 3 | **Internacionalización (i18n)** | El sitio es 100% español. Si se expande a mercados hispanos fuera de Chile, se recomienda `next-intl`. |
| 4 | **Tests automatizados** | No existen. Se recomienda Vitest + React Testing Library para el hook `useFadeIn` y la API `/api/leads`. |
| 5 | **Storybook** | No existe. Útil para documentar el design system (botones, tags, badges). |

---

## Notas de Arquitectura

- **Config centralizada:** `lib/site.ts` unifica `SITE_URL` para metadata, sitemap, robots y Schema.org.
- **Hook reutilizable:** `lib/useFadeIn.ts` centraliza IntersectionObserver con parámetros configurables.
- **Analytics desacoplado:** `lib/gtag.ts` provee tipado fuerte y helpers (`pageview`, `trackEvent`).
- **API protegida:** `/api/leads` tiene rate limiting, timeout en webhook, validación de campos, y redacción de PII.
- **Design system consolidado:** Todas las variables CSS en `:root` son consistentes; no quedan referencias a variables inexistentes.
