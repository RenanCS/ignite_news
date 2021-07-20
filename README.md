<h1 align="center">
  Ignite News
</h1>

<h4 align="center">
	🚧  Ignite ♻️ Em Andamento 🚀 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-problemas-encontrados">Problemas encontrados</a> •
 <a href="#-contribuidores">Contribuidores</a> •
 <a href="#-autor">Autor</a> •
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto

O projeto consiste em uma solução web para apresentar "news" utilizando:
- Nextjs;
- Stripe (Infra de pagamentos);
- FaunaDB (Banco de dados serverless);
- JAMStack CMS (painel adm "wordpress");
- GitHub (Para autenticar OAuth);

Site: rcsti-ignite-news.vercel.app

---

## ⚙️ Funcionalidades

- [X] Login via github
- [X] Listar news
- [X] Visualizar preview de news
- [X] Visuaizar news
- [X] Aplicar pagamentos via subscrição
- [X] Consumir posts CMS (Prismic)
---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/RenanCS/ignite_news.git

# Acesse a pasta do projeto no terminal/cmd
$ cd ignite_news

# Instale as dependências
$ npm install
# ou
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ npm run start
$ yarn start

# O servidor inciará na porta:3000 - acesse http://localhost:3000


```
---

## ❌Problemas encontrados
* [On every page refresh session is always false](https://github.com/nextauthjs/next-auth/discussions/704)
* [How to use cookies for persisting users in Nextjs](https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617)


## 🛠 Tecnologias

- **[ReactJS](https://pt-br.reactjs.org/)**
- **[Nextjs](https://nextjs.org/)**
- **[Stripe](https://stripe.com/br)**
- **[FaunaDB](https://fauna.com/)**
- **[PrismicCSM](https://prismic.io/)**
- **[Github](https://github.com/)**


