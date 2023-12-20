## Билет №НОВЫЙ_1

### 1. Компоненты в Angular: взаимодействие с представлениями и сервисами

Компонент - обособленная часть функционала со своей логикой, HTML-
шаблоном и CSS-стилями. Компонент управляет отображение представление на
экране.
За объявление компонента отвечает декоратор `@Component()`

**Взаимодействие с представлениями**

Шаблон компонента (HTML) отображает данные из класса компонента. Это достигается благодаря привязке данных, которая может быть односторонней (от компонента к шаблону) или двусторонней.

Привязка данных:

1. Односторонняя привязка данных:

- Интерполяция: Используется для вывода значения свойства компонента в HTML. Записывается как {{ value }}, где value — свойство компонента.
- Привязка свойств (Property Binding): Позволяет установить значение свойства элемента HTML из компонента. Пример: [property]="value".
- Привязка событий (Event Binding): Позволяет компоненту реагировать на события в шаблоне. Пример: (event)="handler()".

2. Двусторонняя привязка данных:

- NgModel: Используется для форм и инпутов. Позволяет синхронизировать значение поля формы в шаблоне с соответствующим свойством в компоненте. Записывается как [(ngModel)]="property".

3. Привязка стилей и классов:

- Привязка классов: Позволяет динамически управлять классами элементов. Например, [class.special]="isSpecial".
- Привязка стилей: Позволяет установить стили элемента динамически. Например, [style.color]="isSpecial ? 'red' : 'green'".

Как это работает:

- При изменении данных в компоненте, шаблон автоматически обновляется для отображения новых значений.
- В случае двусторонней привязки, изменения в шаблоне также обновляют данные в компоненте.

**Взаимодействие с сервисами**

Сервис - это класс, который является поставщиком данных. Сервисы
инкапсулируют бизнес логику приложения. Сервисы могут предоставлять
интерфейс взаимодействия между отдельными не связанными друг с
другом компонентами.

- Компоненты используют сервисы для выполнения задач, не связанных напрямую с представлением (например, получение данных с сервера).

- Доступ компонентов к сервисам реализуется с помощью DI.

- Список сервисов, поставляющих данные для компонента, указывается в свойстве `providers` декоратора компонента (если нужно ограничить scope сервиса только этим компонентом и его потомками) или берется из `root injector`, у сервисов которого scope - все приложение

Основные принципы реализации DI (является основой взаимодействия компонентов и сервисов):
- Приложение содержит как минимум один глобальный Injector, который
занимается DI.
- Injector создаёт зависимости и передаёт их экземпляры контейнеру
(container).
- Провайдер (provider) -- это объект, который сообщает Injector’у, как
получить или создать экземпляр зависимости.
- Обычно провайдером сервиса является сам его класс.
- Зависимости компонентов указываются в качестве параметров их
конструкторов

### 2. Инициализация Spring Beans

1. **Использование конструктора**:
   - Конструктор используется для создания экземпляра бина. В конфигурации XML это может быть описано через элемент `<constructor-arg>`.
   - Можно передавать параметры в конструктор бина, что полезно для обязательных зависимостей, которые бину нужны для работы.

2. **Метод фабрики (factory-method)**:
   - Вместо прямого создания бина через конструктор, можно определить статический метод в классе, который будет выступать в роли фабрики для создания объекта.
   - Этот метод фабрики указывается в конфигурации бина с помощью атрибута `factory-method`.
   - Также, можно указать другой бин, который будет фабрикой, используя атрибут `factory-bean`.


3. **Особенности Singleton и lazy-init**:
   - По умолчанию, бины в Spring являются синглтонами, то есть создается только один экземпляр бина на весь контекст приложения.
   - `lazy-init="true"`: Если этот атрибут установлен в `true` или бин аннотирован `@Lazy`, бин будет инициализирован не при старте приложения, а при первом обращении к нему.
   - Это может быть полезно для уменьшения времени запуска приложения, особенно если у вас есть бины, которые могут и вовсе не понадобиться в течение работы приложения.

Подробнее о `lazy-init`:
- По умолчанию, Spring создает и инициализирует все синглтон бины при старте приложения. Это гарантирует, что все бины готовы к использованию, но также может привести к увеличению времени запуска.
- Установка `lazy-init` в `true` для бина означает, что создание и инициализация бина откладывается до того момента, когда он действительно потребуется, например, при первом вызове бина через `getBean()` или при первой автоматической инъекции зависимости.
- Можно использовать через XML или через аннотацию @Lazy


### 3. Написать интерфейс для ввода данных банковской карты на React
```js
import React, { useState } from 'react';

const CreditCardInput = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cardDetails);
    // Здесь можно добавить логику отправки данных
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9123 4567"
          maxLength="19"
          // Дополнительная валидация и форматирование могут быть добавлены здесь
        />
      </div>
      <div>
        <label htmlFor="cardHolder">Card Holder</label>
        <input
          type="text"
          name="cardHolder"
          id="cardHolder"
          value={cardDetails.cardHolder}
          onChange={handleChange}
          placeholder="NAME SURNAME"
        />
      </div>
      <div>
        <label htmlFor="expiryMonth">Expiry Month</label>
        <input
          type="text"
          name="expiryMonth"
          id="expiryMonth"
          value={cardDetails.expiryMonth}
          onChange={handleChange}
          placeholder="MM"
          maxLength="2"
        />
      </div>
      <div>
        <label htmlFor="expiryYear">Expiry Year</label>
        <input
          type="text"
          name="expiryYear"
          id="expiryYear"
          value={cardDetails.expiryYear}
          onChange={handleChange}
          placeholder="YY"
          maxLength="2"
        />
      </div>
      <div>
        <label htmlFor="cvv">CVV</label>
        <input
          type="password"
          name="cvv"
          id="cvv"
          value={cardDetails.cvv}
          onChange={handleChange}
          placeholder="123"
          maxLength="3"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreditCardInput;
```

## Билет 26

### 1. Process validations phase, Update module values phase

**Process validations phase**
- На этом этапе JavaServer Faces обрабатывает все валидаторы, зарегистрированные на компонентах, с помощью метода validate (). 
Он изучает атрибуты компонента, задающие правила проверки, и сравнивает эти правила с локальным значением, сохраненным для компонента. 
- JavaServer Faces также завершает вычисления для входных компонентов
- Если значение компонента не проходит
валидацию, формируется сообщение об ошибке,
которое сохраняется в FacesContext.

