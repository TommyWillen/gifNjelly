use gifNjelly;

INSERT INTO Users(firstName, lastName, userName, email, password, createdAt, updatedAt) VALUES ("Testy", "McTesterson", "Test", "user@test.com", "$2a$10$bBngcywy9Y3QH61As7hg0.b732rNfuK4CxL/bylKtM00QE7.HfvVy", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO GiphyPosts (gifId, caption, gifScore, jellyScore, userId, createdAt, updatedAt) VALUES ("YsTs5ltWtEhnq", "When John talks about Travis", 1, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Votes (gif, jelly, userId, giphyPostId, createdAt, updatedAt) VALUES (true, false, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);