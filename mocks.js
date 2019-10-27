const faker = require("faker");
const models = require("./models");
const owner = "5db40de7ed2e8215f0589f1a";
const TurndownService = require("turndown");

// Процедура создания мок данных!!!
// после генерации подкл его в основной файл app.js

module.exports = () => {
  // удаляем старые записи постов, затем вкл генератор
  models.Post.deleteMany()
    //   models.Post.remove()
    .then(() => {
      Array.from({ length: 20 }).forEach(() => {
        const turndownService = new TurndownService();
        models.Post.create({
          title: faker.lorem.words(5),
          body: turndownService.turndown(faker.lorem.words(100)),
          owner
        })
          .then(console.log())
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};
