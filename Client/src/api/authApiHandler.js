import authFetchHandler from "./authHandler";

export const userSignup = async (signupData) => {
  const response = await authFetchHandler({
    endPoint: "api/auth/signup",
    method: "POST",
    data: {
      email: signupData?.email,
      name: signupData?.fullName,
      password: signupData?.password,
      imageUrl: signupData?.imageUrl,
    },
  });
  return response;
};

export const userLogin = async (loginData) => {
  const response = await authFetchHandler({
    endPoint: "api/auth/login",
    method: "POST",
    data: {
        email: loginData?.email,
        password: loginData?.password,
      },
  });
  return response;
};
