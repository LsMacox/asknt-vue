# asknt-vue-front-hpace
Автоматизированная система контроля наземного транспорта в ГК Черкизово.

## Запуск проекта

### Установка библиотек
```
npm install
```

### Компиляция и горячая перезагрузка для разработки
```
npm run serve
```

### Компиляция и минификации для продакшена
```
npm run build
```

## Для разработчиков
* ### Структура проекта
  * UI приложения можно посмотреть по маршруту /ui. 
  * Чтобы узнать какие стили и компоненты используются для отображения, см. в компоненте @/app/shared/components/UI.vue
  * Основные роуты и сторы располагаются в файлах @/app/app-routes.js, @/app/app-state.js
  * Директория @/app/entities папка предназначенная для разделения частей логики приложения
  * Роуты из сущностей (файл router.js) подгружаются в файле app-routes.js 
  * Сторы из сущностей (файл state.js) подгружаются в файле app-state.js. Итоговый стор выглядит как: "название_сущности/название_файла_в_папке_state/метод"
  * Автоматические подгружаются компоненты из папки @/app/shared/components/base с префиксом base. Пример: файл TextField.js будет доступен в проекте по названию base-text-field
  * Иконки подгружаются в @/plugins/vuetify.js
* ### Стили
  * variables.scss переопределенные константы vuetify ([sass-variables](https://vuetifyjs.com/en/features/sass-variables/#vue-cli-install))
  * _typography.sass, _mixins.scss, themes/_variables.sass - импортируются во все файлы sass/scss. Можно добавить еще глобальных файлов в vue.config.js
  * Для переопределения классов компонентов vuetify, писать в файлах в папке themes/{название_темы}/v-component.scss
* ### Плагины
  * plugins/config.js - создает константу $config для vue. Содержит данные из папки @/app/shared/config
  * plugins/icons.js - экспорт иконок из папки @/assets/icons для vuetify
  * plugins/session.js - [vue-session](https://github.com/victorsferreira/vue-session)
  * plugins/moment.js - [vue-moment](https://github.com/brockpetrie/vue-moment)
  * plugins/underscore.js - [vue-underscore](https://github.com/HKskn/vue-underscore)