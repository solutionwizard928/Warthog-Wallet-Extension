import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    disabled = false,
    loading = false,
    ariaLabel,
    className,
}) => {
    const baseStyles =
        'py-4 rounded-full font-semibold transition-all duration-200';

    const variantStyles = {
        primary: 'bg-primary text-black hover:bg-opacity-90 focus:ring-primary',
        secondary: 'bg-gray text-black hover:bg-opacity-90 focus:ring-gray',
        danger: 'bg-error text-white hover:bg-opacity-90 focus:ring-error',
        outline: 'border border-primary text-primary hover:border-primary/80 hover:text-primary/80 focus:ring-primary',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';
    const loadingStyles = 'flex justify-center items-center';

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled || loading ? disabledStyles : ''} ${loading ? loadingStyles : ''}`}
            disabled={disabled || loading}
            aria-label={ariaLabel || (typeof children === 'string' ? children : 'button')}
        >
            {loading ? (
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
