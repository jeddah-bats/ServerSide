# Interactive Buyers Sellers Map (ServerSide)

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

## Unit testing

we need to install packages mocha and chai.
```
npm install mocha chai --save-dev
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
