var request = require('superagent');

describe('User service', function() {

	xit('should send a verification e-mail after creating a new user', function(done){

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
		//////////
		request
		.post('https://todo.ly/api/user.json')
		.send({
				Email: 'sk-test000@mailinator.com',
				FullName: 'myfullname',
				Password:'pass'
			})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				return done(err);
			}
			//console.log(err);
			//console.log(res);
			
			if(inbox.messages[i].subject == todolySubject){
			emailId = inbox.messages[i].id;
			console.log('----------');
			console.log(emailId);
			var inboxListRequest = 'https://www.mailinator.com/fetch_inbox?x=2&zone=public&to='+'emailId;
			
			request
            .get(inboxListRequest)
            .end(function(err, res){
                if (err) {
                    return done(err);
                }
                var inbox = res.body;
				console.log(inbox);
				var todolySubject = 'Welcome to Todo.ly!';
				var isTodolyEmailAvailable = 0;
				var emailId = null;
		
			}
		
		//////////
        
        request
            .get(inboxListRequest)
            .end(function(err, res){
                if (err) {
                    return done(err);
                }
                var inbox = res.body;
				console.log(inbox);
				var todolySubject = 'Welcome to Todo.ly!';
				var isTodolyEmailAvailable = 0;
				var emailId = null;
							//	console.log(todolySubject);

				
                for(var i = 0; i < inbox.messages.length; i++){
                  
					console.log(inbox.messages[i].subject);
					//console.log(inbox.messages[i].id);

                }

                done();

            });

	});
	
	xit('should get todoly e-mail', function(done){
		request
		.get('https://www.mailinator.com/fetch_email?msgid=1496867094-20005454684-sk-test00&zone=public')
		.end(function(err, res){
			if(err){
				return done(err);
			}
			var email = res.body;
			console.log('emailllllllllllll');
			console.log(email);
			console.log('============== subject    ====');
			console.log(email.data.subject);
			console.log('============== parts   ====');
			console.log(email.data.parts[0].body);
			done();
		});
		
	});
	
	it('should create a new user', function(done){
		request
		.post('https://todo.ly/api/user.json')
		.send({
				Email: 'sk-test03@mailinator.com',
				FullName: 'myfullname',
				Password:'pass'
			})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				return done(err);
			}
			//console.log(err);
			console.log(res);
			
			if(inbox.messages[i].subject == todolySubject){
			emailId = inbox.messages[i].id;
			console.log('----------');
			console.log(emailId);
			}
			
	xit('should send a verification e-mail after creating a new user', function(done){

	         
        request
            .get('https://www.mailinator.com/fetch_inbox?x=2&to=sk-test00&zone=public')
            .end(function(err, res){
                if (err) {
                    return done(err);
                }
                var inbox = res.body;
				console.log(inbox);
				var todolySubject = 'Welcome to Todo.ly!';
				var isTodolyEmailAvailable = 0;
				var emailId = null;
							//	console.log(todolySubject);

				
                for(var i = 0; i < inbox.messages.length; i++){
                  
					console.log(inbox.messages[i].subject);
					//console.log(inbox.messages[i].id);

                }

                done();

            });

	});
			
			
			}

			
			
			done();
		});
	});
});



