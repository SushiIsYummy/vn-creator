import { useState, useEffect } from 'react';
import { type VnData, VnDataSchema } from '../../vnData.types';

type ValidationStatus = {
  data: VnData | null;
  loading: boolean;
  error: string | null;
};

export function useValidateVN(jsonFile: object | null): ValidationStatus {
  const [status, setStatus] = useState<ValidationStatus>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!jsonFile) {
      return;
    }

    async function validateVNData() {
      try {
        setStatus((prev) => ({ ...prev, loading: true, error: null }));

        const validatedData = VnDataSchema.parse(jsonFile);

        setStatus({
          data: validatedData,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Error loading visual novel:', err);

        let errorMessage = 'Failed to load visual novel';
        if (err instanceof Error) {
          errorMessage = err.message;
        }

        setStatus({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    }

    validateVNData();
  }, [jsonFile]);

  return status;
}
