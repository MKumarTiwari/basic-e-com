export const validate = (data, type) => {
    const errors = {};
  
    // Email validation
    if (!data.email) {
      errors.email = "Email is Required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim().toLowerCase())) {
      errors.email = "Email address is invalid!";
    }
  
    // Password validation
    if (!data.password) {
      errors.password = "Password is Required";
    } else if (data.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    }
  
    // Additional validations for sign-up type
    if (type === "signUp") {
      // Username validation
      if (!data.name || !data.name.trim()) {
        errors.name = "Username is Required!";
      }
  
      // Confirm password validation
      if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm the Password";
      } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match!";
      }
  
      // Terms acceptance validation
      if (!data.IsAccepted) {
        errors.IsAccepted = "Accept terms!";
      }
    }
  
    return errors;
  };
  