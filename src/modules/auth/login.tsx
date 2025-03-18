import React from "react";
import { useAppDispath, useAppSelector } from "../../shared/redux";
import { loginThunk, useLoginLoading } from "./login-thunk";
import { authSlice } from "./auth.slice";
import styles from "./login.module.css"; 

export function Login() {
  const dispatch = useAppDispath();

  const isLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? ""
      )
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>

        <input className={styles.input} name="login" placeholder="Логін" />
        <input className={styles.input} type="password" name="password" placeholder="Пароль" />

        {loginError && <div className={styles.error}>{loginError}</div>}

        <button disabled={isLoading} className={styles.button}>
          {isLoading ? "Завантаження..." : "Вхід"}
        </button>
      </form>
    </div>
  );
}