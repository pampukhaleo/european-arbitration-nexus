export type Translations = {
  [key: string]:
    | string
    | string[]
    | Translations
    | { [key: string]: string }[]; // for arrays of title-description or similar objects
};
