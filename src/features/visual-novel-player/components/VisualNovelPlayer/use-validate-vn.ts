import { useState, useEffect, useRef } from 'react';
import { VnData, VnDataSchema } from './vnData.types';

type ValidationStatus = {
  data: VnData | null;
  loading: boolean;
  error: string | null;
};

export function useValidateVN(jsonFile: object): ValidationStatus {
  const [status, setStatus] = useState<ValidationStatus>({
    data: null,
    loading: true,
    error: null,
  });
  const prevJsonFileRef = useRef<object | null>(null);
  // const count = useRef(0);
  // count.current++;
  // console.log(count);
  useEffect(() => {
    // if (!jsonFile) {
    //   setStatus({
    //     data: null,
    //     loading: false,
    //     error: null,
    //   });
    //   return;
    // }
    if (JSON.stringify(jsonFile) === JSON.stringify(prevJsonFileRef.current)) {
      return; // No change, don't run validation
    }

    async function validateVNData() {
      try {
        setStatus((prev) => ({ ...prev, loading: true, error: null }));

        // await new Promise((r) => setTimeout(r, 1000));

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

        console.log('got error!');
        // await new Promise((r) => setTimeout(r, 100000));
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
