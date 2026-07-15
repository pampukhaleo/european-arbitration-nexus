## Проблема
На странице новости внизу отображается сырой ключ `common.relatedNews` вместо переведённой надписи — ключа нет ни в одном из локалей (`en.ts`, `fr.ts`, `ru.ts`).

## Правка
Добавить `relatedNews` в секцию `common` каждого локаля:

- `src/contexts/locales/en.ts` → `relatedNews: "Related news"`
- `src/contexts/locales/fr.ts` → `relatedNews: "Actualités liées"`
- `src/contexts/locales/ru.ts` → `relatedNews: "Похожие новости"`

Файл `src/pages/eac/NewsDetail.tsx` (строка 200) уже использует `t("common.relatedNews")` — после добавления ключей заголовок отобразится корректно на всех языках.
