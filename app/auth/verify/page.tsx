"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
interface VerifyState {
  status: "loading" | "success" | "error";
}

const Verify = () => {
  const [state, setState] = useState<VerifyState>({ status: "loading" });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setState({ status: "error" });
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "signup",
        token,
        email,
      });

      if (error) {
        setState({ status: "error" });
      } else {
        setState({ status: "success" });
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (state.status === "loading") return <p>メール確認中...</p>;
  if (state.status === "error")
    return <p>確認に失敗しました。無効なリンクか期限切れです。</p>;
  if (state.status === "success")
    return <p>メールが確認されました。ログインしてください。</p>;

  return null;
};

export default Verify;
