import { servicePost,serviceGet } from "./../helpers/api";

export function configureFakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'Admin' }];
    let realFetch = window.fetch;
    window.fetch = function(url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            
                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);
                    servicePost('login', params)
                    .then((res) => {
                        
                        let responseJson = {
                            id: res.data.user.id,
                            username: res.data.user.username,
                            name: res.data.user.name,
                            role: res.data.user.role,
                            token:res.data.token,
                            kycStatus: res.data.user.kycStatus
                        };

                        resolve({ ok: true, json: () => responseJson });
                    })
                    .catch((err)=> {
                        reject('Username or password is incorrect');
                    })

                    return;
                }

                // register

                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);
                    // alert(JSON.stringify(params))
                    // add new users
                    let newUser = {
                        username: params.email,
                        password: params.password,
                        name: params.fullname,
                        role: 'user',
                    };

                    servicePost('register', newUser)
                    .then((res) => {
                        
                        let responseJson = {
                            id: res.userId,
                            username: res.username,
                            role: res.role,
                            token: res.token,
                        };
                        resolve({ ok: true, json: () => responseJson });
                    })
                    .catch((err)=> {
                        reject('Failed to register');
                    })

                    
                    return;
                }

                // forget password
                if (url.endsWith('/users/password-reset') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username;
                    });

                    if (filteredUsers.length) {
                        let responseJson = {
                            message: "We've sent you a link to reset password to your registered email.",
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Sorry, we could not find any registered user with entered username');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (
                        opts.headers &&
                        opts.headers.Authorization ===
                            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
                    ) {
                        resolve({ ok: true, json: () => users });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));
        });
    };
}
