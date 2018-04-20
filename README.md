# Interactive Buyers Sellers Map (ServerSide)
[![Build Status](https://travis-ci.org/jeddah-bats/ServerSide.svg?branch=master)](https://travis-ci.org/jeddah-bats/ServerSide)

## Running the files
* Download the [Node js](https://nodejs.org/en/download/).
* Download the [cmder](http://cmder.net/). *[it is optional, but it is preferred to display information]*
* Download the project files.

Through `the cmd or cmder` go to the project folder by cd command:
```
cd Desktop\Projectfiles
```

After going to the project folder, creating a package.json file to create a new module through this command:
```
npm init
```

Then, install packages cheerio and request.
```
npm install --save cheerio request
```

Finally, run the file:
```
node opensooq.js
or
node sooqmzad.js
```


For `haraj.js` file we need to install packages casperjs and phantomjs.
```
npm install -g phantomjs casperjs
npm install
```

Then, download this files and extract them into the project folder.
* [CasperJS](http://casperjs.org/).
* [PhantomJS](http://phantomjs.org/download.html).

Copy the bin folder path for each files from casperjs-1.1.4-1 & phantomjs-2.1.1-windows. Then, Right click on "This PC" icon > Properties > Advance System Settings > environment variables in System variables box Find "Path" variable > Click Edit

*[windows 10]* Click new and add the full path of: 
```
- ..\casperjs-1.1.4-1\bin
- ..\phantomjs-2.1.1-windows\bin
```

*[windows 8]* Go to the end of the variable and add the paths:  
 ```
;..\casperjs-1.1.4-1\bin;..\phantomjs-2.1.1-windows\bin
```

Finally, click OK & run the file:
```
casperjs haraj.js
```


For `info-gmap.js`, Sign up and obtain a [Google Maps Places API key](https://developers.google.com/places/web-service/get-api-key).

```
export API_KEY=YOUR_GMAPS_API_KEY_GOES_HERE
or
set API_KEY=YOUR_GMAPS_API_KEY_GOES_HERE
```

Finally, run the file:
```
node info-gmap.js
```

## MongoDB

```
npm install mongodb --save
```

* Download [Community Server](https://www.mongodb.com/download-center?jmp=nav#community).

After download, store the program in a custom folder and create a new folder to save the data and name it for example data.
Open cmd to run DB put the mongod.exe path --dbpath data folder path:
```
"C:\...\bin\mongod.exe" --dbpath "C:\..\data"
```
Open MongoDB Compass and click connect and finally, run the file:
```
node mongodb.js
```

## Server

```
npm install express --save
```

```
npm install cors
```

* Add [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) to your google chrome. *[it is optional, but it is preferred to display information]*


Finally, run the server:
```
node server.js
```

After running the server you can go to google chrome and write the following paths for example to get the data:
```
localhost:3000/Places?city=جدة&cat=حراج
or
localhost:3000/Products?city=الرياض&cat=اثاث
```
For more information [API Documentation](https://github.com/jeddah-bats/ServerSide/blob/master/API-Doc.md).

## Unit testing

We need to install packages mocha and chai.
```
npm install mocha chai supertest --save-dev
```

Set up a test script in `package.json`:
```
"scripts": {
    "test": "mocha || true"
  }
```

Then run tests with:
```
npm test
```
