# Mailinator: An alternative to test email-based use cases.

### 1. Introduction
Considering the following cases for "todo.ly" app:
- Verify that a confirmation email is sent after creating a new user
- Verify a change-password email is sent after user's request it

### 2. The problem
How to easily automate those test cases?
### 3. Some alternatives to solve the problem and its limitations
1. Third party applications (gmail, outlook, etc.)
   - Need to automate UI steps
   - Emails considered as spam or email banned 
      
2. Setup a dedicated mail server
   - Additional effort/time invested
   - Some IT restrictions (have a dedicated machine/vm, enable ports and others)
      
### 4. Mailinator, an alternative to consider
![Mailinator](https://www.mailinator.com/img/logo.png)
### 5. Usage example (UI)
Let's try it out! 
 - Https://todo.ly
 - https://www.mailinator.com
### 6. Usage example (API - postman)
Following end-points are available:
 - https://api.mailinator.com/api/inbox?to=bob&token=...
 - https://api.mailinator.com/api/email?id=1373143878-0-test22&token=...

**Limitations:** we need to pay!

Fortunately, we found these public resources:
 - https://www.mailinator.com/fetch_inbox?zone=public&to=bob
 - https://www.mailinator.com/fetch_email?msgid=1373143878-0-test22&zone=public

### 7. Automated example (API - nodejs script)

```js
var emailName = 'share.knowledge';
request
  .get('https://www.mailinator.com/fetch_inbox?zone=public&to=' + emailName)
  .end(function(err, res){
    var inbox = res.body;				
    console.log('*** User\'s inbox: ', inbox);
  });
```			
