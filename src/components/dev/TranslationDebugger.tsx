
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { validateTranslations, getAllTranslationKeys } from '@/utils/translationValidator';
import en from '@/contexts/locales/en';
import fr from '@/contexts/locales/fr';
import ru from '@/contexts/locales/ru';

export default function TranslationDebugger() {
  const [showDebugger, setShowDebugger] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);

  const runValidation = () => {
    const frValidation = validateTranslations(en, fr, 'EN', 'FR');
    const ruValidation = validateTranslations(en, ru, 'EN', 'RU');
    
    const allEnKeys = getAllTranslationKeys(en);
    const allFrKeys = getAllTranslationKeys(fr);
    const allRuKeys = getAllTranslationKeys(ru);
    
    setValidationResults({
      fr: frValidation,
      ru: ruValidation,
      stats: {
        en: allEnKeys.length,
        fr: allFrKeys.length,
        ru: allRuKeys.length
      }
    });
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  if (!showDebugger) {
    return (
      <Button
        onClick={() => {
          setShowDebugger(true);
          runValidation();
        }}
        className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600"
        size="sm"
      >
        🔍 Check Translations
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto">
      <Card className="bg-white shadow-lg border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Translation Status</CardTitle>
            <Button
              onClick={() => setShowDebugger(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 text-xs">
          {validationResults && (
            <>
              <div className="mb-3">
                <div className="font-semibold mb-1">Key Counts:</div>
                <div className="flex gap-2">
                  <Badge variant="secondary">EN: {validationResults.stats.en}</Badge>
                  <Badge variant="secondary">FR: {validationResults.stats.fr}</Badge>
                  <Badge variant="secondary">RU: {validationResults.stats.ru}</Badge>
                </div>
              </div>

              {/* French validation */}
              <div className="mb-3">
                <div className="font-semibold mb-1">French Issues:</div>
                {validationResults.fr.missingKeys.length > 0 && (
                  <div className="mb-1">
                    <Badge variant="destructive" className="text-xs">
                      Missing: {validationResults.fr.missingKeys.length}
                    </Badge>
                    <div className="mt-1 max-h-20 overflow-auto text-xs text-red-600">
                      {validationResults.fr.missingKeys.slice(0, 5).map((key: string, i: number) => (
                        <div key={i}>{key}</div>
                      ))}
                      {validationResults.fr.missingKeys.length > 5 && <div>... and {validationResults.fr.missingKeys.length - 5} more</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Russian validation */}
              <div className="mb-3">
                <div className="font-semibold mb-1">Russian Issues:</div>
                {validationResults.ru.missingKeys.length > 0 && (
                  <div className="mb-1">
                    <Badge variant="destructive" className="text-xs">
                      Missing: {validationResults.ru.missingKeys.length}
                    </Badge>
                    <div className="mt-1 max-h-20 overflow-auto text-xs text-red-600">
                      {validationResults.ru.missingKeys.slice(0, 5).map((key: string, i: number) => (
                        <div key={i}>{key}</div>
                      ))}
                      {validationResults.ru.missingKeys.length > 5 && <div>... and {validationResults.ru.missingKeys.length - 5} more</div>}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={runValidation}
                size="sm"
                className="w-full text-xs"
              >
                Refresh
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
