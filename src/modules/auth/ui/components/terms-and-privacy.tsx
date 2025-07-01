import Link from "next/link";

export const TermsAndPrivacy = () => {
  return (
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our{" "}
      <Link href={"#"}>Terms of service</Link> and{" "}
      <Link href={"#"}>Privacy</Link>
    </div>
  );
};
