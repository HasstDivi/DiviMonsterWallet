# 📱 DiviWallet Mobile

Billetera móvil para Divi creada con React Native + Expo.  
Permite consultar balance en tiempo real y enviar transacciones `rawTx` mediante la API pública de Diviscan.

---

## 🚀 Funcionalidades

✅ Consulta de balance desde dirección Divi  
✅ Envío de transacciones (rawTx) con confirmación  
✅ Interfaz simple y ligera  
✅ Código abierto y modificable  

---

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO_GITHUB/diviwallet-mobile-app.git
cd diviwallet-mobile-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la app en modo desarrollo:
```bash
npx expo start
```

Abre la app en tu móvil con **Expo Go** (disponible en Google Play / App Store).

---

## 📲 Compilar `.apk`

1. Inicia sesión en Expo:
```bash
npx eas login
```

2. Compila el APK:
```bash
npx eas build -p android --profile production
```

Recibirás un enlace para descargar el APK desde Expo.

---

## 🧪 Uso de la App

### 🔎 Consultar Balance
1. Ve a la pantalla **Balance**
2. Introduce una dirección Divi válida (ej: `DFt8gv...`)
3. Pulsa **Consultar Balance**  
→ Verás el saldo total en DIVI.

### 🚀 Enviar Transacción
1. Ve a la pantalla **Enviar**
2. Pega una transacción en formato **rawTx**
3. Pulsa **Enviar**  
→ Se mostrará el resultado o ID de transacción.

---

## 🌐 API utilizada

- [`https://api.diviscan.io`](https://api.diviscan.io)
  - `/balance/{address}`
  - `/tx/send`

---

## ⚙️ Requisitos

- Node.js >= 16
- Expo CLI
- Cuenta en [expo.dev](https://expo.dev)
- Android Studio (opcional para emulador)

---

## 🛡️ Seguridad

⚠️ Esta app no firma transacciones ni maneja claves privadas directamente.  
Requiere que el usuario genere previamente el `rawTx` firmado desde un nodo Divi propio o herramienta externa segura.

---

## 🧑‍💻 Autor

Proyecto de código abierto basado en [DiviProject](https://github.com/DiviProject).  
Adaptado por TU_USUARIO_GITHUB para desarrolladores y usuarios de Divi.

---