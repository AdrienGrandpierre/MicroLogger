# MicroLogger


This project contains : 

Front => vue.js

Back => express


## Project setup
```
cd microloggervue &&
npm install

cd ../microloggerapi &&
npm install
```

## Project run at root
```
cd microloggerapi && nodemon
```
And in a other term
```
cd microloggervue && npm run serve
```

Don't forget to copie paste the .env.sample file and rename it to .env 



# For the api you have

### Gets all logs

* **URL**

  /logs

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `   {
        "ip": "172.19.0.3",
        "date": "[15/Nov/2019:10:45:04 +0000]",
        "reqinfo": "GET / HTTP/1.0",
        "codehttp": "403",
        "code": "555",
        "resulr": "-",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    }`


### Add log

* **URL**

  /addlog

* **Method:**

  `POST`

* **Data Params**

    body object parameter :

    - **logs** 

    Sample body object:
    ```
    {
        "log" : "172.19.0.3 - - [15/Nov/2019:10:45:04 +0000] \"GET / HTTP/1.0\" 403 555 \"-\"   \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)    Chrome/78.0.3904.97 Safari/537.36\" \"-\""
    }
    ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    `172.19.0.3 - - [15/Nov/2019:10:45:04 +0000] "GET / HTTP/1.0" 403 555 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36" "-"`
