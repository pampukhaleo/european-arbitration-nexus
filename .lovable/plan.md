## 1. Закрепить новость "Beware Fraud" (id `20234`)

- `src/types/news.ts` — добавить `pinned?: boolean`.
- `src/data/news/2023.ts` — у `id: "20234"` выставить `pinned: true`.
- `src/data/news/index.ts` — экспортировать `newsItems` предварительно отсортированными: сначала `pinned`, затем остальные в текущем порядке. Так закреплённая новость встанет первой и в `/eac/news`, и в `NewsPreview` на главной.
- `src/components/news/NewsItem.tsx` — принимать проп `pinned`; при `true` рисовать над датой маленький бейдж с иконкой `Pin` (lucide) и переводом `common.pinned`.
- `src/pages/eac/News.tsx` и `src/components/home/NewsPreview.tsx` — пробросить `pinned={item.pinned}`.
- `src/contexts/locales/{en,fr,ru}.ts` — добавить `common.pinned`: "Pinned" / "Épinglé" / "Закреплено".

## 2. Site-wide fraud alert banner

Тонкая полоса под шапкой (`Header`), видимая на **всех** страницах, кроме `/landing` и `/auth` (там своё оформление). Ведёт на `/fraud-warning`.

- Новый компонент `src/components/FraudAlertBanner.tsx`:
  - `bg-amber-100 text-amber-900 border-b border-amber-300` (жёлтая, но не кричащая).
  - Иконка `AlertTriangle` + текст `t("fraud.bannerText")` + ссылка `t("fraud.bannerCta")` на `/fraud-warning`.
  - Крестик "закрыть" — сохраняем состояние в `localStorage` (`eac-fraud-banner-dismissed=1`), чтобы не бесить постоянных посетителей; при новом заходе через сутки — показываем снова (храним timestamp).
- Подключить в `src/components/Layout.tsx` перед основным `<main>`, чтобы автоматически появился на всех пользовательских страницах.
- Локализовать строки `fraud.bannerText`, `fraud.bannerCta`, `common.dismiss` в трёх локалях.

## 3. Отдельная страница `/fraud-warning`

Новая страница со структурированным предупреждением, единая точка правды.

- Файл: `src/pages/FraudWarning.tsx` (использует `Layout` и `Seo`).
- Разделы:
  1. Введение — что происходит (перефразированный текст из новости `20234`).
  2. **Как отличить настоящее сообщение EAC**: домен `@chea-taic.be`, наличие номера дела, официальные реквизиты Секретариата, ссылка на страницу контактов.
  3. **Красные флаги фрода**: бесплатные почтовые адреса (Gmail/Outlook/Yandex/Proton), требование перевода на частные счета, "выигрыш в арбитраже", давление сроками, вложения `.zip/.exe`.
  4. **Что делать при получении подозрительного письма**: не отвечать, не переводить деньги, переслать в Секретариат для проверки (`secretariat@chea-taic.be` — используем существующий контакт), при финансовом ущербе — обратиться в полицию.
  5. Заявление, что EAC уведомила правоохранительные органы.
- Роутинг в `src/App.tsx`: `{ path: 'fraud-warning', Component: FraudWarning }` внутри `localisedChildren()` (значит, доступно как `/en/fraud-warning`, `/fr/fraud-warning`, `/ru/fraud-warning`).
- SEO: добавить запись `"/fraud-warning"` в `src/lib/seoMetadata.ts` (title / description / h1 на трёх языках).
- Prefetch: добавить в `src/lib/routePrefetch.ts`.
- Sitemap: страница подхватится автоматически из `localisedChildren`.
- Ссылка в футере: `src/components/Footer.tsx` — добавить пункт "Fraud Warning / Alerte à la fraude / Осторожно, мошенники" в блок политик.
- Локализация: пакет ключей `fraud.page.*` в трёх локалях + `menu.fraudWarning` для футера.

## 4. Дополнительные рекомендации (вне кода, отдам в чат после реализации)

- Настроить DNS: **SPF, DKIM, DMARC (`p=reject`)** для `chea-taic.be`, опционально BIMI.
- Проверить, что личные e-mail членов Совета/арбитров не выведены в открытом виде — только общий адрес Секретариата.
- Мониторинг похожих доменов (DNSTwist / Google Alerts на "European Arbitration Chamber").

## Технические детали

- Никаких изменений в БД или Supabase — всё статично.
- Баннер и страница `/fraud-warning` полностью укладываются в текущую SSG-цепочку `vite-react-ssg` → корректно попадут в `dist/`, sitemap и hreflang.
- Дизайн-токены — существующие (`eac-*`, семантические `--primary`, `--muted`, tailwind `amber-*` для баннера как единственное исключение под явную сигнальную окраску).
