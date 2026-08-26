export const VALIDATION_PATTERNS = {
    //   email: ,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  phone: /^01[0125][0-9]{8}$/,
  code: /^\d{6}$/,
} as const;