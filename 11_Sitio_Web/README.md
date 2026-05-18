# Wasaff Consulting — Sitio Web

Desplegado en Vercel: [wasaffconsulting.vercel.app](https://wasaffconsulting.vercel.app)

## Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Vercel** (deploy automático vía GitHub → rama `master`)

## Desarrollo local

```bash
cd 11_Sitio_Web
npm install
npm run dev
```

## Estructura

```
11_Sitio_Web/
├── app/              # App Router (páginas, layout, API routes)
├── components/       # Componentes React (home + layout)
├── lib/              # Utilidades, hooks y helpers
├── public/           # Assets estáticos
└── ...config files
```

> Nota: este proyecto vive dentro del monolito `Wasaff_Consulting/`. No es un submódulo ni un repo anidado.
