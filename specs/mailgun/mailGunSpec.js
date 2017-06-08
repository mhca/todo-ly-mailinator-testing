var request = require('superagent');
var faker = require('faker');

var apiKey = 'key-19adde4e958690474cde8b010e365989';
var domain = 'sandbox201f03fe35d34c1b9e721524b01dde42.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
var mailGunTimeout = 9000;
 
describe('User service', function(){
	it('should send a verification e-mail after creating a new user', function(done){
		
		// var emailName = 'sk-test-' + Date.now();
		var emailName = 'share.knowledge';
		console.log('*** Faker email address:', emailName + '@mailinator.com');
		
		var expectedSubject = 'Welcome to Todo.ly! ' + Date.now();
		var data = {
		  from: 'Excited User <me@samples.mailgun.org>',
		  to: emailName + '@mailinator.com',
		  subject: expectedSubject,
		  text: 'Your account has been created. ' + emailName + '@mailinator.com'
		};

		
		/*****************************************/
		/*** Send MailGun email                ***/
		/*****************************************/
		mailgun.messages().send(data, function (err, body) {
			
			if (err) {
				return done(err);
			}
			
			console.log('*** Mailgun email sent:');
			console.log(body);
			console.log('*** Waiting for it to be sent ...');
			
			setTimeout(function(){
				
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
						expect(welcomeEmail.data.parts[0].body).toContain('Your account has been created.');
						expect(welcomeEmail.data.parts[0].body).toContain(emailName);
						done();							
					});
				});
				
			}, mailGunTimeout);
		});
	}, mailGunTimeout + 3000);
});