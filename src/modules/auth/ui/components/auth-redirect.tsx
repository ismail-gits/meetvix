import Link from "next/link";

interface AuthRedirectProps {
  message: string;
  label: "Sign in" | "Sign up";
  href: "/sign-in" | "/sign-up";
}

export const AuthRedirect = ({ message, label, href }: AuthRedirectProps) => {
  return (
    <div className="text-center text-sm">
      {message}{" "}
      <Link href={href} className="underline underline-offset-4">
        {label}
      </Link>
    </div>
  );
};
