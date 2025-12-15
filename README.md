# CryptoWeb - Algoritmos Criptográficos Clásicos

Aplicación web interactiva para conocer algoritmos de cifrado clásicos.

## Demo en Vivo

**URL:** [https://algoritmos-criptografia.conectium.uno](https://algoritmos-criptografia.conectium.uno)

---

## Descripción

CryptoWeb es una herramienta educativa que permite a los usuarios:

- **Cifrar y descifrar mensajes** usando algoritmos históricos
- **Visualizar el proceso** paso a paso de cada algoritmo
- **Guardar historial** de operaciones realizadas
- **Aprender sobre criptografía** de manera interactiva y práctica

### Algoritmos Implementados

| Algoritmo | Dificultad | Época | Descripción |
|-----------|-----------|-------|-------------|
| **César** | 🟢 Fácil | Siglo I a.C. | Desplazamiento simple de letras |
| **Vigenère** | 🟡 Medio | Siglo XVI | Cifrado polialfabético con clave |
| **Transposición Columnar** | 🟡 Medio | Antigüedad | Reordenamiento de letras |
| **XOR** | 🔴 Avanzado | Moderno | Operación binaria bit a bit |

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **[Vue.js 3](https://vuejs.org/)** - Framework progresivo de JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool y dev server ultra rápido
- **[Vue Router](https://router.vuejs.org/)** - Enrutamiento oficial de Vue
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Swiper](https://swiperjs.com/)** - Carrusel moderno de tarjetas
- **[SweetAlert2](https://sweetalert2.github.io/)** - Alertas personalizadas elegantes
- **[Font Awesome](https://fontawesome.com/)** - Biblioteca de iconos
- **[@lottiefiles/dotlottie-vue](https://lottiefiles.com/)** - Animaciones Lottie

### Producción
- **[Docker](https://www.docker.com/)** - Contenedorización
- **[Nginx](https://nginx.org/)** - Servidor web de alto rendimiento
- **[Dokploy](https://dokploy.com/)** - Plataforma de despliegue

---

## Instalación y Ejecución Local

### Prerequisitos

- Instalar Node JS desde su versión 18 en adelante, se lo puede hacer desde la pagina oficial: https://nodejs.org/en
- Usar npm (mismo que ya viene incluido al instalar Node JS) de preferencia la version 9.x en adelante, en la terminal del proyecto ejecutar npm --version (para verificar la versión)

### Pasos para ejecutar localmente

1. **Primero es necesario dirigirnos al repositorio de GitHub**
   ```bash
   git clone https://github.com/Darkside2001/web-Cripto.git 
   ```
   Se puede clonar el repositorio o se puede descargar el archivo .ZIP y descomprimirlo

2. **Una vez descargado el proyecto debemos ejecutar una terminal en la raiz del proyecto e Instalar las dependencias con el siguiente comando**
   ```bash
   npm install
   ```

3. **Para ejecutar la página localmente es necesario ejecutar en modo desarrollo por medio del siguiente comando**
   ```bash
   npm run dev
   ```

4. **Abrir el navegador y escribir lo siguiente**
   
   La aplicación estará disponible en: `http://localhost:5173`

### Scripts disponibles

```bash
# Modo desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Preview de la build de producción
npm run preview

```

---

## Despliegue en Producción

La aplicación está dockerizada y se despliega automáticamente en Dokploy mediante GitHub Actions.

### Estructura de Docker

```
cryptoweb/
├── Dockerfile          # Imagen de producción con Nginx
├── nginx.conf          # Configuración de Nginx
└── .dockerignore       # Archivos excluidos del build
```

## Manual de Uso

### 1. Página de Inicio
- En la pantalla de inicio se visualiza una breve descipción de la página
- Se puede dar clic en la barra de navegación en algoritmos o en la pantalla de inicio se puede dar clic en **"Explorar Algoritmos"** para ver la lista completa

### 2. Selección de lista de Algoritmos
- Se cuenta con tarjetas una por cada algoritmo
- Se puede hacer clic en cualquier tarjeta para ver el funcionamiento de cada uno de los algoritmos

### 3. Cifrar/Descifrar Mensajes

- Se deberá ingresar la palabra que se desea encriptar/descifrar según el tipo de algoritmo:
   - César: Número de desplazamiento (0-25)
   - Vigenère: Palabra clave
   - Transposición: Clave numérica
   - XOR: Clave alfanumérica


### 4. Historial de Operaciones
- Todas las operaciones se guardan automáticamente en la vista inferior de cada uno de los algoritmos
- Se puede limpia el historial cuando se desee y es importante tomar en cuenta que dicho historial solo se almacena en la cache del navegador razón por la cual se eliminará el historial si se borra la cache del navegador desde el cual se accede a la página.

## 🎨 Estructura del Proyecto

```
cryptoweb/
├── public/
│   ├── animations/         # Animaciones Lottie
│   └── favicon.ico
├── src/
│   ├── assets/            # Recursos estáticos
│   ├── components/
│   │   ├── ui/           # Componentes reutilizables
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   └── ...
│   │   └── HistorialOperaciones.vue
│   ├── services/
│   │   ├── historial/    # Gestión de historial
│   │   └── crypto/       # Lógica de cifrado
│   │   └── alertas/      # Código de las alertas que se usan en la página
│   ├── views/         # Páginas principales
│   │   ├── Dashboard.vue
│   │   ├── CesarView.vue
│   │   └── ...
│   ├── router/           # Configuración de rutas
│   ├── App.vue
│   └── main.js
├── Dockerfile            # Arrchivo de configuración para crear la imagen de Docker
├── nginx.conf            # Configuración de NGINX para el ambiente de producción
├── tailwind.config.js    # Configuración de Tailwincss
├── vite.config.js
└── package.json
```

---

## Seguridad Educativa

> **Importante**: Los algoritmos implementados son **únicamente con fines educativos**. 

---
