# Low Racing API ⚡
### Preview
<img src="https://i.postimg.cc/wjVSLDCD/Home.png"/>

## Introduction
Low Racing API is responsible for taking care of the entire Low Racing ecosystem.

## Pre-requisites 
- Node.js => 20
- Postgres
- Docker

## Development
Main IDE: [Visual Studio Code](https://code.visualstudio.com) <br>
Engine: [Node](https://nodejs.org) <br>
Database: [PostgreSQL](https://www.postgresql.org/) <br>
ORM: [Prisma](https://www.prisma.io/)

## Running Project in development
> You can start a local server for development without using separate command lines for each service.
```bash
cd lowracing-api
docker compose up -d
npm i && npm run dev
```



1. Create a .env file based on .env.example.
<br/> <br/>
2. Now all that’s left to do is run the following command to start the API: <br/> <br/>
```
npm run dev
```

#### SMTP
> To send emails to users, configure it.
```env
MAILER_DISPLAY_NAME=[MAILER_DISPLAY_NAME]
MAILER_HOST=[MAILER_HOST]
MAILER_PORT=[MAILER_PORT]
MAILER_USERNAME=[MAILER_USERNAME]
MAILER_PASSWORD=[MAILER_PASSWORD]
```

#### Storage(CLOUDINARY) 
> Again, in production we use GCP-Storage to store images, videos and audios.
> However, you can create a free trial account on [Cloudinary](https://cloudinary.com) to use the storage-related features, you must do this configuration:
```env
CLOUDINARY_CLOUD_NAME=[CLOUDINARY_CLOUD_NAME]
CLOUDINARY_API_KEY=[CLOUDINARY_API_KEY]
CLOUDINARY_API_SECRET=[CLOUDINARY_API_SECRET]
```

# Contributing
We appreciate you joining our development team fixing bugs, creating features or improving the ecosystem as a whole. Feel free to compile and create custom forks of the system. But first of all remember that this system is under license for non-commercial use. Also remember to read the CONTRIBUITE.pt.md file or in your native language before creating a PR or ISSUE.

<br><br>
Made with ❤️ by **Julio Developer**.
