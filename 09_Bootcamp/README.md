# 09_Bootcamp — Programa de Formación Wasaff Consulting

Materiales didácticos de física computacional para capacitación interna y externa.

## Estructura

- `Modulo_1/` a `Modulo_6/` — Módulos completos con template LaTeX oficial, Parte A (teoría) y Parte B (práctica).

## Uso

Cada módulo se compila con `pdflatex` o `latexmk` usando el template `WASAFF_Template.tex`.

```bash
cd Modulo_1
latexmk -pdf Modulo_1_Main.tex
```

> Nota: las carpetas `fase01/`, `fase02/` y `fase03/` fueron consolidadas en `Modulo_1/`–`Modulo_6/` y eliminadas.
