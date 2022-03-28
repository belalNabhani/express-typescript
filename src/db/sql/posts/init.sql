INSERT INTO posts(title, description, published, user_id) VALUES
('Post Np. 1', 'Description of first post', true,  '8811f014-8622-4b1a-b43f-b681899a2cf6'),
('Post Np. 2', 'Description of second post', false,  '533af91b-d322-48c9-9478-e1a36ef02303')
RETURNING id