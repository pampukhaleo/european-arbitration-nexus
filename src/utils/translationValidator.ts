
import { Translations } from '@/contexts/types/Translations';

interface ValidationResult {
  missingKeys: string[];
  extraKeys: string[];
  inconsistentStructure: string[];
}

export function validateTranslations(
  referenceTranslations: Translations,
  targetTranslations: Translations,
  referenceLang: string,
  targetLang: string,
  keyPath: string = ''
): ValidationResult {
  const result: ValidationResult = {
    missingKeys: [],
    extraKeys: [],
    inconsistentStructure: []
  };

  // Check for missing keys in target
  for (const key in referenceTranslations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    
    if (!(key in targetTranslations)) {
      result.missingKeys.push(`${targetLang} missing: ${currentPath}`);
    } else {
      const refValue = referenceTranslations[key];
      const targetValue = targetTranslations[key];
      
      // Check if structure matches (both objects or both primitives)
      if (typeof refValue !== typeof targetValue) {
        result.inconsistentStructure.push(`${currentPath}: type mismatch between ${referenceLang} and ${targetLang}`);
      } else if (typeof refValue === 'object' && refValue !== null && !Array.isArray(refValue)) {
        // Recursively validate nested objects
        const nestedResult = validateTranslations(
          refValue as Translations,
          targetValue as Translations,
          referenceLang,
          targetLang,
          currentPath
        );
        result.missingKeys.push(...nestedResult.missingKeys);
        result.extraKeys.push(...nestedResult.extraKeys);
        result.inconsistentStructure.push(...nestedResult.inconsistentStructure);
      }
    }
  }

  // Check for extra keys in target
  for (const key in targetTranslations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    
    if (!(key in referenceTranslations)) {
      result.extraKeys.push(`${targetLang} extra: ${currentPath}`);
    }
  }

  return result;
}

export function getAllTranslationKeys(translations: Translations, keyPath: string = ''): string[] {
  const keys: string[] = [];
  
  for (const key in translations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    const value = translations[key];
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllTranslationKeys(value as Translations, currentPath));
    } else {
      keys.push(currentPath);
    }
  }
  
  return keys;
}
