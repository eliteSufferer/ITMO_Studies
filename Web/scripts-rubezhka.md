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

## 12. заменить все гиперссылки на текстовое поле со значением ссылки
```js
links.forEach(link => {
        let text = document.createElement('input');
        text.type = "text";
        text.value = link.getAttribute("href");
        link.replaceWith(text);
    })
```
## 13. Написать сценарий, который будет считать количество слов «де-факто» во всех тегах div class= lecture. Ещё надо обязательно использовать jQuery.
```js
$(document).ready(function() {
  let count = 0; // Счетчик для слов "де-факто"
  
  // Перебираем все div с классом "lecture"
  $("div.lecture").each(function() {
    // Получаем текст внутри текущего div
    const text = $(this).text();
    
    // Используем регулярное выражение для поиска всех вхождений "де-факто", независимо от регистра
    const matches = text.match(/де-факто/gi);
    
    // Если найдены совпадения, увеличиваем счетчик на количество найденных слов
    if (matches) {
      count += matches.length;
    }
  });
  
  // Выводим итоговое количество слов "де-факто"
  console.log("Количество слов 'де-факто' в div с классом 'lecture': " + count);
});
```

## 14. Написать js функцию, которая заменяет содержимое <div> с именем класса “nyan” на изображение по ссылке: http://www.example.com/nyancat.gif
```js
    const nyan = document.querySelector(".nyan");
    const catImg =  document.createElement("img") ;
    catImg.src = 'https://http.cat/images/401.jpg';
    nyan.replaceWith(catImg);
```
## 15. Дубликат 6го

## 16. Написать сервлет, который принимает из http запроса параметр name и выводит его.
```java
@WebServlet("/displayname")
public class DisplayNameServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Получаем параметр name из запроса
        String name = request.getParameter("name");
        
        // Устанавливаем тип содержимого ответа
        response.setContentType("text/html");
        
        // Пишем параметр name в ответ
        response.getWriter().println("<html><body>");
        if (name != null && !name.isEmpty()) {
            response.getWriter().println("<h1>Привет, " + name + "!</h1>");
        } else {
            response.getWriter().println("<h1>Привет, анонимный пользователь!</h1>");
        }
        response.getWriter().println("</body></html>");
    }
    
}
```

## 17. Если параметр не обнаружен то вывести Anonymous user

```java
@WebServlet("/servletishe")
public class MyServlet extends HttpServlet {
	public void service(HttpServletRequest req, HttpServletResponse res) {
		var out = res.getWriter();
		var param = req.getParameter(“name”);
		if (param != null) {
			out.println(req.getParameter(“name”));
		else
			out.println(“Anonymous user”);
}
}
```

## 18. Написать конфигурацию сервлета (org.xxx.MyServlet) с помощью аннотации. Сервлет должен принимать все запросы от файлов .html .xhtml
```java
@WebServlet(urlPatterns = {"*.html", "*.xhtml"})
public class MyServlet extends HttpServlet {
    // ... реализация методов doGet, doPost и т.д. ...
}
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

## 20. Написать PHP скрипт который формирует форму с логиным и паролем, которая при сабмите отправляет данные на authenticate.php посредством SuperAgent, и если успешно тогда перенаправить пользователя на main.php
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <script src="https://cdn.jsdelivr.net/npm/superagent"></script>
    <script>
        function handleSubmit(event) {
            event.preventDefault();
            var user = document.getElementById('username').value;
            var pass = document.getElementById('password').value;

            superagent
                .post('authenticate.php')
                .send({ username: user, password: pass })
                .end(function(err, res) {
                    if (res.ok && res.body.success) {
                        window.location.href = 'main.php';
                    } else {
                        alert('Аутентификация не удалась.');
                    }
                });
        }
    </script>
</head>
<body>
    <form onsubmit="handleSubmit(event)">
        <label for="username">Логин:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Войти</button>
    </form>
</body>
</html>
```

```php
<?php
header('Content-Type: application/json');

// Здесь должен быть ваш код для проверки логина и пароля, например:
$user = $_POST['username'];
$pass = $_POST['password'];

// Пример условия успешной аутентификации
if ($user == 'admin' && $pass == 'password') {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}
?>
```

## 21. Повернуть все картинки на 90 градусов в форме с id="myForm"
```css
    #myForm img{
        transform: rotate(90deg);
    }
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
## 24. html форма которая отправляет ответ на вопрос из теста, при этом должен отправляться номер ответа (a,b,c..f) и номер вопроса
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Отправка тестового ответа</title>
</head>
<body>
    <h1>Ответ на вопрос теста</h1>
    <form action="submit_answer.php" method="post">
        <input type="hidden" name="question_number" value="1" /> <!-- Номер вопроса -->
        <p>Вопрос 1: Столица Франции?</p>
        <label>
            <input type="radio" name="answer" value="a" /> a) Мадрид
        </label><br />
        <label>
            <input type="radio" name="answer" value="b" /> b) Париж
        </label><br />
        <label>
            <input type="radio" name="answer" value="c" /> c) Лондон
        </label><br />
        <label>
            <input type="radio" name="answer" value="d" /> d) Берлин
        </label><br />

        <button type="submit" name="submit">Отправить ответ</button>
    </form>
</body>
</html>
```

## 25. Написать код сервлета, который будет перенаправлять все запросы на https://google.com
```java
@WebServlet("/*")
public class RedirectServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("https://google.com");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("https://google.com");
    }

}
```

