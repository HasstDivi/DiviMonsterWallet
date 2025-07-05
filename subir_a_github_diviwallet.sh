#!/bin/bash

# ⚠️ Reemplaza estos valores por los tuyos antes de ejecutar:
GH_USER="TU_USUARIO_GITHUB"
GH_TOKEN="ghp_tuTokenAqui"
REPO_NAME="diviwallet-mobile-app"

# 🚨 No necesitas cambiar nada más abajo 🚨

REMOTE="https://${GH_USER}:${GH_TOKEN}@github.com/${GH_USER}/${REPO_NAME}.git"

# Crear el repositorio en GitHub
echo "🛠️ Creando repositorio en GitHub..."
curl -X POST -H "Authorization: token $GH_TOKEN" \
     -d "{\"name\": \"$REPO_NAME\", \"private\": false}" \
     https://api.github.com/user/repos

# Inicializar, añadir y subir archivos
echo "📂 Inicializando repositorio local..."
git init
git add .
git commit -m "Billetera Divi móvil integrada"
git branch -M main
git remote add origin "$REMOTE"
git push -u origin main

echo "✅ ¡Repositorio creado y proyecto subido con éxito!"