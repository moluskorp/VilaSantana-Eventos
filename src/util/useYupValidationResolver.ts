import { useCallback } from 'react';

export const useYupValidationResolver = schemaOn =>
    useCallback(
        async data => {
            try {
                const values = await schemaOn.validate(data, {
                    abortEarly: false,
                });
                return {
                    values,
                    errors: {},
                };
            } catch (err) {
                return {
                    values: {},
                    errors: err.inner.reduce(
                        (allErrors, currentError) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? 'validation',
                                message: currentError.message,
                            },
                        }),
                        {},
                    ),
                };
            }
        },
        [schemaOn],
    );
