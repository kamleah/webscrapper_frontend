export const requiredField = (fieldName) => ({
    required: `${fieldName} is required`,
});

export const emailValidation = {
    required: 'Email address is required',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: <span>Please enter a valid email</span>,
    },
};

export const passwordValidation = {
    required: 'Password is required',
    pattern: {
        value:
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: (
            <span>
                Password must have at least one uppercase letter, one
                number, and one special character
            </span>
        ),
    }
};