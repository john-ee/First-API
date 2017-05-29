### Configure Mosquitto to limit access to topics

Edit ```/etc/mosquitto/mosquitto.conf```

Add the following :
```
allow_anonymous false
acl_file <path>
password_file <path>
```

Then create the acl_file :
```bash
#all users can read & write in topics with the form <project_name>/<username>/?
pattern readwrite +/%u/#

#the user "api" has access to all topics
user api
topic readwrite #
```

Next step create the password_file
```bash
#For each user :
<username>:<password>
```
And type bash the command to crypt the passwords
```
mosquitto_passwd -U <password_file>
```


Finally restart mosquitto
```bash
sudo systemctl restart mosquitto
```
