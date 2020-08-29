Users - /users{/:id}
 - id
 - name
 - email
 - password_hash
 - profile_image
 - online

Channel - /channels{/:id}
 - id
 - name
 - description
 - created_by
 - created_at

Messages - /messages{/:id}
 - id
 - id_channel
 - id_user
 - message
 - unread