**Update module values phase**
- Убедившись, что данные валидны, совершается обход дерева компонентов и установка соответствующих свойств объектов на стороне сервера 
в локальные значения компонентов. Реализация JavaServer Faces обновляет только значения бинов, на которые указывает атрибут value входного 
компонента. 
- Если локальные данные не могут быть преобразованы к типам, указанным в свойствах бобов, жизненный цикл переходит непосредственно 
к фазе Render Response, чтобы страница была перерисована с отображением ошибок.

### 2. Жизненный цикл Spring-приложения

> По сути, из того что я понял, ЖЦ Spring-app сводится к ЖЦ бинов. Поэтому вот так:

![SB LC](image.png)

1. **Загрузка конфигурации**: Spring-приложение начинается с создания `ApplicationContext`, который загружает конфигурации бинов, определенных в XML, Java конфигурации или через аннотации.

2. **BeanDefinitionReader**: Этот компонент читает и интерпретирует конфигурационные метаданные, создавая определения бинов (`BeanDefinition`).

3. **Bean Definitions**: Определения бинов содержат информацию, необходимую для создания экземпляров бинов, такую как класс, область видимости (scope), методы жизненного цикла и зависимости.

4. **Bean Creation**: `BeanFactory` или `ApplicationContext` создает экземпляры бинов на основе их определений.

5. **Dependency Injection**: Внедряются зависимости через конструкторы или сеттеры.

6. **Initialization**: Вызываются методы инициализации, такие как `@PostConstruct` или методы, определенные через интерфейс `InitializingBean` или `init-method`.

7. **Bean Post Processing**: `BeanPostProcessors` могут вносить дополнительные изменения в бины после их инициализации.

8. **Ready for Use**: Бины готовы к использованию в приложении.

9. **Destroy**: При завершении приложения для бинов с областью видимости "singleton" вызываются методы уничтожения, такие как `@PreDestroy` или методы, определенные через интерфейс `DisposableBean` или `destroy-method`.

**Подробнее о жизненном цикле бина:**

**Этап инициализации**:

- **BeanFactory создает bean-компонент**: Создается экземпляр класса бина.
- **Статический блок инициализации**: Выполняется статический блок инициализации (если он есть в классе бина).
- **Не статический блок инициализации**: Выполняется блок инициализации экземпляра (если он есть в классе бина).
- **Внедрение зависимостей**: Происходит внедрение зависимостей через конструктор, затем через сеттеры или поля.
- **Aware интерфейсы**: Если бин реализует определенные интерфейсы (например, `ApplicationContextAware`), Spring вызывает соответствующие методы.
- **BeanPostProcessor**: Вызываются методы `postProcessBeforeInitialization` и `postProcessAfterInitialization` для дополнительной обработки бина.

**Этап уничтожения**:

- **Применим только для синглтонов**: Этап уничтожения применим только к синглтон-бинам.
- **@PreDestroy**: Вызываются методы с аннотацией `@PreDestroy`.
- **DisposableBean**: Вызывается метод `destroy` для бинов, реализующих интерфейс `DisposableBean`.
- **destroy-method**: Вызывается пользовательский метод уничтожения, если он определен.


### 3. Интерфейс на Angular, который выводит интерактивные часы с обновление каждую секунду

**clock.component.ts**:
```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  time: Date = new Date();
  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = interval(1000)
      .pipe(map(() => new Date()))
      .subscribe(newTime => {
        this.time = newTime;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**clocck.component.html**
```html
<div class="clock">
  <p>{{ time | date: 'HH:mm:ss' }}</p>
