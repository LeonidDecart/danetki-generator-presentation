# Генератор данеток — презентация

Интерактивная B2B-презентация (14 слайдов) облачного веб-сервиса для автоматической генерации данеток. Стиль: Brutalism / Swiss Design.

**Онлайн:** [leoniddecart.github.io/danetki-generator-presentation](https://leoniddecart.github.io/danetki-generator-presentation/)

**Репозиторий:** [github.com/LeonidDecart/danetki-generator-presentation](https://github.com/LeonidDecart/danetki-generator-presentation)

**Backend-проект:** [github.com/CSU-2026-1/danetki](https://github.com/CSU-2026-1/danetki)

## Слайды

| № | ID | Тема |
|---|-----|------|
| 01 | COVER | Титул |
| 02 | PROBLEM | Проблема рынка |
| 03 | EDGE | WIN-WIN: экономика контента vs потолок роста |
| 04 | FLOW | User Flow и UI-мокап |
| 05 | AI | Роль LLM |
| 06 | DATA | Data pipeline dashboard (источники, фильтры, KPI) |
| 07 | MODEL | Выбор модели (NLP & семантика) |
| 08 | PIPE | MVP-пайплайн (микросервисы) |
| 09 | KAFKA | Kafka vs RabbitMQ |
| 10 | WORKER | AI Worker: инференс и отказоустойчивость |
| 11 | METRICS | ML-, системные и бизнес-метрики |
| 12 | ECON | Economics dashboard (доходы, COGS, unit econ) |
| 13 | RISKS | Риски и ограничения |
| 14 | END | Главный вывод |

## Запуск локально

```bash
npm install
npm run dev
```

Приложение откроется на [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Push в ветку `main` автоматически публикует сайт на GitHub Pages (workflow `.github/workflows/deploy.yml`).

## Управление

- Стрелки влево / вправо — переключение слайдов
- Клавиши 1–9 — быстрый переход к слайдам 1–9
- Кнопки в хедере — навигация по всем 14 слайдам
- **FULL** в футере — полноэкранный режим

## Стек

- React 19, TypeScript, Vite, Tailwind CSS 4, Motion (Framer Motion)

## Команда

Костюк Степан, Алиев Расул, Аблин Александр, Голубев Никита, Симоненко Леонид — ПрИ-301/302
