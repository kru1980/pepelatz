Уроки Влад
jQuery express mongo passport

## Работа с переменными окружения

- .env - все константы которые нужны для запуска приложения, устанавливаем
- плагин dotenv
- сам файл добавляем в гит игноре и создаем файл с примером .env.example
  в packed.json удаляем cross-env "start": "cross-env NODE_ENV=production PORT=3001 node app.js"
  создаем файл с настройками нодимона и он настрой ки берет от туда, который перезаписывает файл .env
