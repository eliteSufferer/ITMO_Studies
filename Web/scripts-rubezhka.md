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
```java
@WebListener
public class SessionCounter implements HttpSessionListener {
private static ArrayList<Long> sessionTimes = new ArrayList<Long>();

public void sessionCreated(HttpSessionEvent se) {
    sessionTimes.add(System.currentTimeMillis());
}

public static int getLastMinuteSessions() {
    return sessionTimes.stream().filter(time -> System.currentTimeMillis() - time <= 60 * 1000).count();
}
}
```
index.jsp:
```jsp
<html>
…
Sessions for 60s: <%= SessionCounter.getLastMinuteSessions() %>
...
</html>
```

## 4. Шаблон и код инициализации контекста Thymeleaf, формирующие HTML-страницу, показывающую текущие курсы валют (доллара и евро) относительно рубля, динамику их изменения за последнюю торговую сессию на валютной бирже
```java
@Controller
public class CurrencyController {

    @GetMapping("/currency-rates")
    public String showRates(Model model) {
        // Предположим, что мы получили следующие данные из сервиса или API биржи:
        BigDecimal usdRate = new BigDecimal("74.20"); // Текущий курс доллара
        BigDecimal eurRate = new BigDecimal("90.50"); // Текущий курс евро
        BigDecimal usdChange = new BigDecimal("-0.15"); // Изменение курса доллара
        BigDecimal eurChange = new BigDecimal("0.20"); // Изменение курса евро

        // Добавляем данные в модель
        model.addAttribute("usdRate", usdRate);
        model.addAttribute("eurRate", eurRate);
        model.addAttribute("usdChange", usdChange);
        model.addAttribute("eurChange", eurChange);

        return "rates"; // Имя HTML шаблона
    }
}
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Курсы валют</title>
</head>
<body>

<h1>Курсы валют</h1>

<div>
    <p>Текущий курс доллара: <span th:text="${usdRate}"></span> руб.</p>
    <p th:if="${usdChange.compareTo(BigDecimal.ZERO) > 0}"
       th:text="'Доллар вырос на ' + ${usdChange} + ' руб.'"></p>
    <p th:if="${usdChange.compareTo(BigDecimal.ZERO) < 0}"
       th:text="'Доллар упал на ' + ${usdChange.abs()} + ' руб.'"></p>
</div>

<div>
    <p>Текущий курс евро: <span th:text="${eurRate}"></span> руб.</p>
    <p th:if="${eurChange.compareTo(BigDecimal.ZERO) > 0}"
       th:text="'Евро вырос на ' + ${eurChange} + ' руб.'"></p>
    <p th:if="${eurChange.compareTo(BigDecimal.ZERO) < 0}"
       th:text="'Евро упал на ' + ${eurChange.abs()} + ' руб.'"></p>
</div>

</body>
</html>
```

## 5. Заменить все гиперссылки на текстовые поля со значением ссылок

```javascript
    links.forEach(link => {
        let text = document.createElement('input');
        text.type = "text";
        text.value = link.getAttribute("href");
        link.replaceWith(text);
    })
```

## 6. Написать JSP страничку, которая отображает корзину покупателя. Один объект этой корзины представляет класс ShoppingItem, который содержит что-то там о товаре. Коллекция этих объектов хранится в отдельном managed bean.

```jsp
<%@ page import="my.package.ShoppingItem" %>
<%@ page import="java.util.Collection" %>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<jsp:useBean id="managed" class="my.package.ManagedBean" scope="session">
<html>
<head>
        <meta charset="utf-8">
</head>
<body>
<table>
        <tr>
                <th>name</th>
                <th>price</th>
                <th>count</th>
        </tr>
<%
        Collection<ShoppingItem> basket = mananged.getBasket();
        for (ShoppingItem position: basket){%>
                <tr>
                        <td><%= position.getName() %></td>
                        <td><%= position.getPrice() %></td>
                        <td><%= position.getCount() %></td>
                </tr>
        <%}%>
</table>
</body>
```

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

## 9. С помощью FreeMarker сверстать страничку с оценками студентов, отсортировать по времени получения оценки

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Оценки студентов</title>
</head>
<body>
    <h1>Оценки студентов</h1>
    <#if grades?size gt 0>
        <table border="1">
            <thead>
                <tr>
                    <th>Имя студента</th>
                    <th>Оценка</th>
                    <th>Время получения</th>
                </tr>
            </thead>
            <tbody>
                <#list grades?sort_by(g -> parseDate(g.dateReceived)) as grade>
                    <tr>
                        <td>${grade.name}</td>
                        <td>${grade.grade}</td>
                        <td>${parseDate(grade.dateReceived)?string("yyyy-MM-dd HH:mm:ss")}</td>
                    </tr>
                </#list>
            </tbody>
        </table>
    <#else>
        <p>Оценки не найдены.</p>
    </#if>
</body>
</html>
```

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
const inputs = document.querySelectorAll('input[type="text"]')

    inputs.forEach(input => {
        let button = document.createElement("button")
        button.textContent = input.value;
        input.replaceWith(button);
    })
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
## 28. 

```css
a{
        text-decoration: none;
    }

    a:active{
        text-decoration: underline;
    }

    h1 a:active{
        text-decoration: none;
    }
```
