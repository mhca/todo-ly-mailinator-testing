var request = require('superagent');
var faker = require('faker');

describe('User service', function(){
	it('should send a verification e-mail after creating a new user', function(done){
		
		// key-19adde4e958690474cde8b010e365989
		// var emailName = 'sk-test-' + Date.now();
		var emailName = faker.name.findName().replace(/\s/, '.'); // Jhon Smith
		console.log('Faker email address:', emailName);
		
		/*****************************************/
		/*** Create new Todo.ly user           ***/
		/*****************************************/
		request
		.post('https://todo.ly/api/user.json')
		.send(
		{
				Email: emailName + '@mailinator.com',
				FullName: 'myfullname',
				Password:'pass'
			}
		)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err){
				return done(err);
			}
			
			console.log('*** User Created: ', res.body);
			
			/*****************************************/
			/*** Get Mailiniator inbox from user   ***/
			/*****************************************/
			request
            .get('https://www.mailinator.com/fetch_inbox?zone=public&to=' + emailName)
			.end(function(err, res){
				
				if (err) {
                    return done(err);
                }
				
                var inbox = res.body;				
				console.log('*** User\'s inbox: ', inbox);
				var expectedSubject = 'Welcome to Todo.ly!';
				
				/******************************************************/
				/*** Search Todo.ly welcome email in user's inbox   ***/
				/******************************************************/
				var email = null;
				for (var i = 0; i < inbox.messages.length; i++) {
					 
					var message = inbox.messages[i];
					console.log('****** Message subject:', message.subject);
					console.log('****** Message id: ', message.id);
					
					if (message.subject == expectedSubject){
						email = message;
						break;
					}
				}
				
				if (email === null) {
					return done('Welcome Todo.ly email was not found in user\'s inbox.');
				}
				
				/*****************************************/
				/*** Get welocme Todo.ly email         ***/
				/*****************************************/
				request
				.get('https://www.mailinator.com/fetch_email?msgid='+  email.id + '&zone=public')
				.end(function(err, res){
					if (err) {
						return done(err);
					}
					
					var welcomeEmail = res.body;
					console.log('*** E-mail subject:', welcomeEmail.data.subject);
					// console.log('E-mail body:', welcomeEmail.data.parts[0].body);
					
					/*****************************************/
					/*** Expectations/validations          ***/
					/*****************************************/
					expect(welcomeEmail.data.subject).toEqual(expectedSubject);
					expect(welcomeEmail.data.parts[0].body).toContain('Your account has been crea');
					expect(welcomeEmail.data.parts[0].body).toContain(emailName);
					done();							
				});
			});
			
		});
	});
});