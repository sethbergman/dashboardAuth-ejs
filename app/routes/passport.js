module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user
        });
    });

    // DASHBOARD SECTION =======================
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('pages/dashboard', {
            user : req.user,
            message: req.flash('loginMessage')
        });
    });

    app.get('/user', isLoggedIn, function(req, res) {
        res.render('pages/user', {
            user : req.user
        });
    });

    app.get('/table', isLoggedIn, function(req, res) {
        res.render('pages/table', {
            user : req.user
        });
    });

    app.get('/icons', isLoggedIn, function(req, res) {
        res.render('pages/icons', {
            user : req.user
        });
    });

    app.get('/maps', isLoggedIn, function(req, res) {
        res.render('pages/maps', {
            user : req.user
        });
    });

    app.get('/notifications', isLoggedIn, function(req, res) {
        res.render('pages/notifications', {
            user : req.user
        });
    });

    app.get('/template', isLoggedIn, function(req, res) {
        res.render('pages/template', {
            user : req.user
        });
    });

    app.get('/typography', isLoggedIn, function(req, res) {
        res.render('pages/typography', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res){
      var user = req.user.username;
      console.log("LOGGIN OUT " + req.user.username)
      req.logout();
      res.redirect('/');
      req.session.notice = "You have successfully been logged out " +   + "!";
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication

        //app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
        app.get('/auth/facebook', function(req, res) {
            res.send('Facebook requires https for authentication, so I removed this route. Sorry!')
        });

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));

    // github -----------------------------------

        app.get('/auth/github',
            passport.authenticate('github'));

        app.get('/auth/github/callback',
            passport.authenticate('github', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/github', passport.authenticate('github', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/github/callback',
            passport.authenticate('github', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authenticate('google', { scope : 'email' }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authenticate('google', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/user');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/github', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.github.token = undefined;
        user.save(function(err) {
            res.redirect('/user');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/user');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/user');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
