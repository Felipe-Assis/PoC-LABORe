import React from 'react';
import { Toast, ToastContainer, Button } from 'react-bootstrap';
import { useToastStore } from '../../../store/toastStore';

const ToastNotifications = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <ToastContainer position="top-right" className="p-3">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    onClose={() => removeToast(toast.id)}
                    autohide
                    delay={3000}
                    className={`border border-${toast.variant} shadow-sm mb-2`}
                >
                    <Toast.Header
                        closeButton={false}
                        className={`bg-${toast.variant === 'success' ? 'success' : 'danger'} bg-opacity-10`}
                    >
                        <strong className={`me-auto text-${toast.variant}`}>
                            {toast.variant === 'success' ? 'Sucesso' : 'Erro'}
                        </strong>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Close"
                            className="text-decoration-none text-muted p-0 ms-3"
                        >
                            ✕
                        </Button>
                    </Toast.Header>
                    <Toast.Body className="text-dark">{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default ToastNotifications;
