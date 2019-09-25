**Starting commands at first initialization:**

> docker build . -t gsm/wildfly
> docker-compose up

**After MySQL init process is done, and /workdir/db/data is created:**

> CTRL+C to stop process
> docker-compose down
> docker-compose up

***Leave 8080 and 3306 ports open on your localhost!***
