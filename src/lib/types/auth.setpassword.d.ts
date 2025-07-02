declare type setpasswordFelids = {
  password: string;
  confirmPassword: string;
  error: string | null;
};

declare type sucssResponseSetpasswordData = {
  message: string;
  token: string;
};

declare type ResponseSetpasswordData = sucssResponseSetpasswordData | ErrorResponse;

declare type setPasswordValuse = {
  newPassword: string;
};

declare type setpasswordprops = {
  email: string;
};

declare type ErrorSetPasswordResponse = {
  error: string;
};
