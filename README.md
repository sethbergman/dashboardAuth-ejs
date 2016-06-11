# dashboardAuth-ejs

Clone
```
git clone https://github.com/sethbergman/dashboardAuth-ejs.git && cd dashboardAuth-ejs
```
Install dependencies:
```
npm install
```
Setup configuration scripts:
* Create a file in the `config` folder called `auth.js`.
* It should have something like the following in the file:
```
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1112223334445557777777',
        'clientSecret'    : '111abc222def333ghi444jkl555mnopqr7777777',
        'callbackURL'     : 'http://dash3.stackriot.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : '1112223334445557777777',
        'consumerSecret'     : '111abc222def333ghi444jkl555mnopqr7777777',
        'callbackURL'        : 'http://dash3.stackriot.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '123-1112223334445557777777.apps.googleusercontent.com',
        'clientSecret'     : '111abc222def333ghi444jkl555mnopqr7777777',
        'callbackURL'      : 'http://dash3.stackriot.com/auth/google/callback'
    }

};
```

Create a file in the `config` folder called `database.js`.
* It should have something like the following in the file:
```
module.exports = {

    'url' : 'mongodb://mongouser:mongopass@ds03162.mlab.com:03162/mongoname'

};
```
Start the app!
```
npm start
```
Visit [http://0.0.0.0:5000](http://0.0.0.0:5000) in your browser.
