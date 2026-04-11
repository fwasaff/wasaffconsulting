// =============================================================================
// WASAFF CONSULTING - Archivo de Geometría Base (Versión Final)
// Geometría para Manifold Rectangular, consistente con el Informe Técnico.
// Creado para ser etiquetado manualmente en la GUI para máxima robustez.
// =============================================================================
SetFactory("OpenCASCADE");

// --- 1. Parámetros Geométricos (del Informe Técnico) ---
D_header = 0.1;   // Diámetro Interno del header (lo usaremos para el Inlet)
d_out = 0.05;     // Diámetro Interno de las salidas

// Dimensiones del cuerpo del manifold (Header Rectangular)
L = 1.0;          // Longitud total en X
W = 0.15;         // Ancho en Y (un poco más grande que D_header)
H = 0.15;         // Altura en Z

// Dimensiones de los tubos de conexión
L_inlet = 0.2;
L_outlet = 0.2;

// --- 2. Creación Explícita de los Volúmenes ---
// Header Principal (cuerpo rectangular)
header = newv; Box(header) = {0, -W/2, -H/2, L, W, H};

// Inlet (cilindro en el extremo X=0)
inlet_cyl = newv; Cylinder(inlet_cyl) = {0, 0, 0, -L_inlet, 0, 0, D_header/2};

// 5 Outlets (cilindros en la parte superior, espaciados uniformemente)
out1 = newv; Cylinder(out1) = {0*L/4, 0, H/2, 0, 0, L_outlet, d_out/2};
out2 = newv; Cylinder(out2) = {1*L/4, 0, H/2, 0, 0, L_outlet, d_out/2};
out3 = newv; Cylinder(out3) = {2*L/4, 0, H/2, 0, 0, L_outlet, d_out/2};
out4 = newv; Cylinder(out4) = {3*L/4, 0, H/2, 0, 0, L_outlet, d_out/2};
out5 = newv; Cylinder(out5) = {4*L/4, 0, H/2, 0, 0, L_outlet, d_out/2};

// --- 3. Fusión de Volúmenes ---
// Une todas las piezas en un solo cuerpo de fluido
BooleanFragments{
  Volume{header, inlet_cyl, out1, out2, out3, out4, out5};
  Delete; // Borra los volúmenes originales después de la fusión
}{
}

// Sincroniza el kernel para que actualice la geometría antes de cualquier otra operación
Synchronize;
//+
Physical Surface("inlet", 10) = {8};
//+
Physical Surface("outlet_1", 21) = {31};
//+
Physical Surface("outlet_2", 22) = {14};
//+
Physical Surface("outlet_3", 23) = {17};
//+
Physical Surface("outlet_4", 24) = {20};
//+
Physical Surface("outlet_5", 25) = {34};
//+
Physical Surface("walls", 100) = {30, 13, 16, 19, 33, 27, 24, 26, 23, 25, 7};
//+
Physical Volume("fluid_domain", 200) = {13, 16, 19, 22, 1, 25, 28};
