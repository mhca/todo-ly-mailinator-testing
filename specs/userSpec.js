var request = require('superagent');

describe('User service', function() {

	it('should send a verification e-mail after creating a new user', function(done){

	    /*  	
	    steps:
		    send request to create user
		    get to mailinator inbox
		    search a todoly e-mail
		    get todoly e-mail using id

	    verifications/expect
		    verify that e-mail subject is "Welcome to Todo.ly!"
		    verify that todoly e-mail contains "Your account has been created"
	    */
        
        request
            .get('https://www.mailinator.com/fetch_inbox?x=2&to=sk-test&zone=public')
            .end(function(err, res){
                if (err) {
                    return done(err);
                }
                var inbox = res.body;
                for(var i = 0; i < inbox.messages.length; i++){
                    console.log(inbox.messages[i].subject);

                }

                done();

            });

	});
});



