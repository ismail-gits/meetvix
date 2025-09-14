import { Polar } from "@polar-sh/sdk";

export const polarClient = (() => {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "Missing POLAR_ACCESS_TOKEN. Set it in your server env before starting the app."
    );
  }
  // Change server if you are not using sandbox
  // const server =
  //   process.env.POLAR_ENV === "production" ||
  //   process.env.NODE_ENV === "production"
  //     ? "production"
  //     : "sandbox";
  const server = "sandbox";
  
  return new Polar({ accessToken: token, server });
})();
