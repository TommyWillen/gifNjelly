use gifNjelly;

INSERT INTO users(firstName, lastName, userName, email, password) VALUES ("Testy", "McTesterson", "Test", "user@test.com", "testpassword0");
INSERT INTO giphyPosts (gifId, caption, gifScore, jellyScore, userId) VALUES ("YsTs5ltWtEhnq", "When John talks about Travis", 1, 0, 1);
INSERT INTO votes (gif, jelly, userId, giphyPostId) VALUES (true, false, 1, 1);