## 1. PHP делающий HTML с приветствием через GET
```php
<!DOCTYPE html>
<html>
<head>
    <title>Приветствие</title>
</head>
<body>

<?php
// Проверка, есть ли параметры 'first_name' и 'last_name' в GET-запросе
if (isset($_GET['first_name']) && isset($_GET['last_name'])) {
    $firstName = $_GET['first_name'];
    $lastName = $_GET['last_name'];

    // Вывод приветствия
    echo "<h1>Привет, $firstName $lastName!</h1>";
} else {
    echo "<h1>Привет, гость!</h1>";
}
?>

</body>
</html>
```
## 2. Написать фрагмент кода html и стили css, которые блокируют определенный контент при ширине экрана < 1024 пикселей.
```html
<style>
  @media(max-width: 1024px){
    .content{
      display: none;
    }
  }
</style>

<html>
  <head>
    <title>Rubezhka!</title>
  </head>

  <body>
      <div class="content">
        <h1>Hello!</h1>
      </div>
  </body>
</html>
```

## 3. Написать JSP страницу, которая выводит количество пользователей, которые отправляли запросы, за последние 60 секунд

## 4. Шаблон и код инициализации контекста Thymeleaf, формирующие HTML-страницу, показывающую текущие курсы валют (доллара и евро) относительно рубля, динамику их изменения за последнюю торговую сессию на валютной бирже

## 5. Заменить все гиперссылки на текстовые поля со значением ссылок

```javascript
<script>
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        let text = document.createElement("p");
        text.textContent = link.getAttribute("href");
        link.replaceWith(text);
    })
</script>
```

## 6. Написать JSP страничку, которая отображает корзину покупателя. Один объект этой корзины представляет класс ShoppingItem, который содержит что-то там о товаре. Коллекция этих объектов хранится в отдельном managed bean.

## 7. Написать структуру HTTP запроса, отправляющего логин и пароль пользователя
```
POST https://site.ru/signin HTTP/1.1

HOST: site.ru
Content-Type: application/json
User-Agent: Mozilla/5.0

{
  "login": "login",
  "password": "superPassword"
}
```

## 8. Написать AJAX запрос который получает JSON и выводит его элементы

```js
<script>
    $.ajax({
        url: "servlet-url",
        type: "GET",
        success: function(data){
            console.log(JSON.parse(data))
        }

    })
</script>
```

## 9. 

## 10. Написать правило на CSS, что у всех посещённых ссылок будет жёлтый фон, кроме тех, кто лежит в news

```css
 a:visited:not(.news a){
        color: yellow;
    }
```

## 11. CSS правило: рисовать границу в 1 пиксель для картинок в блоках новостей (class = "news") при наведении на них курсора
```css
    .news img:hover{
        border: solid 1px black;
    }
```

## 14. Написать js функцию, которая заменяет содержимое <div> с именем класса “nyan” на изображение по ссылке: http://www.example.com/nyancat.gif
```js
const nyan = document.querySelector(".nyan");
nyan.innerHTML = "<img src=' http://www.example.com/nyancat.gif'>";
```

## 19. Напишите js функ. которая заменит все текстовые поля на кнопки с тем же текстом

```js
const
```

## 22. Реализовать функцию на JavaScript, которая будет закрывать текущее окно, если в нем открыт https://www.google.ru
```js
if (window.location.href === 'https://www.google.ru/'){
        window.close();
    }
```

## 23. Функция JavaScript, запрещающая для всех текстовых полей ввод символов, если они не латинские буквы или не цифры
```js
// Функция для проверки вводимого значения
function restrictInputToAlphanumeric(event) {
  // Регулярное выражение, соответствующее не латинским буквам и не цифрам
  const nonAlphanumericRegex = /[^a-z0-9]/gi;

  // Получаем ссылку на элемент input
  const input = event.target;

  // Заменяем все найденные не соответствующие символы на пустую строку
  input.value = input.value.replace(nonAlphanumericRegex, '');
}

// Добавляем обработчик для всех текстовых полей
document.querySelectorAll('input[type="text"]').forEach(inputField => {
  inputField.addEventListener('input', restrictInputToAlphanumeric);
});
```