## 26. Написать HTML страницу и сервлет, возвращающий странице количество сессий

Страница:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Количество Сессий</title>
</head>
<body>
    <h1>Количество активных сессий:</h1>
    <div id="sessionCount">Загрузка...</div>

    <script>
        // Функция для запроса к серверу для получения количества сессий
        function getSessionCount() {
            fetch('SessionCounterServlet')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('sessionCount').textContent = data;
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                });
        }

        // Вызов функции при загрузке страницы
        window.onload = getSessionCount;
    </script>
</body>
</html>
```

Сервлет:
```java
@WebServlet("/SessionCounterServlet")
public class SessionCounterServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Устанавливаем тип содержимого ответа
        response.setContentType("text/plain");
        
        // Получаем количество активных сессий из контекста сервлета
        Integer activeSessions = (Integer) getServletContext().getAttribute("activeSessions");
        
        // Проверяем, инициализирован ли счетчик
        if (activeSessions == null) {
            activeSessions = 0;
        }
        
        // Отправляем количество активных сессий в ответе
        response.getWriter().write("Текущее количество активных сессий: " + activeSessions);
    }
    
    @Override
    public void init() throws ServletException {
        // Инициализируем счетчик активных сессий при старте сервлета
        getServletContext().setAttribute("activeSessions", 0);
    }
}
```

## 27. Страница JSP, проверяющая есть ли jsessionid в запросе и если нету - выводящая сообщение об ошибке с кодом ошибки.
```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // Получаем id сессии из запроса
    String sessionId = request.getRequestedSessionId();

    // Проверяем, была ли сессия уже создана для этого пользователя
    boolean sessionExists = request.isRequestedSessionIdValid();

    // Если sessionId равен null или сессия не существует, выводим сообщение об ошибке
    if (sessionId == null || !sessionExists) {
        // Устанавливаем код ответа HTTP 400 Bad Request
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
%>
        <html>
        <head>
            <title>Ошибка сессии</title>
        </head>
        <body>
            <h1>Ошибка: Идентификатор сессии отсутствует</h1>
            <p>Код ошибки: <%= HttpServletResponse.SC_BAD_REQUEST %></p>
        </body>
        </html>
<%
    } else {
        // Если sessionId существует, отображаем содержимое страницы
%>
        <html>
        <head>
            <title>Страница с Сессией</title>
        </head>
        <body>
            <h1>Сессия активна</h1>
            <p>Идентификатор сессии: <%= sessionId %></p>
        </body>
        </html>
<%
    }
%>
```

## 28. Написать css чтоб по клику все ссылки кроме внутри h1 подчеркивались

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

## 29. Написать страницу на HTML и CSS, скрывающую содержимое от пользователя и показать сообщение "разрешение не поддерживается", если разрешение экрана < 1400.
```html
<style>
    @media (max-width: 1400px){
        .main-part{
            visibility: hidden;
        }

        .err-msg{
            visibility: visible;
        }

    }

    @media (min-width: 1401px){
        .err-msg{
            visibility: hidden;
        }
    }


</style>
<html>
    <head>
        <title>Title</title>
    </head>

    <body>
        <div class="main-part">
            <h1>Hello!</h1>
        </div>

        <div class="err-msg">Unsupported!</div>
    </body>
</html>
```

## 30. Код фильтра запросов, запрещающий доступ к приложению неавторизованным пользователям (у неавторизованного пользователя в запросе отсутствует заголовок "X-Application-User")
```java
@WebFilter("/*")
public class AuthorizationFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Проверяем наличие заголовка "X-Application-User"
        String appUser = httpRequest.getHeader("X-Application-User");

        if (appUser == null || appUser.trim().isEmpty()) {
            // Если заголовок отсутствует, запрещаем доступ, отправляя статус 403 Forbidden
            httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied: User is not authorized.");
        } else {
            // Если заголовок присутствует, продолжаем обработку запроса
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
    }
}
```

## 31. Написать калькулятор на PHP

Форма ввода данных:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Простой калькулятор на PHP</title>
</head>
<body>
    <h1>Калькулятор</h1>
    <form action="calculator.php" method="post">
        <input type="number" name="num1" required="required" step="0.01" /> <br/>
        <input type="number" name="num2" required="required" step="0.01" /> <br/>
        <select name="operator" required="required">
            <option value="add">Сложить</option>
            <option value="subtract">Вычесть</option>
            <option value="multiply">Умножить</option>
            <option value="divide">Разделить</option>
        </select>
        <br/>
        <button type="submit" name="submit">Вычислить</button>
    </form>
</body>
</html>
```

Скрипт:
```php
<?php
if (isset($_POST['submit'])) {
    $num1 = $_POST['num1'];
    $num2 = $_POST['num2'];
    $operator = $_POST['operator'];
    $result = '';

    switch ($operator) {
        case "add":
            $result = $num1 + $num2;
            break;
        case "subtract":
            $result = $num1 - $num2;
            break;
        case "multiply":
            $result = $num1 * $num2;
            break;
        case "divide":
            if ($num2 == 0) {
                $result = "Ошибка: На ноль делить нельзя!";
            } else {
                $result = $num1 / $num2;
            }
            break;
        default:
            $result = "Неизвестная операция";
            break;
    }
    echo "Результат: $result";
}
?>
```