</div>
```

## Билет 25

### 1. Шаблоны и представление в Angular

**Шаблоны (Templates)**
Шаблоны в Angular - это HTML-представления, которые используют Angular-расширения. Они могут включать директивы, привязки данных и другие конструкции Angular.

- Директивы: Указания Angular о том, как должен работать DOM при изменении данных. По своей реализации директивы практически идентичны компонентам (компонент — это директива с HTML-шаблоном). Есть два вида директив: структурные (добавляют, удаляют или заменяют элементы в DOM. Примеры: *ngIf, *ngFor) и атрибуты (задают элементу другое поведение. Примеры: [ngStyle], [ngClass]).
- Привязка данных: Механизмы, позволяющие связывать свойства в классе компонента с элементами в шаблоне. Существует несколько форм привязки данных:
  - Интерполяция: {{ value }}
  - Свойство: [property]="value"
  - Событие: (event)="handler()"
  - Двусторонняя: [(ngModel)]="value"
> Подробнее про привязку в одном из предыдущих вопросов
- Пайпы (Pipes): Позволяют осуществлять преобразование формата отображаемых данных (например, дат или денежных сумм) прямо в шаблоне. Например, {{ date | date:'shortDate' }} преобразует объект Date в короткую дату. Фильтры можно объединять в последовательности (pipe chains). 


**Представления (Views)**
Представления - это то, что создается на основе шаблонов и модели данных компонента при рендеринге компонента. 
- Компоненты и их шаблоны формируют представления
- Компонент может содержать *иерархию представлений*, которая содержит *встроенные представления* из других компонентов
- Каждый компонент содержит *корневое представление* (host view)

### 2. Dependency Lookup Spring	

В Spring Framework, "Dependency Lookup" (поиск зависимостей) относится к процессу явного получения зависимостей (компонентов, бинов) из контейнера Spring вместо их автоматического внедрения (инъекции). Это процесс, при котором бин ищет другие бины, на которые он зависит, используя определенные механизмы Spring для поиска этих зависимостей в контейнере приложения.

**Методы Dependency Lookup в Spring**

1. **Использование ApplicationContext**:
   - Самый прямой способ - получить доступ к `ApplicationContext` и использовать его для получения бинов.
   - Пример:
     ```java
     ApplicationContext applicationContext = new ClassPathXmlApplicationContext("/application-context.xml");
     MyBean bean = applicationContext.getBean("myBean")
     ```
     Здесь класс инициализирует `ApplicationContext` через XML, а потом ищет в контексте бин с названием myBean

2. **JNDI Lookup**:
   - Java Naming and Directory Interface (JNDI) может использоваться для поиска ресурсов, таких как источники данных JNDI.
   - Пример:
     ```java
     Context ctx = new InitialContext();
     DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/MyDataSource");
     ```

3. **Использование BeanFactory**:
   - `BeanFactory` является более низкоуровневым интерфейсом, чем `ApplicationContext`, и также может использоваться для поиска бинов.
   - Пример:
     ```java
     BeanFactory factory = ...; // получение BeanFactory
     MyBean bean = factory.getBean(MyBean.class);
     ```

**Сценарии использования Dependency Lookup**

Хотя Dependency Injection является более предпочтительным подходом в Spring, в некоторых сценариях Dependency Lookup может быть полезен:

- **Наличие условной логики**: Если для получения бина требуется сложная или условная логика, которую нельзя легко выразить через DI.
- **Динамический поиск бинов**: В ситуациях, когда необходимо динамически искать и использовать бины в зависимости от определенных условий во время выполнения.

### 3. Конфигурация, чтобы JSF обрабатывал все запросы приходящие с .xhtml и со всех URL, начинающихся с /faces/

```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- Faces Servlet -->
    <servlet>
        <servlet-name>Faces Servlet</servlet-name>
        <servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!-- Map all URLs ending with .xhtml -->
    <servlet-mapping>
        <servlet-name>Faces Servlet</servlet-name>
        <url-pattern>*.xhtml</url-pattern>
    </servlet-mapping>

    <!-- Map all URLs starting with /faces/ -->
    <servlet-mapping>
        <servlet-name>Faces Servlet</servlet-name>
        <url-pattern>/faces/*</url-pattern>
    </servlet-mapping>

    <!-- Other configurations -->

</web-app>
```

## Билет 24

### 1. CDI Beans

- Универсальные компоненты уровня бизнес-логики.
- Абстрактная реализация паттерна CDI в Java / Jakarta EE.
- «Клонируют» основные концепции бинов из Spring.
- Общая идея – «отвязаться» от конкретного
фреймворка при создании бизнес-логики внутри
приложения.
- Конфигурируются аннотациями, основной пакет –
javax.enterprise.context.
- Для CDI используется универсальная аннотация
@Inject.
- В отличие от EJB, не обеспечивают горизонтальную
масштабируемость «сами по себе»

Пример CDI бина:
```java
package demos;
import javax.enterprise.context.*;
@RequestScoped
public class MyBean {
public void doSomething() {
//…
}
}
```

**CDI Bean Scope**

Аналог контекста (scope) управляемых бинов JSF.
- Определяет жизненный цикл бинов и их видимость друг для
друга.
- Задаётся аннотацией.
- В спецификации определены 6 уровней контекста:
  - @RequestScoped.
  - @SessionScoped.
  - @ApplicationScoped.
  - @ViewScoped – из JSF, но работает и для CDI-бинов.
  - @ConversationScoped (Идейно похож на @CustomScoped из JSF – жизненным циклом компонента управляет программист.)
  - @Dependent (используется по умолчанию, Идейно похож на @NoneScoped из JSF – жизненный циклом компонента определяется тем, где он был использован.)

**Доп. аннотации**
Для именования бинов используется аннотация `@Named`

Аннотация `@Alternative` позволяет определить дополнительные реализации для бина, которые могут быть выбраны вместо стандартной реализации. Для активации альтернативного бина его нужно указать в файле конфигурации beans.xml. Это особенно полезно в ситуациях, когда есть несколько реализаций одного и того же интерфейса, и надо явно выбрать, какая реализация должна использоваться в определенном контексте приложения.

**Фабрики**
«Фабрики» - Бины, которые управляют созданием новых экземпляров других бинов.
 Используют аннотации `@Produces` и `@Disposes`.
Позволяют использовать в качестве CDI-бинов
классы, не соответствующие паттерну Java Beans
(например, имеющие только конструкторы с
параметрами).

**События**
- В спецификации CDI-beans описана гибкая
модель работы с событиями.
- Каждый бин может определять свои
дополнительные типы событий.
- Каждый бин может быть источником событий
любых типов.
- Обработкой событий занимаются специальные
методы-наблюдатели (аннотация @Observes).


### 2. Angular DI

**Dependency injection**
- Общая концепция: зависимости объекта передаются ему извне, а не создаются самим объектом
- Компоненты могут использовать сервисы с помощью DI.
- Для того, чтобы класс можно было использовать с помощью DI, он должен
содержать декоратор @Injectable()

**Основные принципы реализации DI**
- Приложение содержит как минимум один глобальный Injector, который
занимается DI.
- Injector создаёт зависимости и передаёт их экземпляры контейнеру
- Провайдер (provider) -- это объект, который сообщает Injector’у, как
получить или создать экземпляр зависимости.
- Обычно провайдером сервиса является сам его класс. Для каждого сервиса должен быть зарегистрирован как минимум один провайдер.
- Зависимости компонентов указываются в качестве параметров их конструкторов

### 3. JSF страничка с данными из бина

> Непонятно, какая страничка и какого бина, код для примера, суть будет та же независимо от условия

Создание бина:

```java
@ManagedBean
@RequestScoped
public class UserBean {
    private String name = "John Doe";
    private int age = 30;

    // Геттеры и сеттеры
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

Создание самой страницы:
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://xmlns.jcp.org/jsf/html">
<head>
    <title>User Info</title>
</head>
<body>
    <h:form>
        <h2>User Information</h2>
        <h:outputText value="Name: #{userBean.name}" /><br/>
        <h:outputText value="Age: #{userBean.age}" /><br/>
    </h:form>
</body>
</html>
```


## Билет 23

### 1. Конвертеры JSF, создание и назначение

- Используются для преобразования данных в заданный формат
- Реализуют интерфейс javax.convert.Converter
- Стандартные конверторы для основных типов данных (javax.faces.Boolean, javax.faces.DateTime, javax.faces.Double, javax.faces.Character, etc.)
- JSF также позволяет создавать собственные конверторы:

Для создания конвертера нужно реализовать интерфейс `javax.faces.convert.Converter` (Этот интерфейс требует реализации двух методов: `getAsObject()` и `getAsString()`), а потом зарегистрировать конвертер через аннотацию `@FacesConverter`


**Назначение конвертеров:**
- Автоматическое (на основании типа данных):
```<h:inputText value="#{user.age}"/>```

- С помощью атрибута converter:
```js
<h:inputText
converter="#{javax.faces.DateTime}"/>
```

- С помощью вложенного тега:
```js
<h:outputText value="#{user.birthDay}">
<f:converter
converterId="#{javax.faces.DateTime}"/>
</h:outputText>
```

### 2. Реализация model в Spring web MVC

Spring Web MVC – “базовый” фреймворк в составе Spring для разработки веб-приложений.

Model – инкапсулирует данные приложения (состоят из POJO или бинов).

- Хранит данные, необходимые для формирования представления.
- Сами по себе эти данные – обычные POJO.
- В общем случае, реализует интерфейс `org.springframework.ui.Model`
- Есть «упрощённая» реализация, представляющая из себя Map – `org.springframework.ui.ModelMap.`

Пример работы с моделью через ModelMap:

```java
@GetMapping("/printViewPage")
public String passParametersWithModelMap(ModelMap map) {
map.addAttribute("welcomeMessage", "welcome");
map.addAttribute("message", "Hello, World!");
return "viewPage";
}
```

### 3. Написать на vue.js интерфейс для навигации по текстовому документу, представленному в виде большой строки, должны быть реализованы переходы на следующую и предыдущую страницу

```js
<template>
  <div class="document-navigator">
    <div class="page-view" v-html="currentPageContent"></div>
    <button @click="goToPreviousPage" :disabled="currentPageIndex <= 0">Previous</button>
    <button @click="goToNextPage" :disabled="currentPageIndex >= lastPageIndex">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      documentContent: 'Очень большой текст нашего документа...', 
      currentPageIndex: 0,
      pageSize: 1000, // количество символов на одной странице
    };
  },
  computed: {
    // Разбиваем документ на страницы
    pages() {
      let pages = [];
      for (let i = 0; i < this.documentContent.length; i += this.pageSize) {
        pages.push(this.documentContent.substring(i, i + this.pageSize));
      }
      return pages;
    },
    // Содержимое текущей страницы
    currentPageContent() {
      return this.pages[this.currentPageIndex] || '';
    },
    // Индекс последней страницы
    lastPageIndex() {
      return this.pages.length - 1;
    }
  },
  methods: {
    // Перейти на предыдущую страницу
    goToPreviousPage() {
      if (this.currentPageIndex > 0) {
        this.currentPageIndex--;
      }
    },
    // Перейти на следующую страницу
    goToNextPage() {
      if (this.currentPageIndex < this.lastPageIndex) {
        this.currentPageIndex++;
      }
    }
  }
};
</script>
```

## Билет 22

### 1. Класс FacesServlet - назначение, особенности конфигурации

Класс FacesServlet
- Центральный компонент в архитектуре JSF, контроллер в шаблоне MVC
- Обрабатывает запросы с браузера.
- Формирует объекты-события и вызывает методы-слушатели.
- Управляет жизненным циклом запроса (прохождение через все фазы)
- Конфигурация задается в web.xml
- 
![Faces Servlet](image-1.png)

Пример конфигурации:

```xml
<!-- Faces Servlet -->
<servlet>
<servlet-name>Faces Servlet</servlet-name>
<servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
<load-on-startup>1</load-on-startup>
</servlet>
<!-- Faces Servlet Mapping -->
<servlet-mapping>
<servlet-name>Faces Servlet</servlet-name>
<url-pattern>/faces/*</url-pattern>
</servlet-mapping>
```

### 2. Vue.js - ключевые особенности, преимущества и недостатки

Vue.js — JavaScript фреймворк для создания пользовательских интерфейсов. Построен на архитектуре MVVM; может быть использован для разработки SPA в реактивном стиле.

#### Ключевые особенности Vue.js:
- **Реактивность**: Vue автоматически обновляет DOM при изменении состояния приложения.
- **Компонентный подход**: Построение приложений с помощью переиспользуемых компонентов.
- **Декларативный рендеринг**: Описание того, какие данные должны отображаться, используя простой синтаксис шаблонов.
- **Двусторонняя привязка данных**: Синхронизация данных между моделью и представлением.
- **Виртуальный DOM**: Улучшает производительность за счёт минимизации прямых обновлений в DOM.
- **Легкость интеграции**: Может быть использован для улучшения существующих приложений благодаря постепенной интеграции.
- **Экосистема**: Vue предоставляет маршрутизатор (Vue Router), состояние управления (Vuex) и множество инструментов для разработки.

#### Преимущества:
- **Простота и гибкость**: Низкий порог входа, благодаря читаемому синтаксису и обширной документации.
- **Легковесность**: Минимальный размер фреймворка ускоряет загрузку и выполнение приложения.
- **Высокая производительность**: Быстрое время отклика и эффективное обновление DOM.
- **Отличная инструментальная поддержка**: Vue CLI для быстрой разработки, DevTools для отладки.
- **Активное сообщество**: Широкое сообщество разработчиков и много обучающих материалов.

#### Недостатки:
- **Меньшая популярность по сравнению с React и Angular**: Может быть готовых решений, пакетов и тд.
- **Ограничения в крупных проектах**: Несмотря на то, что Vue хорошо масштабируется, некоторые крупные проекты могут столкнуться с трудностями в управлении состоянием, что может требовать дополнительных абстракций или шаблонов проектирования.
- **Различия в экосистеме**: Некоторые библиотеки и плагины могут быть менее зрелыми по сравнению с аналогами для React или Angular.

### 3. REST - контроллер на Spring Web MVC, предоставляющий CRUD-интерфейс к таблице со списком покемонов

Создадим сущность покемона:
```java
@Entity
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;

    // Геттеры и сеттеры
}
```

И репозиторий покемона:

```java
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    // Spring Data JPA предоставляет реализацию CRUD операций
}
```

Сам контроллер:

```java
@RestController
@RequestMapping("/pokemons")
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    // Получение списка всех покемонов
    @GetMapping
    public List<Pokemon> getAllPokemons() {
        return pokemonRepository.findAll();
    }

    // Получение покемона по ID
    @GetMapping("/{id}")
    public Pokemon getPokemonById(@PathVariable Long id) {
        return pokemonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pokemon not found with id " + id));
    }

    // Создание нового покемона
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pokemon createPokemon(@RequestBody Pokemon pokemon) {
        return pokemonRepository.save(pokemon);
    }

    // Обновление существующего покемона
    @PutMapping("/{id}")
    public Pokemon updatePokemon(@PathVariable Long id, @RequestBody Pokemon pokemonDetails) {
        Pokemon pokemon = pokemonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pokemon not found with id " + id));

        pokemon.setName(pokemonDetails.getName());
        pokemon.setType(pokemonDetails.getType());
        return pokemonRepository.save(pokemon);
    }

    // Удаление покемона
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePokemon(@PathVariable Long id) {
        Pokemon pokemon = pokemonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pokemon not found with id " + id));
        pokemonRepository.delete(pokemon);
    }
}
```

## Билет 21

### 1. REST в Spring: методы и аргументы

REST backend - Серверная часть приложения, открытая «наружу» через REST API. Управляет бизнес-логикой и взаимодействием с
хранилищем данных.

Spring предлагает создание RESTful веб-сервисов через Spring MVC или Spring WebFlux (для реактивных приложений).

В Spring MVC зайдействованы обычные контроллеры Spring Web MVC. Требуется автоматическая сериализация /
десериализация данных, поэтому реализуется через аннотации, которые дают этот функционал. Эти аннотации используются для маркировки методов в контроллерах, обрабатывающих HTTP-запросы. 

**Аннотации методов**
- @GetMapping: Обрабатывает HTTP GET запросы. Используется для получения данных.
- @PostMapping: Обрабатывает HTTP POST запросы. Используется для создания новых ресурсов.
- @PutMapping: Обрабатывает HTTP PUT запросы. Используется для обновления существующих ресурсов.
- @DeleteMapping: Обрабатывает HTTP DELETE запросы. Используется для удаления ресурсов.
- @PatchMapping: Обрабатывает HTTP PATCH запросы. Используется для частичного обновления ресурсов.

**Аннотации аргументов метода**
- @PathVariable: Используется для извлечения значений из URI.
- @RequestParam: Используется для связывания параметров запроса с аргументами метода.
- @RequestBody: Применяется для получения и преобразования тела HTTP-запроса в объект Java. Часто используется в методах с аннотациями @PostMapping и @PutMapping.
- @ResponseBody: Индицирует, что возвращаемое значение метода должно быть привязано к телу HTTP-ответа.
- @RequestHeader: Используется для получения конкретных HTTP заголовков из запроса.
- @ModelAttribute: Преобразует входящие параметры запроса (обычно из форм) в объект модели.

## 2. Навигация в React. React Router

`React Router` является стандартным решением для навигации в приложениях React. Он позволяет реализовывать динамические переходы между различными компонентами вашего приложения без перезагрузки страницы, что характерно для одностраничных приложений (SPA).

**Основные концепции React Router:**
- `Router`: Работает как контейнер для всего роутинга в приложении. Виды маршрутизаторов включают `BrowserRouter` (использует HTML5 history API для создания чистых URL без хэша) и HashRouter (использует URL с хэшами, полезен для поддержки старых браузеров).

- `Route`: Определяет соответствие между URL и компонентом React. Когда URL соответствует пути, определенному в Route, активируется соответствующий компонент.

- `Link`: Позволяет создавать навигационные элементы в приложении без полной перезагрузки страницы.
По сути заменяет традиционный HTML-тег `<a>` для навигации, предотвращая стандартное поведение браузера по перезагрузке страницы.

- `Switch`: Используется для группирования маршрутов и гарантирует, что только один маршрут внутри Switch может рендериться в данный момент времени.

**Дополнительные концепции**
- Dynamic Routing (Динамическая маршрутизация):

React Router позволяет динамически определять маршруты в приложении, что упрощает создание модульных и масштабируемых приложений.

- Nested Routes (Вложенные маршруты):

Позволяют создавать более сложные иерархии в приложении, например, когда один маршрут содержит другие подмаршруты.

- Redirects (Перенаправления):

Используются для перенаправления пользователя на другой маршрут, что может быть полезно, например, при авторизации пользователя.

- Navigation Guards (Охранники навигации):

Позволяют реализовать логику контроля доступа, проверяя, должен ли пользователь иметь доступ к определенной странице или нет.

### 3. Бронь авиабилетов на jsf

Бины для управления логикой:
```java
@ManagedBean
@SessionScoped
public class BookingBean {
    private String passengerName;
    private String flightNumber;

    public String bookTicket() {
        // Здесь может быть логика обработки бронирования
        return "confirmation?faces-redirect=true";
    }

    // Геттеры и сеттеры
    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }
}
```

Сами JSF страницы:

Страница ввода данных бронирования:
```js
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html">
<h:head>
    <title>Booking Page</title>
</h:head>
<h:body>
    <h:form>
        <h:panelGrid columns="2">
            <h:outputLabel for="name" value="Passenger Name:" />
            <h:inputText id="name" value="#{bookingBean.passengerName}" />

            <h:outputLabel for="flightNumber" value="Flight Number:" />
            <h:inputText id="flightNumber" value="#{bookingBean.flightNumber}" />
        </h:panelGrid>

        <h:commandButton value="Book" action="#{bookingBean.bookTicket}" />
    </h:form>
</h:body>
</html>
```

Страница подтверждения:

```js
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html">
<h:head>
    <title>Confirmation Page</title>
</h:head>
<h:body>
    <h:panelGrid columns="2">
        <h:outputText value="Passenger Name:" />
        <h:outputText value="#{bookingBean.passengerName}" />

        <h:outputText value="Flight Number:" />
        <h:outputText value="#{bookingBean.flightNumber}" />
    </h:panelGrid>

    <h:button value="Back to Booking" outcome="/booking" />
</h:body>
</html>

```


## Билет 20

### 1. Контекст управляемых бинов. Конфигурация контекста бина

**Сопособы конфигурации**: Задаётся через faces-config.xml или с помощью аннотаций.


Пример через faces-config:
```xml
<managed-bean>
<managed-bean-name>customer</managed-bean-name>
<managed-bean-class>CustomerBean</managed-bean-class>
<managed-bean-scope>request</managed-bean-scope>
...
```

Через аннотации:
```java
@ManagedBean(name="customer")
@RequestScoped
public class CustomerBean {
...
}
```

6 вариантов конфигурации:
- @NoneScoped — контекст не определён, жизненным
циклом управляют другие бины.
- @RequestScoped (применяется по умолчанию) — Бин создается заново при каждом HTTP запросе, используется для коротких операций, не требующих сохранения состояния между запросами.
- @ViewScoped (JSF 2.0) — Бин остается активным в течение жизни одного и того же JSF view (например, пока пользователь находится на одной и той же странице). Используется для операций, состояние которых должно сохраняться при AJAX-запросах на одной странице.
- @SessionScoped — Бин остается активным в течение всей пользовательской сессии. Используется для данных, которые должны сохраняться между различными запросами в рамках одной сессии пользователя.
- @ApplicationScoped — Бин остается активным в течение всего времени жизни приложения. Используется для данных, общих для всех пользователей приложения.
- @CustomScoped (JSF 2.0) — бин сохраняется в Map; программист сам управляет его жизненным циклом.


### 2. Шаблоны MVVM и MVP. Сходства и отличия от MVC 

MVC:

![MVC](image-3.png)

MVP:

![MVP](image-4.png)

MVVM:

![MVVM](image-5.png)

`MVVM (Model-View-ViewModel)` и `MVP (Model-View-Presenter)` являются паттернами проектирования пользовательского интерфейса, которые эволюционировали из традиционного паттерна MVC (Model-View-Controller). Все эти шаблоны направлены на разделение ответственности в приложениях, но они делают это по-разному.

**MVP (Model-View-Presenter)**
- Model: Так же, как и в MVC, содержит бизнес-логику и данные.
- View: Отображает данные и делегирует обработку событий Presenter'у.
- Presenter: Содержит логику представления. Работает с Model и обновляет View, но в отличие от Controller в MVC, Presenter взаимодействует более тесно с View.

В MVP, View пассивно отображает то, что Presenter ему командует, и не содержит почти никакой логики, кроме делегирования действий пользователей Presenter'у

| Основные отличия от MVC | MVC | MVP |
| ----------------------- | --- | --- |
| **Связь между View и Model** | Пользовательский интерфейс (View) и механизм доступа к данным (Model) тесно связаны. | Решает проблему зависимого представления, используя Presenter как канал связи между Model и View. |
| **Отношения между компонентами** | В отношениях "один-ко-многим" между контроллером и представлениями. Один контроллер может выбрать разные представления. | Связь "один к одному" между Presenter и View; один Presenter управляет одним View. |
| **Знание о других компонентах** | View не знает о существовании контроллера. | У View есть референс на Presenter. |
| **Обработка пользовательского ввода** | Контроллер обрабатывает пользовательский ввод. | View служит точкой входа в приложение, а Presenter управляет логикой ответов. |

Ключевое различие между MVP и MVC заключается в том, что Presenter в MVP играет более активную роль в коммуникации между моделью и представлением и отвечает за управление потоком данных между ними.


**MVVM (Model-View-ViewModel)**
- Model: Аналогичен Model в MVC и MVP.
- View: Отображает данные, предоставленные ViewModel, и генерирует события пользовательского интерфейса.
- ViewModel: Слой между View и Model. Он обрабатывает ввод пользователя из View, но вместо того, чтобы напрямую изменять Model, ViewModel обычно работает с привязками данных, чтобы обновить View.

В MVVM, ViewModel реагирует на изменения в Model и View, облегчая таким образом двустороннюю привязку данных. Это уменьшает количество кода, необходимого в View.

**Отличия:**
- MVVP в большей степени ориентирован на события, поскольку использует привязку данных и, таким образом, позволяет легко отделить основную бизнес-логику от представления.
- Несколько представлений могут быть сопоставлены с одной моделью ViewModel, и, таким образом, между представлением и моделью ViewModel существует отношение "один-ко-многим".
- View имеет референс на ViewModel
- Представление принимает входные данные от пользователя и выступает в качестве точки входа в приложение.

### 3. Компонент для React, формирующий строку с автодополнением. Массив значений для автодополнения должен получаться с сервера посредством запроса к REST API

Компонент:
```jsx
import React, { useState, useEffect } from 'react';

const AutoComplete = ({ url }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (input.length > 1) {
            fetch(url + '?query=' + input)
                .then(response => response.json())
                .then(data => setSuggestions(data))
                .catch(error => console.error('Error fetching data: ', error));
        } else {
            setSuggestions([]);
        }
    }, [input, url]);

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type to search..."
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((item, index) => (
                        <li key={index} onClick={() => setInput(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
```

Использование в приложении:

```jsx
import React from 'react';
import AutoComplete from './AutoComplete';

const App = () => {
    return (
        <div>
            <h1>AutoComplete Component</h1>
            <AutoComplete url="https://example.com/api/suggestions" />
        </div>
    );
};

export default App;
```


## Билет 19

### 1. Managed bean: назначение, конфигурация, использование в xhtml

**Назначение**
- Содержат параметры и методы для обработки данных с компонентов.
- Используются для обработки событий UI и валидации
данных.
- Жизненным циклом управляет JSF Runtime
Envronment.
- Есть разные контексты (Request, Session, Application...)
- Доступ из JSF-страниц осуществляется с помощью
элементов EL.
- Конфигурация задаётся в faces-config.xml (JSF 1.X),
либо с помощью аннотаций (JSF 2.0).
- Вместо них могут использоваться CDI-бины, EJB или
бины Spring.

**Конфигурация**

1. Способ 1 — через faces-config.xml:

```xml
<managed-bean>
<managed-bean-name>customer</managed-bean-name>
<managed-bean-class>CustomerBean</managed-bean-class>
<managed-bean-scope>request</managed-bean-scope>
<managed-property>
<property-name>areaCode</property-name>
<value>#{initParam.defaultAreaCode}</value>
</managed-property>
</managed-bean>
```

2. Способ 2 (JSF 2.0) — с помощью аннотаций:

```java
@ManagedBean(name="customer")
@RequestScoped
public class CustomerBean {
...
@ManagedProperty(value="#{initParam.defaultAreaCode}"
name="areaCode")
private String areaCode;
...
}
```

**Использование**

Доступ к управляемым бинам со страниц приложения осуществляется с помощью EL-выражений:

```xhtml
...
<h:inputText value="#{user.name}"
validator="#{user.validate}" />
...
<h:inputText binding="#{user.nameField}" />
...
<h:commandButton action="#{user.save}"
value="Save" />
...
```

### 2. Архитектура и состав Spring Web MVC

Spring Web MVC – “базовый” фреймворк в составе Spring для разработки веб-приложений, основан на паттерне MVC; универсальный, удобен для
разработки REST API.

**Архитекутра**

![SMVC](image-6.png)

1. **HTTP Request**: Все начинается с HTTP-запроса, который отправляется на сервер.

2. **DispatcherServlet**:
   - Обрабатывает все запросы и формирует ответы на них.
   - Связывает между собой все элементы архитектуры Spring MVC.
   - Обычный сервлет – конфигурируется в web.xml.

3. **Handler Mapping (1)**:
   - Интерфейс, позволяющий распределять запросы по различным обработчикам (контроллерам).
   - Помимо «основного» Handler'а, в обработке
запроса могут участвовать один или несколько
«перехватчиков» (реализаций интерфейса HandlerInterceptor).
  - Механизм в общем похож на сервлеты и
фильтры.

4. **Controller (2)**:
   - Контроллер берет на себя обработку запроса после того, как `Handler Mapping` определяет, что он должен этим заниматься.
   - Здесь выполняется бизнес-логика, обработка данных из запроса, взаимодействие с Model (сервисы, компоненты доступа к данным и т.д.) и возвращается некоторый результат, обычно в виде имени представления и модели данных для этого представления (объект `ModelAndView`).

5. **View Resolver (3)**:
   - Представление в Spring Web MVC может быть построено
на разных технологиях, с каждым представлением сопоставляется его
символическое имя.
   - Преобразованием символических имён в ссылки на
конкретные представления занимается специальный
класс, реализующий интерфейс
org.springframework.web.servlet.ViewResolver.
   - В одном приложении можно использовать несколько
ViewResolver'ов.
   - После того, как контроллер выполнит свою работу, `View Resolver` определяет, какое представление должно быть использовано для отображения результатов выполнения.
   - Он преобразует логическое имя представления, предоставленное контроллером, в фактический путь к файлу представления (например, к файлу JSP).

1. **View (4)**:
   - Представление отвечает за отображение ответа пользователю. Это может быть страница JSP, HTML и т.д., которая рендерит данные, предоставленные контроллером.
   - После рендеринга представление (View) возвращается обратно в `DispatcherServlet`.

2. **HTTP Response**:
   - Наконец, `DispatcherServlet` отправляет сформированный ответ обратно клиенту.

Эта схема демонстрирует, как Spring MVC следует паттерну "Front Controller", где `DispatcherServlet` играет центральную роль в координации процесса обработки запроса, взаимодействия с компонентами бизнес-логики и подготовке ответа для клиента.
**Состав приложения**

- Model:
  - Хранит данные, необходимые для
    формирования представления.
  - Сами по себе эти данные – обычные POJO.
  - В общем случае, реализует интерфейс
    org.springframework.ui.Model.
  - Есть «упрощённая» реализация,
    представляющая из себя Map - org.springframework.ui.ModelMap.
- View – отвечает за отображение данных модели.
  - Фреймворк не специфицирует жёстко
  технологию, на которой должно быть построено
  представление.
  - Вариант «по-умолчанию» – JSP.
  - Можно использовать Thymeleaf, FreeMarker, etc.
  - Можно реализовать представление вне
  контекста Spring – целиком на JS.
- Controller – обрабатывает запрос пользователя,
создаёт соответствующую модель и передаёт её
для отображения в представление.
  - Класс, который связывает модель с
представлением, управляет состоянием модели.
  - Помечается аннотацией @Controller.
  - Класс или его методы могут быть помечены
  аннотациями, «привязывающими» их к
  определённым методам HTTP или URL.


### 3. Интерфейс на Ангуляр, проверяющий авторизован ли пользователь(jsessionid). Если нет, то предоставляется форма для авторизации

Сервис для аунтефикации:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkSession() {
    return this.http.get('/api/session/check');
  }
}
```

Компонент формы аунтефикации:

```ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateURL: './login.component.html'
})
export class LoginComponent implements OnInit {
  isAuthorized: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkSession().subscribe(
      (response: any) => {
        // Проверка JSESSIONID или другого маркера авторизации
        this.isAuthorized = response.isAuthorized;
      },
      (error) => {
        this.isAuthorized = false;
      }
    );
  }

  login() {
    // Логика входа
  }
}
```

Шаблон компонента:

```html
<form *ngIf="!isAuthorized" (ngSubmit)="login()">
  <input type="text" [(ngModel)]="username" name="username" placeholder="Username">
  <input type="password" [(ngModel)]="password" name="password" placeholder="Password">
  <button type="submit">Login</button>
</form>
<div *ngIf="isAuthorized">
  <p>You are logged in.</p>
</div>

```


## Билет 13

### 1. Валидаторы в JSF. Создание, назначение

- Срабатывают перед обновлением значения компонента в модели для проверки его корректности
- Класс валидатора должен реализовывать интерфейс javax.faces.validator.Validator
- Есть стандартные валидаторы + можно создавать свои

**Способы валидации:**
- С помощью параметров компонента (аттрибут `required="true"`)
- С помощью вложенного тега (пример: вложенный в `<h:inputText>` тег `<f:validateDoubleRange minimum="-5" maximum="5"/>`)
- С помощью логики на уровне managed bean

### 2. Реализация контроллера в Spring Web MVC

Controller – обрабатывает запрос пользователя,
создаёт соответствующую модель и передаёт её
для отображения в представление.
- Класс, который связывает модель с
представлением, управляет состоянием модели.
- Помечается аннотацией @Controller.
- Класс или его методы могут быть помечены
  аннотациями, «привязывающими» их к
  определённым методам HTTP или URL (`@RequestMapping` или аннотации-сокращения типа `@GetMapping`, `@PostMapping` и т.д., чтобы маппинговать URL-адреса на конкретные методы.).
- Аннотации @RequestParam, @PathVariable, @RequestBody и другие используются для извлечения данных из запросов.

Здесь выполняется бизнес-логика, обработка данных из запроса, взаимодействие с Model (сервисы, компоненты доступа к данным и т.д.) и возвращается некоторый результат, обычно в виде имени представления и модели данных для этого представления (объект `ModelAndView`) или `ResponseEntity`.

### 3. Vue.js простейший чат бот, который на любое сообщение отвечает «сам дурак»

```js
<template>
  <div>
    <h2>Простейший чат-бот</h2>
    <input type="text" v-model="userInput" @keyup.enter="sendMessage" placeholder="Напиши что-нибудь">
    <button @click="sendMessage">Отправить</button>
    <p v-if="botMessage">{{ botMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      botMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') {
        return;
      }
      this.botMessage = 'Сам дурак!';
      this.userInput = ''; // Очистка поля ввода
    }
  }
};
</script>

```

## Билет 9

### 1. JNDI. JNDI в Java EE. Способы взаимодействия с JNDI. Их преимущества и недостатки.

Java Naming and Directory Interface (JNDI) — это набор Java API, организованный в виде службы
каталогов, который позволяет Java-клиентам открывать и
просматривать данные и объекты по их именам. 

В контексте Java EE, JNDI используется для поиска и управления ресурсами, такими как JDBC-источники данных, JMS (Java Message Service) соединения и EJB (Enterprise JavaBeans).


**JNDI в Java EE:**

1. **Локализация ресурсов**: JNDI позволяет приложениям находить данные и объекты через логические имена, а не через конкретные ссылки или пути. Это обеспечивает гибкость и упрощает управление ресурсами в распределенной среде.

2. **Интеграция с контейнером**: В Java EE контейнер предоставляет реализацию JNDI, позволяя приложениям легко находить и использовать ресурсы, которые контейнер управляет и конфигурирует.

**Два варианта использования JNDI:**
- CDI (аннотации) — работает только в managed компонентах. В Java EE JNDI часто используется в сочетании с внедрением зависимостей, позволяя автоматически вставлять ресурсы непосредственно в компоненты приложения. Аннотации CDI позволяют автоматизировать процесс поиска и инъекции ресурсов в управляемые компоненты (managed components), такие как EJB, сервлеты или JSF бины.
- Прямой вызов API — работает везде. В явном виде выполняется поиск и работа с ресурсами через JNDI API.

### Преимущества:

- **Абстракция**: JNDI обеспечивает уровень абстракции, позволяя приложениям работать с ресурсами без необходимости знать о конкретных деталях их реализации.
- **Гибкость**: Ресурсы можно легко заменять или изменять без изменения самого приложения.
- **Интеграция**: Легко интегрируется с другими технологиями Java EE.

### Недостатки:

- **Зависимость от контейнера**: Тесная интеграция с контейнером Java EE может ограничить переносимость приложений.
- **Производительность**: Использование JNDI может вносить некоторую задержку, особенно при частых запросах к службам именования.


### 2. React. Особенности. Архитектура

React - js библиотека для построения UI. 

**Особенности**
- Компоненты и их переиспользование. Каждый компонент представляет собой независимый блок кода, который отвечает за определенную часть пользовательского интерфейса. 
- Декларативность
- JSX разметка: под капотом превращается в JS, компоненты должны возвращать всегда 1 элемент, все в camelCase, закрытые теги
- Легкая интеграция в существующие решения
- Можно писать нативные и фулстек приложения

**Архитектура**
Архитектура приложений на React включает несколько ключевых составных частей, которые определяют структуру и способ взаимодействия различных элементов приложения:

1. **Компоненты**:
   - Основа архитектуры React — это компоненты. Каждый компонент представляет собой независимый блок кода, который отвечает за определенную часть пользовательского интерфейса (UI).
   - Компоненты могут быть функциональными или классовыми. Функциональные компоненты часто используются для простых задач и поддерживают хуки. Классовые компоненты имеют методы жизненного цикла и более подходят для сложных задач.

2. **Пропсы (Props)**:
   - Свойства (или пропсы) — это параметры, которые передаются компонентам. Они позволяют компонентам быть конфигурируемыми и переиспользуемыми.

3. **Состояние (State)**:
   - Состояние — это данные, которые компоненты могут хранить внутри себя и которые могут изменяться во время жизни компонента. Состояние важно для динамических компонентов, таких как формы или интерактивные списки.

4. **Хуки (Hooks)**:
   - Хуки — это функции, которые позволяют использовать состояние и другие возможности React без создания класса. `useState` и `useEffect` являются наиболее распространенными хуками.

5. **Контекст (Context)**:
   - Контекст позволяет передавать данные напрямую через дерево компонентов, избегая пропс-дрелинга (необходимости передавать пропсы на каждом уровне).

6. **Рефы (Refs)**:
   - Рефы предоставляют способ доступа к DOM-элементам или компонентам React напрямую.

7. **Маршрутизация (Routing)**:
   - Библиотеки маршрутизации, такие как React Router, используются для навигации между различными представлениями в одностраничных приложениях (SPA).

8. **Управление состоянием приложения**:
   - Для сложных приложений может понадобиться централизованное управление состоянием. Redux, MobX и Context API — популярные инструменты для этого.

9. **Виртуальный DOM**:
   - Виртуальный DOM — это легковесное представление реального DOM-дерева, которое позволяет React оптимизировать обновления, сначала применяя изменения к виртуальному DOM, а затем синхронизируя его с реальным DOM.

### 3. Написать бин который показывает время в минутах со старта сервера

Сам бин:
```java
@Singleton
@Startup
public class UptimeBean {

    private Instant startTime;

    @PostConstruct
    public void init() {
        // Записываем время старта сервера
        startTime = Instant.now();
    }

    public long getUptimeMinutes() {
        // Возвращаем разницу во времени между текущим моментом и временем старта в минутах
        return Duration.between(startTime, Instant.now()).toMinutes();
    }
}

```

Использование:

```js
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html">
<h:head>
    <title>Server Uptime</title>
</h:head>
<h:body>
    <h:outputText value="Server has been running for #{uptimeBean.uptimeMinutes} minutes." />
</h:body>
</html>
```

