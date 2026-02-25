'use client';

import { useToast } from '../../../components/Toast';
import { useRef } from 'react';

export function ToastForm({ action, successMessage = 'Saved successfully!', resetOnSuccess = false, children, ...props }) {
    const addToast = useToast();
    const formRef = useRef(null);

    const handleSubmit = async (formData) => {
        try {
            const result = await action(formData);
            if (result?.error) {
                addToast(result.error, 'error');
            } else {
                addToast(successMessage, 'success');
                if (resetOnSuccess && formRef.current) {
                    formRef.current.reset();
                }
            }
        } catch (err) {
            addToast('Something went wrong!', 'error');
        }
    };

    return (
        <form ref={formRef} action={handleSubmit} {...props}>
            {children}
        </form>
    );
}
