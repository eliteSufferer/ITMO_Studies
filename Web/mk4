## Варианты 13579:

### 1. Почему RequestDispatcher через контекст сервлета можно получить только по абсолютному у пути?

`RequestDispatcher` можно получить по абсолютному пути только через контекст сервлета, чтобы устранить неоднозначность. 
Относительный путь интерпретируется относительно текущего URL запроса. Например, если текущий URL запроса — `/app/admin/dashboard`, то относительный путь `./settings` будет интерпретирован как `/app/admin/settings`. Это может привести к неоднозначности или ошибкам, особенно когда одна и та же логика используется в разных частях приложения с разными путями.
Абсолютный путь всегда начинается с `/` и его контекст всегда является корнем веб-приложения, что обеспечивает однозначность в отношении того, какой ресурс должен быть использован.

```java
ServletContext context = getServletContext();
RequestDispatcher dispatcher = context.getRequestDispatcher("/absolutePath");
```


### 2. Какие реализации интерфейса javax.servlet.Servlet входят в состав Jakarta EE 9 и в чем разница между ними?

- `HttpServlet`: Наследуется от `GenericServlet`, специализирован для работы с протоколом HTTP. Методы: `doGet()`, `doPost()`, etc.
- `GenericServlet`: Обобщенная реализация, поддерживает большинство методов этого интерфейса, за исключением метода service(). 
- `FacesServlet` является центральным сервлетом в JavaServer Faces (JSF) — фреймворке для создания пользовательских интерфейсов в Java-приложениях. `FacesServlet` обрабатывает все запросы, связанные с JSF, и является точкой входа в JSF-жизненный цикл.

### 3. Напиши код сервлета, перенаправляющего запрос странице index.jsp, только если в запросе присутствует идентификатор пользователя (cookie `userId`)

```java
@WebServlet("/somePath")
public class MyServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if ("userId".equals(cookie.getName())) {
                RequestDispatcher dispatcher = request.getRequestDispatcher("/index.jsp");
                dispatcher.forward(request, response);
                return;
            }
        }
        // Handle the case when userId is not present
    }
}
```

## Вариант 24680:

### 1. В каком порядке вызываются фильтры в FilterChain?

Фильтры в `FilterChain` вызываются в том порядке, в котором они были определены в конфигурации веб-приложения или в аннотациях.

### 2. Где лучше хранить содержимое корзины покупателя - в атрибутах запроса, сессии или контексте, и почему?

Лучше хранить в сессии (`HttpSession`). Сессия сохраняет данные между множественными запросами одного и того же пользователя и устойчива к перезагрузке страниц.

#### Атрибут запроса

- срок жизни - на протяжении одного запроса. Сл-но, данные будут потеряны сразу же после его завершения
- `Не подходит`

#### Контекст

- срок жизни `ServletContext` ограничен **всем** временем работы веб-приложения (слишком долго)
- контекст сервлёта доступен **для всех пользователей** (зачем другим пользователям знать о вашей корзине?)
- `Не подходит`, т.к. сюда помещаются данные, которые касаются всего приложения, а не каждого юзера

### 3. Код конфигурации, формирующей 2 экземпляра сервлета com.example.MyServlet, обрабатывающая запросы к ресурсам /page1.do и /page2.do соответственно

```xml
<web-app>
    <servlet>
        <servlet-name>firstServlet</servlet-name>
        <servlet-class>com.example.MyServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>firstServlet</servlet-name>
        <url-pattern>/page1.do</url-pattern>
    </servlet-mapping>

    <servlet>
        <servlet-name>secondServlet</servlet-name>
        <servlet-class>com.example.MyServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>secondServlet</servlet-name>
        <url-pattern>/page2.do</url-pattern>
    </servlet-mapping>
</web-app>
```

Таким образом, два экземпляра одного и того же класса `com.example.MyServlet` обрабатывают разные ресурсы.
