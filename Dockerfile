# ベースイメージとして Node.js を使用
# FROM node:18-alpine
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --verbose

# ソースコードをコピー
COPY . .

# アプリをビルド
RUN npm run build

EXPOSE 5000

# アプリを起動
# CMD ["npm", "start"]
CMD ["node", "server.js"]