**Starting commands at first initialization:**

1. docker build . -t gsm/wildfly
2. docker-compose up

**After MySQL init process is done, and /workdir/db/data is created:**

1. CTRL+C to stop process
2. docker-compose down
3. docker-compose up

**Leave _8080_ and _3306_ ports open on your localhost!**
