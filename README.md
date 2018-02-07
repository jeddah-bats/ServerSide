# Interactive Buyers Sellers Map (ServerSide)

## Running the project
* Download the [Node js](https://nodejs.org/en/download/).
* Download the [cmder](http://cmder.net/) -it is optional, but it is preferred to display information.
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
```
or
```
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

Finally, run the file:
```
casperjs haraj.js
```
