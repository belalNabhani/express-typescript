INSERT INTO posts(title, description, published, user_id)
VALUES(${title}, ${description}, ${published}, ${user_id})
RETURNING *