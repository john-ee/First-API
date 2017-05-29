### Configure Mosquitto to limit access to topics

Edit ```/etc/mosquitto/mosquitto.conf```

Add the following :
```
allow_anonymous false
acl_file <path>
password_file <path>
```

Then create the acl_file :
```
#all users can read & write in topics with the form <project_name>/<username>/?
pattern readwrite +/%u/#

# the user "api" has access to all topics
user api
topic readwrite #
```

Finally create the password_file
```
<username>:<password>
```
And type the command
```
mosquitto_passwd -U <password_file>
```
